import { getLocations } from "../actions/match-days";
import { TopNav, BottomNav } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function InfoPage() {
  const locations = await getLocations();

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Locaties</h1>
            <p className="text-muted">
              Hier vind je de locaties waar we voetballen
            </p>
          </div>

          <div className="space-y-4">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted mb-1">Adres</div>
                      <div className="font-medium">{location.address}</div>
                    </div>

                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        location.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
                    >
                      <span>🗺️</span>
                      <span>Navigeer naar locatie</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 p-6 bg-accent/10 rounded-xl border border-accent/20">
            <h2 className="text-xl font-semibold mb-3">💡 Tip</h2>
            <p className="text-muted">
              Klik op &quot;Navigeer naar locatie&quot; om de locatie te openen
              in je favoriete navigatie-app. Je kunt kiezen uit Google Maps,
              Apple Maps, Waze en meer!
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </>
  );
}
