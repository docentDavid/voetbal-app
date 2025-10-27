import { getMatchDays } from "../actions/match-days";
import { MatchDayCard } from "./match-day-card";
import { CreateMatchDayButton } from "./create-match-day-button";
import { TopNav, BottomNav } from "@/components/navigation";

export const dynamic = "force-dynamic";

export default async function SpeeldagenPage() {
  const matchDays = await getMatchDays();

  return (
    <>
      <TopNav />
      <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Speeldagen</h1>
              <p className="text-gray-600">
                Bekijk en meld je aan voor aankomende speeldagen
              </p>
            </div>
            <CreateMatchDayButton />
          </div>

          {matchDays.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚽</div>
              <h2 className="text-2xl font-semibold mb-2">
                Geen speeldagen gepland
              </h2>
              <p className="text-gray-600 mb-6">Maak de eerste speeldag aan!</p>
              <CreateMatchDayButton />
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {matchDays.map((matchDay) => (
                <MatchDayCard key={matchDay.id} matchDay={matchDay} />
              ))}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
