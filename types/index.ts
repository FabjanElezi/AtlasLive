export type PlaceCategory =
  | 'beach'
  | 'restaurant'
  | 'hotel'
  | 'attraction'
  | 'nightlife'
  | 'service'

export type CrowdLevel = 'empty' | 'quiet' | 'moderate' | 'busy' | 'packed'

export type ParkingStatus = 'available' | 'limited' | 'full'

export type SeaCondition = 'calm' | 'choppy' | 'rough'

export type Place = {
  id: string
  name: string
  category: PlaceCategory
  lat: number
  lng: number
  description: string | null
  address: string | null
  created_at: string
}

export type LiveReport = {
  id: string
  place_id: string
  user_id: string
  crowd_level: CrowdLevel | null
  vibe: string | null
  parking: ParkingStatus | null
  sea_condition: SeaCondition | null
  notes: string | null
  photo_url: string | null
  created_at: string
}

export type Profile = {
  id: string
  display_name: string | null
  avatar_url: string | null
  created_at: string
}
