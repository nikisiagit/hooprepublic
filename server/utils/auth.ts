export async function getUserFromEvent(event: any) {
    const db = event.context.cloudflare?.env?.DB
    if (!db) return null

    const userId = getCookie(event, 'user_session')
    if (!userId) return null

    // Get user
    const user = await db.prepare(`
    SELECT id, email, name, role
    FROM users
    WHERE id = ?
  `).bind(userId).first()

    return user
}
