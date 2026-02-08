import { nanoid } from 'nanoid'

import { readBody, createError, setCookie, defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const { name, surname, email, password } = body

    if (!name || !email || !password) {
        throw createError({
            statusCode: 400,
            message: 'Name, email, and password are required'
        })
    }

    if (password.length < 8) {
        throw createError({
            statusCode: 400,
            message: 'Password must be at least 8 characters'
        })
    }

    const db = event.context.cloudflare?.env?.DB

    if (!db) {
        throw createError({
            statusCode: 500,
            message: 'Database not available'
        })
    }

    // Check if email already exists
    const existing = await db.prepare('SELECT id FROM users WHERE email = ?').bind(email.toLowerCase()).first()

    if (existing) {
        throw createError({
            statusCode: 409,
            message: 'An account with this email already exists'
        })
    }

    // Hash password using Web Crypto API (available in Cloudflare Workers)
    const encoder = new TextEncoder()
    const data = encoder.encode(password)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const passwordHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    const userId = `user_${nanoid(12)}`

    try {
        // Insert user
        await db.prepare(`
      INSERT INTO users (id, email, password_hash, name, surname, role)
      VALUES (?, ?, ?, ?, ?, 'user')
    `).bind(
            userId,
            email.toLowerCase(),
            passwordHash,
            name,
            surname || null
        ).run()

        // Create empty profile
        await db.prepare(`
      INSERT INTO user_profiles (user_id)
      VALUES (?)
    `).bind(userId).run()

        // Set a simple session cookie (in production, use proper JWT/session management)
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
                name,
                surname
            }
        }
    } catch (error: any) {
        console.error('Signup error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to create account'
        })
    }
})
