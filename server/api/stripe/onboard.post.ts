export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event)
    const stripe = getStripe(config, event)
    const user = await getUserFromEvent(event)

    if (!user) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    // Create an account link for the user
    // First, check if user already has a connected account id
    const db = event.context.cloudflare?.env?.DB
    if (!db) {
        throw createError({ statusCode: 500, message: 'DB not available' })
    }

    let stripeAccId = await db.prepare('SELECT stripe_account_id FROM users WHERE id = ?')
        .bind(user.id)
        .first('stripe_account_id')

    if (!stripeAccId) {
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'GB',
            email: user.email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        })
        stripeAccId = account.id

        // Save to DB
        await db.prepare('UPDATE users SET stripe_account_id = ? WHERE id = ?')
            .bind(stripeAccId, user.id)
            .run()
    } else {
        // If account exists, verify it's not restricted or needs onboarding
        // In a real app we might check account status here
    }

    const accountLink = await stripe.accountLinks.create({
        account: stripeAccId as string,
        refresh_url: `${config.public.baseUrl || 'http://localhost:3000'}/profile?stripe_connect=refresh`,
        return_url: `${config.public.baseUrl || 'http://localhost:3000'}/profile?stripe_connect=return`,
        type: 'account_onboarding',
    })

    return { url: accountLink.url }
})
