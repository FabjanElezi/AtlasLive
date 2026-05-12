'use client'

import dynamic from 'next/dynamic'
import type { Place } from '@/types'
import type { User } from '@supabase/supabase-js'

const MapView = dynamic(
  () => import('./MapView').then((m) => m.MapView),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 w-full animate-pulse bg-muted flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading map…</p>
      </div>
    ),
  }
)

interface MapClientProps {
  places: Place[]
  user: User | null
}

export function MapClient({ places, user }: MapClientProps) {
  return <MapView places={places} user={user} />
}
