export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const stripe = getStripe(config, event)
    const body = await readBody(event)
    const user = await getUserFromEvent(event)

    if (!user || !user.stripe_account_id) {
        throw createError({ statusCode: 401, message: 'Unauthorized or missing Stripe account' })
    }

    const { gameId, amount, currency = 'gbp' } = body

    // Retrieve platform fee (10% or fixed)
    const applicationFeeAmount = Math.floor(amount * 0.1)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency,
                product_data: {
                    name: 'Game Booking',
                },
                unit_amount: amount,
            },
            quantity: 1,
        }],
        mode: 'payment',
        payment_intent_data: {
            application_fee_amount: applicationFeeAmount,
            transfer_data: {
                destination: user.stripe_account_id,
            },
        },
        success_url: `${config.public.baseUrl}/games/${gameId}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${config.public.baseUrl}/games/${gameId}`,
        metadata: {
            gameId,
            userId: user.id
        }
    })

    return { url: session.url }
})
