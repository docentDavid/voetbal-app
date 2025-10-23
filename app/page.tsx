'use client'

import { useState } from 'react'
import Image from 'next/image'
import { signIn, signUp } from './actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')

    const result = isSignUp ? await signUp(formData) : await signIn(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - Hero */}
      <div className="lg:w-1/2 bg-gradient-to-br from-primary via-primary-light to-secondary p-8 lg:p-16 flex flex-col justify-center items-center text-white">
        <div className="max-w-lg w-full">
          <h1 className="text-5xl lg:text-6xl font-bold mb-6">
            Voetbal App
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90">
            Meld je aan voor voetbal op maandag of zaterdag
          </p>

          {/* Placeholder for team photo */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="w-24 h-24 mx-auto mb-4 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p className="text-white/60 text-sm">
                Plaats hier je team foto in /public/team.jpg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="lg:w-1/2 p-8 lg:p-16 flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-3xl">
              {isSignUp ? 'Account aanmaken' : 'Inloggen'}
            </CardTitle>
            <p className="text-muted text-sm mt-2">
              {isSignUp
                ? 'Vul je gegevens in om je aan te melden'
                : 'Log in om speeldagen te bekijken'}
            </p>
          </CardHeader>

          <CardContent>
            <form action={handleSubmit} className="space-y-4">
              {isSignUp && (
                <Input
                  name="full_name"
                  label="Volledige naam"
                  placeholder="Jan de Vries"
                  required
                  disabled={loading}
                />
              )}

              <Input
                name="email"
                type="email"
                label="E-mailadres"
                placeholder="jan@example.com"
                required
                disabled={loading}
              />

              <Input
                name="password"
                type="password"
                label="Wachtwoord"
                placeholder="••••••••"
                required
                disabled={loading}
              />

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? 'Bezig...' : isSignUp ? 'Account aanmaken' : 'Inloggen'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError('')
                }}
                className="text-sm text-primary hover:underline"
                disabled={loading}
              >
                {isSignUp
                  ? 'Heb je al een account? Log in'
                  : 'Nog geen account? Maak er een aan'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
