'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from '@/app/actions/auth'
import type { User } from '@supabase/supabase-js'

interface UserMenuProps {
  user: User | null
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  if (!user) {
    return (
      <button
        onClick={() => router.push('/auth/login')}
        className="flex items-center gap-2 bg-background/90 hover:bg-background border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-colors"
      >
        Sign in
      </button>
    )
  }

  return (
    <div className="flex items-center gap-2 bg-background/90 border border-border rounded-full px-3 py-1.5 shadow-sm">
      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
        {user.email?.[0].toUpperCase()}
      </div>
      <span className="text-sm text-muted-foreground max-w-[120px] truncate hidden sm:block">
        {user.email}
      </span>
      <button
        onClick={() => startTransition(() => signOut())}
        disabled={pending}
        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        {pending ? '…' : 'Sign out'}
      </button>
    </div>
  )
}
