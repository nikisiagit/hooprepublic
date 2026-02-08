import GoogleSignInPlugin from 'vue3-google-signin'

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const clientId = config.public.googleClientId

    if (clientId) {
        nuxtApp.vueApp.use(GoogleSignInPlugin, {
            clientId: clientId,
        })
    } else {
        console.warn('Google Client ID not found in runtime config. Google Sign-In will not work.')
    }
})
