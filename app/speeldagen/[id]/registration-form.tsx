'use client'

import { useState } from 'react'
import { registerForMatchDay, unregisterFromMatchDay } from '@/app/actions/match-days'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Registration } from '@/lib/types/database'

interface RegistrationFormProps {
  matchDayId: string
  userRegistration?: Registration
}

export function RegistrationForm({ matchDayId, userRegistration }: RegistrationFormProps) {
  const [loading, setLoading] = useState(false)
  const [bringsBibs, setBringsBibs] = useState(userRegistration?.brings_bibs || false)
  const [bringsKey, setBringsKey] = useState(userRegistration?.brings_key || false)

  async function handleRegister() {
    setLoading(true)
    try {
      await registerForMatchDay(matchDayId, {
        brings_bibs: bringsBibs,
        brings_key: bringsKey,
      })
    } catch (error) {
      console.error(error)
      alert('Er ging iets mis bij het aanmelden')
    } finally {
      setLoading(false)
    }
  }

  async function handleUnregister() {
    if (!confirm('Weet je zeker dat je je wilt afmelden?')) return

    setLoading(true)
    try {
      await unregisterFromMatchDay(matchDayId)
    } catch (error) {
      console.error(error)
      alert('Er ging iets mis bij het afmelden')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {userRegistration ? 'Je bent aangemeld!' : 'Aanmelden'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bringsBibs}
                onChange={(e) => setBringsBibs(e.target.checked)}
                disabled={loading}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-2">
                <span className="text-xl">👕</span>
                <span>Ik neem hesjes mee</span>
              </span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bringsKey}
                onChange={(e) => setBringsKey(e.target.checked)}
                disabled={loading}
                className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
              />
              <span className="flex items-center gap-2">
                <span className="text-xl">🔑</span>
                <span>Ik neem sleutel mee</span>
              </span>
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            {userRegistration ? (
              <>
                <Button
                  onClick={handleRegister}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Gegevens bijwerken
                </Button>
                <Button
                  onClick={handleUnregister}
                  variant="danger"
                  className="flex-1"
                  disabled={loading}
                >
                  Afmelden
                </Button>
              </>
            ) : (
              <Button
                onClick={handleRegister}
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? 'Bezig...' : 'Aanmelden'}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
