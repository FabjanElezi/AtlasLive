'use client'

import { useActionState, useState } from 'react'
import { signIn, signUp } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [signInState, signInAction, signInPending] = useActionState(signIn, null)
  const [signUpState, signUpAction, signUpPending] = useActionState(signUp, null)

  const isSignIn = mode === 'signin'
  const error = isSignIn ? signInState?.error : signUpState?.error
  const pending = isSignIn ? signInPending : signUpPending

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight">AtlasLive</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Real-time travel intelligence for Albania
        </p>
      </div>

      {/* Mode toggle */}
      <div className="flex rounded-lg border p-1 mb-6 bg-muted">
        <button
          type="button"
          onClick={() => setMode('signin')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
            isSignIn ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => setMode('signup')}
          className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
            !isSignIn ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
        >
          Sign up
        </button>
      </div>

      <form action={isSignIn ? signInAction : signUpAction} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            autoComplete={isSignIn ? 'email' : 'email'}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            minLength={6}
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        {!isSignIn && signUpState && !signUpState.error && (
          <p className="text-sm text-muted-foreground">
            Check your email to confirm your account.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? 'Please wait…' : isSignIn ? 'Sign in' : 'Create account'}
        </Button>
      </form>
    </div>
  )
}
