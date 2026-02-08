import { setCookie, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    // Clear session cookie
    setCookie(event, 'user_session', '', {
        httpOnly: true,
        secure: !import.meta.dev,
        sameSite: 'lax',
        maxAge: 0
    })

    return {
        success: true
    }
})
