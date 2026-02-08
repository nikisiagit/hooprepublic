// API endpoint to fetch open games from D1 database
export default defineEventHandler(async (event) => {
    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            // Using D1 in production
            const { results } = await db.prepare(`
        SELECT 
          b.id,
          b.booking_date,
          b.start_time,
          b.end_time,
          b.max_players,
          c.name as court_name,
          c.address as court_address,
          u.name as host_name,
          (SELECT COUNT(*) FROM booking_participants bp WHERE bp.booking_id = b.id) + 1 as current_players
        FROM bookings b
        JOIN courts c ON b.court_id = c.id
        JOIN users u ON b.user_id = u.id
        WHERE b.is_public = 1 
          AND b.status IN ('pending', 'confirmed')
          AND b.booking_date >= date('now')
        ORDER BY b.booking_date ASC, b.start_time ASC
      `).all()

            return results
        }

        // No database connection - return empty array
        return []
    } catch (error) {
        console.error('Error fetching games:', error)
        return []
    }
})
