// API endpoint to create a new court (admin or user submission)
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // Validate required fields
    if (!body.name || !body.address || body.latitude === undefined || body.longitude === undefined) {
        throw createError({
            statusCode: 400,
            message: 'Name, address, latitude, and longitude are required'
        })
    }

    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            const courtId = `court_${nanoid(12)}`
            // Authenticate user
            const user = await getUserFromEvent(event)
            const isAdmin = user?.role === 'admin'
            const status = isAdmin ? 'approved' : 'pending' // Only admins can approve immediately

            // Insert court
            await db.prepare(`
        INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status, submitted_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
                courtId,
                body.name,
                body.description || null,
                body.address,
                body.postcode || null,
                body.borough || null,
                body.latitude,
                body.longitude,
                status,
                body.submittedBy || null
            ).run()

            // Add tags if provided
            if (body.tagIds && Array.isArray(body.tagIds)) {
                for (const tagId of body.tagIds) {
                    await db.prepare(`
            INSERT OR IGNORE INTO court_tags (court_id, tag_id)
            VALUES (?, ?)
          `).bind(courtId, tagId).run()
                }
            }

            // Add image if provided
            if (body.imageUrl) {
                await db.prepare(`
          INSERT INTO court_images (id, court_id, url, alt_text, is_primary, uploaded_by)
          VALUES (?, ?, ?, ?, 1, ?)
        `).bind(
                    `img_${nanoid(12)}`,
                    courtId,
                    body.imageUrl,
                    body.name,
                    body.submittedBy || null
                ).run()
            }

            return {
                success: true,
                id: courtId,
                status,
                message: isAdmin ? 'Court created successfully' : 'Court submitted for review'
            }
        }

        throw createError({ statusCode: 503, message: 'Database not available' })
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Error creating court:', error)
        throw createError({ statusCode: 500, message: 'Failed to create court' })
    }
})
