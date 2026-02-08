// API endpoint to fetch courts with tags, images, and reviews
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const status = query.status as string || 'approved'

    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            // Fetch courts with aggregated data
            const { results: courts } = await db.prepare(`
        SELECT 
          c.id,
          c.name,
          c.description,
          c.address,
          c.postcode,
          c.borough,
          c.latitude,
          c.longitude,
          c.status,
          c.created_at,
          (SELECT AVG(rating) FROM reviews r WHERE r.court_id = c.id) as avg_rating,
          (SELECT COUNT(*) FROM reviews r WHERE r.court_id = c.id) as review_count
        FROM courts c
        WHERE c.status = ?
        ORDER BY c.name ASC
      `).bind(status).all()

            // For each court, fetch tags and primary image
            const enrichedCourts = await Promise.all(courts.map(async (court: any) => {
                // Get tags
                const { results: tags } = await db.prepare(`
          SELECT t.id, t.name, t.category, t.icon
          FROM tags t
          JOIN court_tags ct ON t.id = ct.tag_id
          WHERE ct.court_id = ?
        `).bind(court.id).all()

                // Get primary image
                const { results: images } = await db.prepare(`
          SELECT url, alt_text
          FROM court_images
          WHERE court_id = ?
          ORDER BY is_primary DESC, created_at ASC
          LIMIT 1
        `).bind(court.id).all()

                return {
                    ...court,
                    tags,
                    image_url: images[0]?.url || null,
                    avg_rating: court.avg_rating ? Math.round(court.avg_rating * 10) / 10 : null
                }
            }))

            return enrichedCourts
        }

        // No database connection - return empty array
        return []
    } catch (error) {
        console.error('Error fetching courts:', error)
        return []
    }
})
