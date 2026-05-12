'use client'

import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import type { User } from '@supabase/supabase-js'
import { CategoryFilter } from './CategoryFilter'
import { UserMenu } from '@/components/auth/UserMenu'
import type { Place, PlaceCategory } from '@/types'

const ALBANIA_CENTER: [number, number] = [41.1533, 20.1683]

const CATEGORY_STYLE: Record<PlaceCategory, { emoji: string; color: string }> = {
  beach:      { emoji: '🏖️', color: '#0ea5e9' },
  restaurant: { emoji: '🍽️', color: '#f97316' },
  hotel:      { emoji: '🏨', color: '#8b5cf6' },
  attraction: { emoji: '📍', color: '#ef4444' },
  nightlife:  { emoji: '🎵', color: '#ec4899' },
  service:    { emoji: '🔧', color: '#6b7280' },
}

function createCategoryIcon(category: PlaceCategory) {
  const { emoji, color } = CATEGORY_STYLE[category]
  return L.divIcon({
    html: `<div style="background:${color};width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 2px 8px rgba(0,0,0,0.25);border:2px solid white;">${emoji}</div>`,
    className: '',
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -40],
  })
}

interface MapViewProps {
  places: Place[]
  user: User | null
}

export function MapView({ places, user }: MapViewProps) {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all')

  const visiblePlaces =
    activeCategory === 'all'
      ? places
      : places.filter((p) => p.category === activeCategory)

  return (
    <div className="relative flex-1 w-full">
      {/* Category filter — top center */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 w-full max-w-xl">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* User menu — top right */}
      <div className="absolute top-4 right-4 z-[1000]">
        <UserMenu user={user} />
      </div>

      <MapContainer
        center={ALBANIA_CENTER}
        zoom={8}
        minZoom={7}
        className="h-full w-full"
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {visiblePlaces.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createCategoryIcon(place.category)}
          >
            <Popup>
              <div className="min-w-[140px]">
                <p className="font-semibold text-sm">{place.name}</p>
                {place.description && (
                  <p className="text-xs text-muted-foreground mt-0.5">{place.description}</p>
                )}
                {place.address && (
                  <p className="text-xs text-muted-foreground">{place.address}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
