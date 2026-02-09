// API endpoint to fetch a single court with all details
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id')

    if (!id) {
        throw createError({ statusCode: 400, message: 'Court ID is required' })
    }

    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            // Fetch court
            const court = await db.prepare(`
        SELECT 
          c.*,
          (SELECT AVG(rating) FROM reviews r WHERE r.court_id = c.id) as avg_rating,
          (SELECT COUNT(*) FROM reviews r WHERE r.court_id = c.id) as review_count
        FROM courts c
        WHERE c.id = ?
      `).bind(id).first()

            if (!court) {
                throw createError({ statusCode: 404, message: 'Court not found' })
            }

            // Get all tags
            const { results: tags } = await db.prepare(`
        SELECT t.id, t.name, t.category, t.icon
        FROM tags t
        JOIN court_tags ct ON t.id = ct.tag_id
        WHERE ct.court_id = ?
      `).bind(id).all()

            // Get all images
            const { results: images } = await db.prepare(`
        SELECT id, url, alt_text, is_primary
        FROM court_images
        WHERE court_id = ?
        ORDER BY is_primary DESC, created_at ASC
      `).bind(id).all()

            // Get reviews with user info
            const { results: reviews } = await db.prepare(`
        SELECT 
          r.id, r.rating, r.comment, r.created_at,
          u.name as user_name, u.avatar_url as user_avatar
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.court_id = ?
        ORDER BY r.created_at DESC
        LIMIT 20
      `).bind(id).all()

            // Get upcoming games
            const { results: games } = await db.prepare(`
        SELECT 
          b.id, b.title, b.booking_date, b.start_time, b.end_time, b.price, b.max_players,
          (SELECT COUNT(*) FROM booking_participants bp WHERE bp.booking_id = b.id AND bp.status = 'joined') as current_players,
          u.name as creator_name, u.avatar_url as creator_avatar
        FROM bookings b
        JOIN users u ON b.user_id = u.id
        WHERE b.court_id = ? AND b.booking_date >= date('now') AND b.status = 'confirmed'
        ORDER BY b.booking_date ASC, b.start_time ASC
        LIMIT 10
      `).bind(id).all()

            return {
                ...court,
                avg_rating: court.avg_rating ? Math.round(court.avg_rating * 10) / 10 : null,
                tags,
                images,
                reviews,
                upcoming_games: games
            }
        }

        throw createError({ statusCode: 503, message: 'Database not available' })
    } catch (error: any) {
        if (error.statusCode) throw error
        console.error('Error fetching court:', error)
        throw createError({ statusCode: 500, message: 'Failed to fetch court' })
    }
})
