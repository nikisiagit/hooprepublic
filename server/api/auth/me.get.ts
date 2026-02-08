export default defineEventHandler(async (event) => {
    const db = event.context.cloudflare?.env?.DB

    if (!db) {
        return { authenticated: false, user: null }
    }

    // Get user from session
    const userId = getCookie(event, 'user_session')

    if (!userId) {
        return { authenticated: false, user: null }
    }

    // Get user
    const user = await db.prepare(`
    SELECT id, email, name, surname, avatar_url, role
    FROM users
    WHERE id = ?
  `).bind(userId).first()

    if (!user) {
        // Clear invalid session
        setCookie(event, 'user_session', '', { maxAge: 0 })
        return { authenticated: false, user: null }
    }

    return {
        authenticated: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            avatar_url: user.avatar_url,
            role: user.role
        }
    }
})
