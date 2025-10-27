"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { MatchDayWithDetails } from "@/lib/types/database";

interface MatchDayCardProps {
  matchDay: MatchDayWithDetails;
}

export function MatchDayCard({ matchDay }: MatchDayCardProps) {
  const router = useRouter();

  const registrationCount = matchDay.registrations?.length || 0;
  const date = new Date(matchDay.date);
  const dayName = date.toLocaleDateString("nl-NL", { weekday: "long" });
  const dateStr = date.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Card
      hover
      onClick={() => router.push(`/speeldagen/${matchDay.id}`)}
      className={matchDay.cancelled ? "opacity-60" : ""}
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
          <p className="text-sm text-gray-600">{dateStr}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {registrationCount}
          </div>
          <div className="text-xs text-gray-600">
            {registrationCount === 1 ? "speler" : "spelers"}
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

      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-600">
        {matchDay.registrations?.some((r) => r.brings_bibs) && (
          <div className="flex items-center gap-1">
            <span>👕</span>
            <span>Hesjes</span>
          </div>
        )}
        {matchDay.registrations?.some((r) => r.brings_key) && (
          <div className="flex items-center gap-1">
            <span>🔑</span>
            <span>Sleutel</span>
          </div>
        )}
        {!matchDay.registrations?.some((r) => r.brings_bibs) &&
          !matchDay.registrations?.some((r) => r.brings_key) && (
            <span className="text-orange-500">⚠️ Nog geen hesjes/sleutel</span>
          )}
      </div>
    </Card>
  );
}
