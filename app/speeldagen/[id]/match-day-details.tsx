import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MatchDayWithDetails } from '@/lib/types/database'

interface MatchDayDetailsProps {
  matchDay: MatchDayWithDetails
}

export function MatchDayDetails({ matchDay }: MatchDayDetailsProps) {
  const bibsPlayers = matchDay.registrations?.filter(r => r.brings_bibs) || []
  const keysPlayers = matchDay.registrations?.filter(r => r.brings_key) || []

  return (
    <div className="space-y-6">
      {/* Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>Informatie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕐</span>
            <div>
              <div className="font-medium">Tijd</div>
              <div className="text-muted">{matchDay.time.substring(0, 5)}</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">📍</span>
            <div>
              <div className="font-medium">{matchDay.location?.name}</div>
              <div className="text-muted text-sm">{matchDay.location?.address}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registrations Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            Aanmeldingen ({matchDay.registrations?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {matchDay.registrations?.length === 0 ? (
            <p className="text-muted text-center py-4">
              Nog geen aanmeldingen
            </p>
          ) : (
            <div className="space-y-2">
              {matchDay.registrations?.map((reg) => (
                <div
                  key={reg.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-input/50"
                >
                  <div className="font-medium">{reg.profile?.full_name}</div>
                  <div className="flex items-center gap-2">
                    {reg.brings_bibs && <span title="Neemt hesjes mee">👕</span>}
                    {reg.brings_key && <span title="Neemt sleutel mee">🔑</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bibs & Keys Status */}
      {matchDay.registrations && matchDay.registrations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hesjes & Sleutels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👕</span>
                <span className="font-medium">Hesjes</span>
              </div>
              {bibsPlayers.length === 0 ? (
                <p className="text-sm text-orange-500">⚠️ Niemand neemt hesjes mee</p>
              ) : (
                <p className="text-sm text-muted">
                  {bibsPlayers.map(p => p.profile?.full_name).join(', ')}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🔑</span>
                <span className="font-medium">Sleutel</span>
              </div>
              {keysPlayers.length === 0 ? (
                <p className="text-sm text-orange-500">⚠️ Niemand neemt sleutel mee</p>
              ) : (
                <p className="text-sm text-muted">
                  {keysPlayers.map(p => p.profile?.full_name).join(', ')}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
