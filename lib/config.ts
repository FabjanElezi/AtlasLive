export const config = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  },
  mapbox: {
    token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
} as const
