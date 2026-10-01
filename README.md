# AtlasLive

Live map of beaches, restaurants, hotels, attractions and nightlife, where signed-in users post real-time reports on crowd level, parking and sea conditions. Full-stack Next.js on Supabase.

## Features

- Interactive Leaflet map with category filter (beach, restaurant, hotel, attraction, nightlife, service)
- Places and live reports stored in Supabase Postgres
- Live reports: crowd level, parking status and sea condition per place
- Supabase Auth with sign-up, login and session middleware protecting routes
- Row Level Security on every table: public read, authenticated write, users can only edit or delete their own data
- Profile row created automatically for each new user via a database trigger

## Data model

`supabase/schema.sql` defines:

| Table | Purpose |
|---|---|
| `profiles` | Extends `auth.users` with display name and avatar |
| `places` | Map destinations: name, category, coordinates, address |
| `live_reports` | Time-stamped user reports per place |

Enums constrain categories, crowd levels, parking status and sea conditions. Indexes cover category filtering and per-place, newest-first report lookups.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Supabase (Postgres, Auth, RLS) · Leaflet / react-leaflet · Tailwind CSS 4

## Run locally

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. Create `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Install and start:

   ```bash
   npm install
   npm run dev
   ```

Open http://localhost:3000.
