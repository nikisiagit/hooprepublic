import { readBody, createError, getCookie, defineEventHandler } from 'h3'

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

    const body = await readBody(event)
    const { name, surname, position, skillLevel, preferredDays, preferredAreas, bio, avatarUrl } = body

    try {
        // Update user basic info
        if (name || surname || avatarUrl) {
            const updates = []
            const values = []

            if (name) {
                updates.push('name = ?')
                values.push(name)
            }
            if (surname !== undefined) {
                updates.push('surname = ?')
                values.push(surname)
            }
            if (avatarUrl !== undefined) {
                updates.push('avatar_url = ?')
                values.push(avatarUrl)
            }

            updates.push('updated_at = datetime("now")')
            values.push(userId)

            await db.prepare(`
        UPDATE users SET ${updates.join(', ')} WHERE id = ?
      `).bind(...values).run()
        }

        // Update or insert profile
        await db.prepare(`
      INSERT INTO user_profiles (user_id, position, skill_level, bio)
      VALUES (?, ?, ?, ?)
      ON CONFLICT(user_id) DO UPDATE SET
        position = excluded.position,
        skill_level = excluded.skill_level,
        bio = excluded.bio,
        updated_at = datetime('now')
    `).bind(
            userId,
            position || null,
            skillLevel || null,
            bio || null
        ).run()

        // Update preferred days
        if (preferredDays && Array.isArray(preferredDays)) {
            // Clear existing
            await db.prepare('DELETE FROM user_preferred_days WHERE user_id = ?').bind(userId).run()

            // Insert new
            for (const day of preferredDays) {
                await db.prepare(`
          INSERT INTO user_preferred_days (user_id, day)
          VALUES (?, ?)
        `).bind(userId, day).run()
            }
        }

        // Update preferred areas
        if (preferredAreas && Array.isArray(preferredAreas)) {
            // Clear existing
            await db.prepare('DELETE FROM user_preferred_areas WHERE user_id = ?').bind(userId).run()

            // Insert new
            for (const area of preferredAreas) {
                await db.prepare(`
          INSERT INTO user_preferred_areas (user_id, area)
          VALUES (?, ?)
        `).bind(userId, area).run()
            }
        }

        return {
            success: true,
            message: 'Profile updated successfully'
        }
    } catch (error: any) {
        console.error('Profile update error:', error)
        throw createError({
            statusCode: 500,
            message: 'Failed to update profile'
        })
    }
})
