// API endpoint to delete a court (admin only)
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

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

            // Delete court (cascades to tags, images, reviews)
            await db.prepare('DELETE FROM courts WHERE id = ?').bind(id).run()

            return { success: true, message: 'Court deleted successfully' }
        }

        throw createError({ statusCode: 503, message: 'Database not available' })
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Error deleting court:', error)
        throw createError({ statusCode: 500, message: 'Failed to delete court' })
    }
})
