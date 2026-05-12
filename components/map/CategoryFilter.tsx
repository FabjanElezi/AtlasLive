'use client'

import type { PlaceCategory } from '@/types'

const CATEGORIES: { value: PlaceCategory | 'all'; label: string; emoji: string }[] = [
  { value: 'all', label: 'All', emoji: '🗺️' },
  { value: 'beach', label: 'Beach', emoji: '🏖️' },
  { value: 'restaurant', label: 'Food', emoji: '🍽️' },
  { value: 'hotel', label: 'Stay', emoji: '🏨' },
  { value: 'attraction', label: 'See', emoji: '📍' },
  { value: 'nightlife', label: 'Night', emoji: '🎵' },
  { value: 'service', label: 'Service', emoji: '🔧' },
]

interface CategoryFilterProps {
  active: PlaceCategory | 'all'
  onChange: (category: PlaceCategory | 'all') => void
}

export function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          onClick={() => onChange(cat.value)}
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium shadow-sm transition-colors ${
            active === cat.value
              ? 'bg-primary text-primary-foreground'
              : 'bg-background/90 text-foreground hover:bg-muted'
          }`}
        >
          <span>{cat.emoji}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}
