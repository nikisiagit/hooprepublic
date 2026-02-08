export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { email, password, rememberMe } = body

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        })
    }

    const db = event.context.cloudflare?.env?.DB

    if (!db) {
        throw createError({
            statusCode: 500,
            message: 'Database not available'
        })
    }

    // Hash input password
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    // Find user
    const user = await db.prepare(`
    SELECT id, email, password_hash, name, surname, role
    FROM users
    WHERE email = ?
  `).bind(email.toLowerCase()).first()

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Invalid email or password'
        })
    }

    // Verify password
    if (user.password_hash !== passwordHash) {
        throw createError({
            statusCode: 401,
            message: 'Invalid email or password'
        })
    }

    // Set session cookie
    const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7 // 30 days or 7 days

    setCookie(event, 'user_session', user.id as string, {
        httpOnly: true,
        secure: !import.meta.dev,
        sameSite: 'lax',
        maxAge
    })

    return {
        success: true,
        user: {
            id: user.id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            role: user.role
        }
    }
})
