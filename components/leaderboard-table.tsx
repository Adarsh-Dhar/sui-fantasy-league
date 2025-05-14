"use client";

import { LeaderboardEntry } from "@/lib/types";
import { Trophy, Medal, MedalIcon } from "lucide-react";

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardTable = ({ entries }: LeaderboardTableProps) => {
  const getRankStyles = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]";
      case 2:
        return "bg-[#C0C0C0]/20 text-[#C0C0C0] border-[#C0C0C0]";
      case 3:
        return "bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]";
      default:
        return "bg-muted/50 text-muted-foreground border-border";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5" />;
      case 2:
      case 3:
        return <Medal className="h-5 w-5" />;
      default:
        return <span className="text-sm font-bold">#{rank}</span>;
    }
  };

  return (
    <div className="overflow-x-auto w-full">
      <div className="bg-card/90 backdrop-blur-sm border rounded-lg overflow-hidden">
        <div className="flex gap-4 px-4 py-3 bg-muted/30">
          <div className="w-12 text-center">Rank</div>
          <div className="flex-1">Player</div>
          <div className="w-16 text-center">Wins</div>
          <div className="w-16 text-center">Losses</div>
          <div className="w-20 text-center">Points</div>
        </div>
        
        <div className="divide-y divide-border/50">
          {entries.map((entry) => (
            <div 
              key={entry.user.id}
              className={`flex items-center gap-4 px-4 py-3 hover:bg-muted/10 transition-colors ${
                entry.rank <= 3 ? "bg-gradient-to-r from-transparent to-muted/10" : ""
              }`}
            >
              <div className="w-12 text-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center border ${getRankStyles(entry.rank)}`}
                >
                  {getRankIcon(entry.rank)}
                </div>
              </div>
              
              <div className="flex-1 flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-muted">
                  <img
                    src={entry.user.avatar}
                    alt={entry.user.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">{entry.user.username}</span>
              </div>
              
              <div className="w-16 text-center font-medium">{entry.wins}</div>
              <div className="w-16 text-center text-muted-foreground">{entry.losses}</div>
              <div className="w-20 text-center">
                <span className={`font-bold ${entry.rank <= 3 ? "text-primary" : ""}`}>
                  {entry.points.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};