'use client'

import 'leaflet/dist/leaflet.css'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { CategoryFilter } from './CategoryFilter'
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

// Sample places — replace with live Supabase data once DB is set up
const SAMPLE_PLACES: Place[] = [
  { id: '1', name: 'Tirana', category: 'attraction', lat: 41.3275, lng: 19.8187, description: 'Capital city of Albania', address: 'Tirana', created_at: '' },
  { id: '2', name: 'Shkodër', category: 'attraction', lat: 42.0683, lng: 19.5126, description: 'Historic city in northern Albania', address: 'Shkodër', created_at: '' },
  { id: '3', name: 'Sarandë', category: 'beach', lat: 39.8752, lng: 20.0069, description: 'Popular beach town on the Ionian Sea', address: 'Sarandë', created_at: '' },
  { id: '4', name: 'Butrint', category: 'attraction', lat: 39.7453, lng: 20.0196, description: 'Ancient ruins — UNESCO World Heritage Site', address: 'Butrint National Park', created_at: '' },
  { id: '5', name: 'Gjirokastër', category: 'attraction', lat: 40.0758, lng: 20.1389, description: 'UNESCO-listed "City of Stone"', address: 'Gjirokastër', created_at: '' },
  { id: '6', name: 'Velipojë Beach', category: 'beach', lat: 41.8726, lng: 19.4272, description: 'Long sandy beach in northern Albania', address: 'Velipojë, Shkodër', created_at: '' },
  { id: '7', name: 'Durrës Beach', category: 'beach', lat: 41.3246, lng: 19.4397, description: 'Closest beach to Tirana', address: 'Durrës', created_at: '' },
  { id: '8', name: 'Berat', category: 'attraction', lat: 40.7058, lng: 19.9522, description: 'City of a Thousand Windows', address: 'Berat', created_at: '' },
  { id: '9', name: 'Ksamil', category: 'beach', lat: 39.7707, lng: 20.0032, description: 'Crystal-clear water, island views', address: 'Ksamil, Sarandë', created_at: '' },
  { id: '10', name: 'Vlorë', category: 'beach', lat: 40.4667, lng: 19.4833, description: 'Gateway to the Albanian Riviera', address: 'Vlorë', created_at: '' },
]

export function MapView() {
  const [activeCategory, setActiveCategory] = useState<PlaceCategory | 'all'>('all')

  const visiblePlaces =
    activeCategory === 'all'
      ? SAMPLE_PLACES
      : SAMPLE_PLACES.filter((p) => p.category === activeCategory)

  return (
    <div className="relative flex-1 w-full">
      {/* Category filter overlay */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] px-4 w-full max-w-xl">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
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
