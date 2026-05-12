import { createClient } from '@/lib/supabase/server'
import { MapClient } from '@/components/map/MapClient'

export default async function Home() {
  const supabase = await createClient()
  const [{ data: places }, { data: { user } }] = await Promise.all([
    supabase.from('places').select('*').order('name'),
    supabase.auth.getUser(),
  ])

  return <MapClient places={places ?? []} user={user} />
}
