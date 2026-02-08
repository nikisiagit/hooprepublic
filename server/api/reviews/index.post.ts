// API endpoint to create a review
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    if (!body.courtId || !body.userId || !body.rating) {
        throw createError({
            statusCode: 400,
            message: 'Court ID, user ID, and rating are required'
        })
    }

    if (body.rating < 1 || body.rating > 5) {
        throw createError({ statusCode: 400, message: 'Rating must be between 1 and 5' })
    }

    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            const reviewId = `rev_${nanoid(12)}`

            // Upsert review (one per user per court)
            await db.prepare(`
        INSERT INTO reviews (id, court_id, user_id, rating, comment)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(court_id, user_id) DO UPDATE SET
          rating = excluded.rating,
          comment = excluded.comment,
          updated_at = datetime('now')
      `).bind(
                reviewId,
                body.courtId,
                body.userId,
                body.rating,
                body.comment || null
            ).run()

            return { success: true, message: 'Review submitted successfully' }
        }

        throw createError({ statusCode: 503, message: 'Database not available' })
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Error creating review:', error)
        throw createError({ statusCode: 500, message: 'Failed to submit review' })
    }
})
