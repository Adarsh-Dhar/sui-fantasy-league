"use client";

import { useEffect, useState } from "react";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { LeaderboardEntry } from "@/lib/types";

export function LeaderboardContent() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        
        const data = await response.json();
        
        // Transform the API data to match the LeaderboardEntry type
        const formattedData: LeaderboardEntry[] = data.map((player: any) => ({
          rank: player.rank,
          user: {
            id: player.id,
            username: player.address.substring(0, 6) + "..." + player.address.substring(player.address.length - 4),
            avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${player.address}`,
            teams: [],
          },
          wins: player.wins,
          losses: player.losses,
          points: player.points,
        }));
        
        setLeaderboard(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard data");
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try again later
        </p>
      </div>
    );
  }

  if (loading || leaderboard.length === 0) {
    return <LeaderboardSkeleton />;
  }

  // Get top 3 players for the featured cards
  const topPlayers = leaderboard.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {topPlayers.map((entry) => (
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
                    {entry.wins + entry.losses > 0 
                      ? Math.round((entry.wins / (entry.wins + entry.losses)) * 100)
                      : 0}
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
    </>
  );
}

// Skeleton loader for the leaderboard
export function LeaderboardSkeleton() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="stats-card relative overflow-hidden animate-pulse">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-muted"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-muted"></div>
                    <div>
                      <div className="h-4 w-24 bg-muted rounded"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-2 rounded-md bg-background/30">
                  <div className="h-3 w-12 mx-auto bg-muted rounded mb-2"></div>
                  <div className="h-5 w-8 mx-auto bg-muted rounded"></div>
                </div>
                <div className="p-2 rounded-md bg-background/30">
                  <div className="h-3 w-12 mx-auto bg-muted rounded mb-2"></div>
                  <div className="h-5 w-8 mx-auto bg-muted rounded"></div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <div className="h-3 w-20 mx-auto bg-muted rounded mb-2"></div>
                <div className="h-6 w-16 mx-auto bg-muted rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card/90 backdrop-blur-sm border rounded-lg overflow-hidden">
        <div className="flex gap-4 px-4 py-3 bg-muted/30">
          <div className="w-12 text-center">Rank</div>
          <div className="flex-1">Player</div>
          <div className="w-16 text-center">Wins</div>
          <div className="w-16 text-center">Losses</div>
          <div className="w-20 text-center">Points</div>
        </div>
        
        <div className="divide-y divide-border/50">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3 animate-pulse">
              <div className="w-12 text-center">
                <div className="w-8 h-8 rounded-full bg-muted mx-auto"></div>
              </div>
              
              <div className="flex-1 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-muted"></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>
              
              <div className="w-16 text-center">
                <div className="h-4 w-6 bg-muted rounded mx-auto"></div>
              </div>
              <div className="w-16 text-center">
                <div className="h-4 w-6 bg-muted rounded mx-auto"></div>
              </div>
              <div className="w-20 text-center">
                <div className="h-4 w-12 bg-muted rounded mx-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
