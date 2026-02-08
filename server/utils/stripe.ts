import Stripe from 'stripe'

export const getStripe = (runtimeConfig: any) => {
    const stripeKey = runtimeConfig.stripeSecretKey || runtimeConfig.public.stripeSecret
    if (!stripeKey) {
        throw new Error('STRIPE_SECRET_KEY is missing in runtime config')
    }
    return new Stripe(stripeKey, {
        apiVersion: '2025-01-27.acacia' as any, // Bypass TS check for latest version
    })
}
