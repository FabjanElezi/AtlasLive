import { createClient } from '@/lib/supabase/server'
import { MapClient } from '@/components/map/MapClient'

export default async function Home() {
  const supabase = await createClient()
  const { data: places } = await supabase
    .from('places')
    .select('*')
    .order('name')

  return <MapClient places={places ?? []} />
}
