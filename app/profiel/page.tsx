import { getUserProfile, signOut } from '../actions/auth'
import { TopNav, BottomNav } from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const dynamic = 'force-dynamic'

export default async function ProfielPage() {
  const profile = await getUserProfile()

  if (!profile) {
    return <div>Laden...</div>
  }

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Profiel</h1>
            <p className="text-muted">Je persoonlijke gegevens</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gegevens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted mb-1">Naam</div>
                  <div className="font-medium text-lg">{profile.full_name}</div>
                </div>

                <div>
                  <div className="text-sm text-muted mb-1">E-mailadres</div>
                  <div className="font-medium">{profile.email}</div>
                </div>

                <div>
                  <div className="text-sm text-muted mb-1">Lid sinds</div>
                  <div className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString('nl-NL', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={signOut}>
                  <Button type="submit" variant="danger" className="w-full">
                    Uitloggen
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="p-6 bg-muted/30 rounded-xl border border-border">
              <h3 className="font-semibold mb-2">🚀 Binnenkort beschikbaar</h3>
              <ul className="text-sm text-muted space-y-1">
                <li>• Profielfoto uploaden</li>
                <li>• Bijnaam of tagline toevoegen</li>
                <li>• Statistieken bekijken</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  )
}
