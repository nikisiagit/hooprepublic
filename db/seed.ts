/**
 * Database Seed Script
 * 
 * This script imports courts from seed-data.ts into your D1 database.
 * 
 * Usage:
 *   Local:      npm run db:seed:local
 *   Production: npm run db:seed
 */

import { courts } from './seed-data'

function generateId(prefix: string): string {
    return `${prefix}_${Math.random().toString(36).substring(2, 14)}`
}

function generateSQL(): string {
    const statements: string[] = []

    for (const court of courts) {
        const courtId = generateId('court')

        // Insert court
        const name = court.name.replace(/'/g, "''")
        const address = court.address.replace(/'/g, "''")
        const description = court.description?.replace(/'/g, "''") || ''
        const postcode = court.postcode || ''
        const borough = court.borough || ''

        statements.push(`
INSERT INTO courts (id, name, description, address, postcode, borough, latitude, longitude, status)
VALUES ('${courtId}', '${name}', '${description}', '${address}', '${postcode}', '${borough}', ${court.latitude}, ${court.longitude}, 'approved');
    `.trim())

        // Insert tags
        if (court.tags && court.tags.length > 0) {
            for (const tagId of court.tags) {
                statements.push(`INSERT OR IGNORE INTO court_tags (court_id, tag_id) VALUES ('${courtId}', '${tagId}');`)
            }
        }

        // Insert image if provided
        if (court.imageUrl) {
            const imageId = generateId('img')
            statements.push(`INSERT INTO court_images (id, court_id, url, alt_text, is_primary) VALUES ('${imageId}', '${courtId}', '${court.imageUrl}', '${name}', 1);`)
        }

        statements.push('') // Empty line for readability
    }

    return statements.join('\n')
}

// Output the SQL
console.log('-- Generated seed SQL for HoopRepublic courts')
console.log('-- Run this with: npx wrangler d1 execute hooprepublic-db --file=./db/seed.sql')
console.log('')
console.log(generateSQL())
console.log('')
console.log(`-- Total courts: ${courts.length}`)
