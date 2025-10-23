'use client'

import { useEffect, useState } from 'react'
import { createMatchDay, getLocations } from '../actions/match-days'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Location } from '@/lib/types/database'

interface CreateMatchDayModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateMatchDayModal({ isOpen, onClose }: CreateMatchDayModalProps) {
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      getLocations().then(setLocations).catch(console.error)
    }
  }, [isOpen])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      await createMatchDay(formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Er ging iets mis')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Nieuwe speeldag</h2>
          <button
            onClick={onClose}
            className="text-2xl text-muted hover:text-foreground"
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="date"
            type="date"
            label="Datum"
            required
            disabled={loading}
            min={new Date().toISOString().split('T')[0]}
          />

          <Input
            name="time"
            type="time"
            label="Tijd"
            required
            disabled={loading}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Locatie</label>
            <select
              name="location_id"
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Kies een locatie</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Annuleren
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? 'Bezig...' : 'Aanmaken'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
