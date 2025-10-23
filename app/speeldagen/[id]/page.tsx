import { notFound } from "next/navigation";
import { getMatchDay } from "@/app/actions/match-days";
import { getUser } from "@/app/actions/auth";
import { TopNav, BottomNav } from "@/components/navigation";
import { MatchDayDetails } from "./match-day-details";
import { RegistrationForm } from "./registration-form";
import { EditMatchDayButton } from "./edit-match-day-button";

export const dynamic = "force-dynamic";

export default async function MatchDayPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  try {
    const matchDay = await getMatchDay(id);
    const user = await getUser();

    if (!user) {
      notFound();
    }

    const userRegistration = matchDay.registrations?.find(
      (reg) => reg.user_id === user.id
    );

    const date = new Date(matchDay.date);
    const dayName = date.toLocaleDateString("nl-NL", { weekday: "long" });
    const dateStr = date.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return (
      <>
        <TopNav />
        <div className="min-h-screen bg-background pb-20 lg:pb-8">
          <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-bold capitalize">{dayName}</h1>
                <EditMatchDayButton matchDay={matchDay} />
              </div>
              <p className="text-muted">{dateStr}</p>
              {matchDay.cancelled && (
                <div className="mt-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    ⚠️ Deze speeldag is geannuleerd
                  </p>
                </div>
              )}
            </div>

            <MatchDayDetails matchDay={matchDay} />

            {!matchDay.cancelled && (
              <RegistrationForm
                matchDayId={matchDay.id}
                userRegistration={userRegistration}
              />
            )}
          </div>
        </div>
        <BottomNav />
      </>
    );
  } catch {
    notFound();
  }
}
