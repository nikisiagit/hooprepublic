// API endpoint to update a court (admin only)
import { readBody, createError, defineEventHandler } from 'h3'
import { getUserFromEvent } from '../../utils/auth'

export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    if (!id) {
        throw createError({ statusCode: 400, message: 'Court ID is required' })
    }

    // Verify admin
    const user = await getUserFromEvent(event)
    if (!user || user.role !== 'admin') {
        throw createError({
            statusCode: 403,
            message: 'Unauthorized: Admin access required'
        })
    }

    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            // Check court exists
            const court = await db.prepare('SELECT id FROM courts WHERE id = ?').bind(id).first()
            if (!court) {
                throw createError({ statusCode: 404, message: 'Court not found' })
            }

            // Build update query dynamically
            const updates: string[] = []
            const values: any[] = []

            const allowedFields = ['name', 'description', 'address', 'postcode', 'borough', 'latitude', 'longitude', 'status']

            for (const field of allowedFields) {
                if (body[field] !== undefined) {
                    updates.push(`${field} = ?`)
                    values.push(body[field])
                }
            }

            if (updates.length > 0) {
                updates.push('updated_at = datetime("now")')
                values.push(id)

                await db.prepare(`
          UPDATE courts SET ${updates.join(', ')} WHERE id = ?
        `).bind(...values).run()
            }

            // Update tags if provided
            if (body.tagIds && Array.isArray(body.tagIds)) {
                // Remove existing tags
                await db.prepare('DELETE FROM court_tags WHERE court_id = ?').bind(id).run()

                // Add new tags
                for (const tagId of body.tagIds) {
                    await db.prepare(`
            INSERT OR IGNORE INTO court_tags (court_id, tag_id)
            VALUES (?, ?)
          `).bind(id, tagId).run()
                }
            }

            return { success: true, message: 'Court updated successfully' }
        }

        throw createError({ statusCode: 503, message: 'Database not available' })
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Error updating court:', error)
        throw createError({ statusCode: 500, message: 'Failed to update court' })
    }
})
