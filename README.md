# HoopRepublic 🏀

A platform to connect basketball players in London by booking courts and joining games.

## Tech Stack

- **Frontend**: Nuxt 3 + Vue 3
- **Hosting**: Cloudflare Pages
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2 (for court images)

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Wrangler CLI (for Cloudflare deployment)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Database Setup

1. Create the D1 database:
```bash
npm run db:create
```

2. Copy the database ID from the output and add it to `wrangler.toml`

3. Run migrations:
```bash
npm run db:migrate
```

### Deployment

```bash
npm run deploy
```

## Project Structure

```
hooprepublic/
├── app/
│   ├── components/     # Vue components
│   ├── pages/          # Page routes
│   └── app.vue         # Root component
├── assets/
│   └── css/            # Global styles
├── db/
│   └── schema.sql      # D1 database schema
├── public/             # Static assets
├── server/
│   └── api/            # API endpoints
├── nuxt.config.ts      # Nuxt configuration
└── wrangler.toml       # Cloudflare configuration
```

## Features

- 🔍 Find basketball courts across London
- 📅 Book court time slots
- 👥 Create and join open games
- 🏃 Connect with other players

## License

MIT
