import Stripe from 'stripe'

export const getStripe = (config: any, event?: any) => {
    // Priority:
    // 1. Raw Cloudflare environment variable (most reliable in production)
    // 2. Process environment variable (local dev)
    // 3. Nuxt Runtime Config (fallback)
    const rawCfEnv = event?.context?.cloudflare?.env

    let stripeKey =
        rawCfEnv?.NUXT_STRIPE_SECRET_KEY ||
        rawCfEnv?.STRIPE_SECRET_KEY ||
        process.env.NUXT_STRIPE_SECRET_KEY ||
        process.env.STRIPE_SECRET_KEY ||
        config.stripeSecretKey

    // Basic sanitization
    stripeKey = stripeKey?.toString().trim().replace(/[\u200B-\u200D\uFEFF]/g, '')

    if (!stripeKey || !stripeKey.startsWith('sk_')) {
        const envBranch = rawCfEnv?.CF_PAGES_BRANCH || 'unknown'
        console.error(`[Stripe Error] Invalid or missing Secret Key in ${envBranch}.`)
        throw new Error(`Stripe Secret Key is missing or invalid (must start with sk_). Check your Cloudflare dashboard variables for ${envBranch}.`)
    }

    return new Stripe(stripeKey, {
        apiVersion: '2025-01-27.acacia' as any,
    })
}
