"use client";

import { useState, useEffect } from "react";
import { Match } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Trophy, Clock } from "lucide-react";

interface MatchCardProps {
  match: Match;
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(
        formatDistanceToNow(new Date(match.startTime), { addSuffix: true })
      );
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [match.startTime]);

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <div className="match-card">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                  match.status === "live"
                    ? "bg-green-500/20 text-green-500"
                    : match.status === "completed"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {match.status === "live" ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live
                  </>
                ) : match.status === "completed" ? (
                  <>
                    <Trophy className="h-3 w-3" />
                    Completed
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    Scheduled
                  </>
                )}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {match.status === "live" ? (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Started {timeAgo}
                </span>
              ) : (
                <span>{timeAgo}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 items-center">
            <div className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full overflow-hidden">
                  <img
                    src={match.teamA.owner.avatar}
                    alt={match.teamA.owner.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base truncate max-w-[8rem]">
                    {match.teamA.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[8rem]">
                    {match.teamA.owner.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-lg sm:text-xl font-bold">VS</div>
              <div className="mt-2 flex space-x-3 justify-center">
                <div
                  className={`text-sm sm:text-base font-medium ${
                    match.teamA.percentageChange >= 0
                      ? "positive-value"
                      : "negative-value"
                  }`}
                >
                  {match.teamA.percentageChange >= 0 ? "+" : ""}
                  {match.teamA.percentageChange.toFixed(2)}%
                </div>
                <div
                  className={`text-sm sm:text-base font-medium ${
                    match.teamB.percentageChange >= 0
                      ? "positive-value"
                      : "negative-value"
                  }`}
                >
                  {match.teamB.percentageChange >= 0 ? "+" : ""}
                  {match.teamB.percentageChange.toFixed(2)}%
                </div>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Duration: {match.duration}
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full overflow-hidden">
                  <img
                    src={match.teamB.owner.avatar}
                    alt={match.teamB.owner.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base truncate max-w-[8rem]">
                    {match.teamB.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[8rem]">
                    {match.teamB.owner.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {match.status === "live" && (
            <div className="mt-4 flex justify-between items-center">
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  match.teamA.percentageChange > match.teamB.percentageChange
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {match.teamA.percentageChange > match.teamB.percentageChange
                  ? "Leading"
                  : "Behind"}
              </div>
              <div className="h-1 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    match.teamA.percentageChange > match.teamB.percentageChange
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${
                      match.teamA.percentageChange > match.teamB.percentageChange
                        ? "60%"
                        : "40%"
                    }`,
                  }}
                ></div>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  match.teamB.percentageChange > match.teamA.percentageChange
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {match.teamB.percentageChange > match.teamA.percentageChange
                  ? "Leading"
                  : "Behind"}
              </div>
            </div>
          )}

          {match.status === "completed" && match.winner && (
            <div className="mt-4 text-center">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500`}
              >
                <Trophy className="h-3 w-3" />
                Winner:{" "}
                {match.winner === "teamA"
                  ? match.teamA.name
                  : match.teamB.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};