export default defineEventHandler(async (event) => {
  const db = event.context.cloudflare?.env?.DB

  if (!db) {
    throw createError({
      statusCode: 500,
      message: 'Database not available'
    })
  }

  // Get user from session
  const userId = getCookie(event, 'user_session')

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    })
  }

  // Get user with profile
  const user = await db.prepare(`
    SELECT 
      u.id,
      u.email,
      u.name,
      u.surname,
      u.avatar_url,
      u.role,
      u.created_at,
      u.stripe_charges_enabled,
      p.position,
      p.skill_level,
      p.bio
    FROM users u
    LEFT JOIN user_profiles p ON p.user_id = u.id
    WHERE u.id = ?
  `).bind(userId).first()

  if (!user) {
    // Clear invalid session
    setCookie(event, 'user_session', '', { maxAge: 0 })
    throw createError({
      statusCode: 401,
      message: 'User not found'
    })
  }

  // Get preferred days
  const daysResult = await db.prepare(`
    SELECT day FROM user_preferred_days WHERE user_id = ?
  `).bind(userId).all()

  // Get preferred areas
  const areasResult = await db.prepare(`
    SELECT area FROM user_preferred_areas WHERE user_id = ?
  `).bind(userId).all()

  // Get stats
  const reviewsCount = await db.prepare(`
    SELECT COUNT(*) as count FROM reviews WHERE user_id = ?
  `).bind(userId).first()

  const courtsCount = await db.prepare(`
    SELECT COUNT(*) as count FROM courts WHERE submitted_by = ?
  `).bind(userId).first()

  return {
    ...user,
    stripe_charges_enabled: user.stripe_charges_enabled === 1,
    preferred_days: daysResult.results.map((r: any) => r.day),
    preferred_areas: areasResult.results.map((r: any) => r.area),
    reviews_count: reviewsCount?.count || 0,
    courts_suggested: courtsCount?.count || 0,
    games_played: 0 // TODO: implement games tracking
  }
})
