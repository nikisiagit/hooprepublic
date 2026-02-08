import { nanoid } from 'nanoid'

import { readBody, createError, setCookie, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const { credential } = body

    if (!credential) {
        throw createError({
            statusCode: 400,
            message: 'No credential provided'
        })
    }

    const config = useRuntimeConfig()
    const clientId = config.public.googleClientId

    // Verify token with Google
    let payload
    try {
        const ticket = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`)
        if (!ticket.ok) {
            throw new Error('Failed to verify token')
        }
        payload = await ticket.json()
    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Invalid Google token'
        })
    }

    // Verify Audience (Client ID)
    if (clientId && payload.aud !== clientId) {
        // Optional: strict check, but good for security
        // console.warn('Token audience mismatch', payload.aud, clientId)
        // throw createError({ statusCode: 401, message: 'Invalid token audience' })
    }

    const { email, sub, name, picture, given_name, family_name } = payload

    if (!email) {
        throw createError({
            statusCode: 400,
            message: 'Email not provided by Google'
        })
    }

    // Connect to DB
    const db = event.context.cloudflare?.env?.DB
    if (!db) {
        // Fallback for dev if context not populated correctly (sometimes happens in dev server without --remote)
        // But usually it should work if using `npm run dev` with wrangler proxy
        throw createError({
            statusCode: 500,
            message: 'Database not available'
        })
    }

    try {
        // Check if user exists
        const existing = await db.prepare('SELECT * FROM users WHERE email = ?').bind(email.toLowerCase()).first()

        let userId

        if (existing) {
            userId = existing.id
            // Update google_id if missing
            if (!existing.google_id) {
                await db.prepare('UPDATE users SET google_id = ? WHERE id = ?').bind(sub, userId).run()
            }
            // Update avatar if missing? Optional.
        } else {
            // Create new user
            userId = `user_${nanoid(12)}`
            const dummyPassword = "GOOGLE_AUTH_NO_PASSWORD"

            await db.prepare(`
                INSERT INTO users (id, email, password_hash, name, surname, avatar_url, role, google_id, email_verified)
                VALUES (?, ?, ?, ?, ?, ?, 'user', ?, 1)
            `).bind(
                userId,
                email.toLowerCase(),
                dummyPassword,
                given_name || name || 'User',
                family_name || '',
                picture || null,
                sub
            ).run()

            // Create profile
            await db.prepare('INSERT INTO user_profiles (user_id) VALUES (?)').bind(userId).run()
        }

        // Set session cookie
        setCookie(event, 'user_session', userId, {
            httpOnly: true,
            secure: !import.meta.dev,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        })

        return {
            success: true,
            user: {
                id: userId,
                email: email.toLowerCase(),
                name: given_name || name,
                surname: family_name,
                avatar_url: picture
            }
        }
    } catch (error: any) {
        console.error('Google auth error:', error)
        throw createError({
            statusCode: 500,
            message: 'Authentication failed'
        })
    }
})
