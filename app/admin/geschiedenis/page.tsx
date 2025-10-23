import { getAllMatchDays } from '@/app/actions/admin'
import { TopNav, BottomNav } from '@/components/navigation'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function GeschiedenisPage() {
  const matchDays = await getAllMatchDays()

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const pastMatchDays = matchDays.filter(md => new Date(md.date) < today)
  const upcomingMatchDays = matchDays.filter(md => new Date(md.date) >= today)

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Geschiedenis</h1>
            <p className="text-muted">Overzicht van alle speeldagen</p>
          </div>

          <div className="space-y-8">
            {/* Upcoming */}
            {upcomingMatchDays.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Aankomende speeldagen</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {upcomingMatchDays.map((matchDay) => (
                    <MatchDayHistoryCard key={matchDay.id} matchDay={matchDay} />
                  ))}
                </div>
              </div>
            )}

            {/* Past */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Gespeelde speeldagen</h2>
              {pastMatchDays.length === 0 ? (
                <p className="text-muted text-center py-8">Nog geen gespeelde speeldagen</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {pastMatchDays.map((matchDay) => (
                    <MatchDayHistoryCard key={matchDay.id} matchDay={matchDay} isPast />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}

function MatchDayHistoryCard({ matchDay, isPast = false }: { matchDay: any; isPast?: boolean }) {
  const date = new Date(matchDay.date)
  const dayName = date.toLocaleDateString('nl-NL', { weekday: 'long' })
  const dateStr = date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })
  const registrationCount = matchDay.registrations?.length || 0

  return (
    <Link href={`/speeldagen/${matchDay.id}`}>
      <Card
        hover
        className={`${isPast ? 'opacity-75' : ''} ${matchDay.cancelled ? 'opacity-50' : ''}`}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold capitalize">{dayName}</h3>
              {matchDay.cancelled && (
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs rounded-full font-medium">
                  Geannuleerd
                </span>
              )}
            </div>
            <p className="text-sm text-muted">{dateStr}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{registrationCount}</div>
            <div className="text-xs text-muted">
              {registrationCount === 1 ? 'speler' : 'spelers'}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-foreground/80">
            <span className="text-lg">🕐</span>
            <span>{matchDay.time.substring(0, 5)}</span>
          </div>
          <div className="flex items-center gap-2 text-foreground/80">
            <span className="text-lg">📍</span>
            <span>{matchDay.location?.name}</span>
          </div>
        </div>
      </Card>
    </Link>
  )
}
