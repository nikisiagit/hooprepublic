// API endpoint to fetch all available tags
export default defineEventHandler(async (event) => {
    try {
        const db = event.context.cloudflare?.env?.DB

        if (db) {
            const { results } = await db.prepare(`
        SELECT id, name, category, icon
        FROM tags
        ORDER BY category, name
      `).all()

            // Group by category
            const grouped = results.reduce((acc: any, tag: any) => {
                if (!acc[tag.category]) {
                    acc[tag.category] = []
                }
                acc[tag.category].push(tag)
                return acc
            }, {})

            return { tags: results, grouped }
        }

        // Return default tags when no DB
        return {
            tags: [
                { id: 'tag_indoor', name: 'Indoor', category: 'type', icon: '🏟️' },
                { id: 'tag_outdoor', name: 'Outdoor', category: 'type', icon: '🌳' },
                { id: 'tag_hardwood', name: 'Hardwood', category: 'surface', icon: '🪵' },
                { id: 'tag_concrete', name: 'Concrete', category: 'surface', icon: '🧱' },
                { id: 'tag_tarmac', name: 'Tarmac', category: 'surface', icon: '⬛' },
                { id: 'tag_lighting', name: 'Floodlit', category: 'amenity', icon: '💡' },
                { id: 'tag_free', name: 'Free to use', category: 'amenity', icon: '🆓' },
                { id: 'tag_paid', name: 'Paid booking', category: 'amenity', icon: '💷' },
                { id: 'tag_fullcourt', name: 'Full court', category: 'feature', icon: '🏀' },
                { id: 'tag_halfcourt', name: 'Half court', category: 'feature', icon: '⛹️' },
                { id: 'tag_public', name: 'Public access', category: 'feature', icon: '🔓' },
            ],
            grouped: {}
        }
    } catch (error) {
        console.error('Error fetching tags:', error)
        return { tags: [], grouped: {} }
    }
})
