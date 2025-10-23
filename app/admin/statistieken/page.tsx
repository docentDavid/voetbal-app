import { getStatistics } from '@/app/actions/admin'
import { TopNav, BottomNav } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const dynamic = 'force-dynamic'

export default async function StatistiekenPage() {
  const stats = await getStatistics()

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Statistieken</h1>
            <p className="text-muted">Wie heeft er gevoetbald en waar?</p>
            <p className="text-sm text-muted mt-2">
              ℹ️ Alleen afgelopen speeldagen tellen mee (geen geannuleerde dagen)
            </p>
          </div>

          <div className="space-y-6">
            {/* Overview Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-1">
                      {stats.totalMatchDays}
                    </div>
                    <div className="text-sm text-muted">Gespeelde dagen</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-1">
                      {stats.totalRegistrations}
                    </div>
                    <div className="text-sm text-muted">Totaal aanmeldingen</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-highlight mb-1">
                      {stats.playerStats.length}
                    </div>
                    <div className="text-sm text-muted">Unieke spelers</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Player Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Spelers statistieken</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.playerStats.length === 0 ? (
                  <p className="text-muted text-center py-4">Nog geen statistieken beschikbaar</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-2 font-semibold">#</th>
                          <th className="text-left py-3 px-2 font-semibold">Naam</th>
                          <th className="text-center py-3 px-2 font-semibold">Gespeeld</th>
                          <th className="text-center py-3 px-2 font-semibold">👕 Hesjes</th>
                          <th className="text-center py-3 px-2 font-semibold">🔑 Sleutel</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.playerStats.map((player, index) => (
                          <tr key={player.id} className="border-b border-border/50">
                            <td className="py-3 px-2 text-muted">{index + 1}</td>
                            <td className="py-3 px-2 font-medium">{player.name}</td>
                            <td className="py-3 px-2 text-center">
                              <span className="inline-flex items-center justify-center bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-semibold min-w-[3rem]">
                                {player.count}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-center text-muted">{player.bibs}</td>
                            <td className="py-3 px-2 text-center text-muted">{player.keys}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Statistics */}
            <Card>
              <CardHeader>
                <CardTitle>Locatie statistieken</CardTitle>
              </CardHeader>
              <CardContent>
                {stats.locationStats.length === 0 ? (
                  <p className="text-muted text-center py-4">Nog geen statistieken beschikbaar</p>
                ) : (
                  <div className="space-y-4">
                    {stats.locationStats.map((location) => (
                      <div key={location.id}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <span className="font-medium">{location.name}</span>
                          </div>
                          <span className="text-2xl font-bold text-primary">{location.count}</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-primary h-full transition-all"
                            style={{
                              width: `${(location.count / stats.totalMatchDays) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}
