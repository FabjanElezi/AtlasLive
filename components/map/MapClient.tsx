'use client'

import dynamic from 'next/dynamic'

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

export function MapClient() {
  return <MapView />
}
