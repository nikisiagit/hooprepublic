import Stripe from 'stripe'

export const getStripe = (config: any, event?: any) => {
    // Priority:
    // 1. Runtime config (standard Nuxt)
    // 2. Cloudflare event environment variables (Standard for CF Workers/Pages)
    // 3. Process environment variables (standard for Node/Local dev)
    const stripeKey =
        config.stripeSecretKey ||
        event?.context?.cloudflare?.env?.NUXT_STRIPE_SECRET_KEY ||
        event?.context?.cloudflare?.env?.STRIPE_SECRET_KEY ||
        process.env.NUXT_STRIPE_SECRET_KEY ||
        process.env.STRIPE_SECRET_KEY

    if (!stripeKey) {
        if (event?.context?.cloudflare?.env) {
            console.error('Cloudflare Env keys available:', Object.keys(event.context.cloudflare.env))
        }
        throw new Error('Stripe Secret Key is missing. Please set NUXT_STRIPE_SECRET_KEY in your environment.')
    }

    return new Stripe(stripeKey, {
        apiVersion: '2025-01-27.acacia' as any,
    })
}
