import { leaderboard } from "@/lib/data";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { Trophy } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top performers in the SUI Fantasy League
          </p>
        </div>
        
        <div className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {leaderboard.slice(0, 3).map((entry) => (
              <div
                key={entry.user.id}
                className={`stats-card relative overflow-hidden ${
                  entry.rank === 1
                    ? "ring-2 ring-[#FFD700]/50 shadow-[0_0_15px_rgba(255,215,0,0.2)]"
                    : ""
                }`}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        entry.rank === 1
                          ? "border-[#FFD700] bg-[#FFD700]/10"
                          : entry.rank === 2
                          ? "border-[#C0C0C0] bg-[#C0C0C0]/10"
                          : "border-[#CD7F32] bg-[#CD7F32]/10"
                      }`}
                    >
                      <span className="text-xl font-bold">#{entry.rank}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
                          <img
                            src={entry.user.avatar}
                            alt={entry.user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold">{entry.user.username}</h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-2 rounded-md bg-background/30">
                      <p className="text-xs text-muted-foreground">Matches</p>
                      <p className="font-bold text-lg">
                        {entry.wins + entry.losses}
                      </p>
                    </div>
                    <div className="p-2 rounded-md bg-background/30">
                      <p className="text-xs text-muted-foreground">Win Rate</p>
                      <p className="font-bold text-lg">
                        {Math.round(
                          (entry.wins / (entry.wins + entry.losses)) * 100
                        )}
                        %
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <div className="text-xs text-muted-foreground">
                      TOTAL POINTS
                    </div>
                    <div className="text-2xl font-bold text-primary">
                      {entry.points.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <LeaderboardTable entries={leaderboard} />
        </div>
      </div>
    </div>
  );
}