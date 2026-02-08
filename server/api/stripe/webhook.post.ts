import Stripe from 'stripe'
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const stripe = getStripe(config)
    const sig = getHeader(event, 'stripe-signature')
    const endpointSecret = config.stripeWebhookSecret

    try {
        const body = await readRawBody(event)
        const stripeEvent = stripe.webhooks.constructEvent(body, sig, endpointSecret)

        switch (stripeEvent.type) {
            case 'checkout.session.completed':
                const session = stripeEvent.data.object as Stripe.Checkout.Session
                // Update booking status in D1
                const db = event.context.cloudflare?.env?.DB
                if (db) {
                    await db.prepare('UPDATE bookings SET status = "confirmed" WHERE id = ?')
                        .bind(session.metadata?.gameId)
                        .run()
                }
                break
            // Handle other event types
        }

        return { received: true }
    } catch (err: any) {
        throw createError({ statusCode: 400, message: `Webhook Error: ${err.message}` })
    }
})
