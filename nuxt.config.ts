// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Cloudflare Pages deployment
  nitro: {
    preset: 'cloudflare-pages',
  },

  runtimeConfig: {
    stripeSecretKey: process.env.NUXT_STRIPE_SECRET_KEY,
    stripeWebhookSecret: process.env.NUXT_STRIPE_WEBHOOK_SECRET,
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || '', // Provide via environment variable
      stripeKey: process.env.NUXT_STRIPE_PUBLIC_KEY,
    }
  },

  app: {
    head: {
      title: 'HoopRepublic - Book Basketball Courts in London',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Connect with basketball players and book courts across London. Find your next game at HoopRepublic.'
        },
        { name: 'theme-color', content: '#F97316' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
        }
      ]
    }
  },

  css: ['@/assets/css/main.css'],
})
