import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const user = await getUserFromEvent(event)

    if (!user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    const { title, description, courtId, date, startTime, endTime, maxPlayers, price, level } = body

    // Validation
    if (!title || !courtId || !date || !startTime || !endTime) {
        throw createError({
            statusCode: 400,
            message: 'Missing required fields'
        })
    }

    const db = event.context.cloudflare?.env?.DB
    if (!db) {
        throw createError({
            statusCode: 500,
            message: 'Database unavailable'
        })
    }

    try {
        const bookingId = crypto.randomUUID()

        // Create the booking
        await db.prepare(`
      INSERT INTO bookings (id, court_id, user_id, title, description, booking_date, start_time, end_time, max_players, price, level, is_public, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'confirmed')
    `).bind(
            bookingId,
            courtId,
            user.id,
            title,
            description || null,
            date,
            startTime,
            endTime,
            maxPlayers,
            price || 0,
            level || 'all'
        ).run()

        // Add the host as a participant
        await db.prepare(`
      INSERT INTO booking_participants (booking_id, user_id, status)
      VALUES (?, ?, 'joined')
    `).bind(bookingId, user.id).run()

        return {
            success: true,
            bookingId
        }

    } catch (error) {
        console.error('Failed to create game:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to create game'
        })
    }
})

