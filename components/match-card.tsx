"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Trophy, Clock, User } from "lucide-react";

interface MatchCardProps {
  match: any; // Using any for now to accommodate both mock and API data structures
}

export const MatchCard = ({ match }: MatchCardProps) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const date = match.createdAt ? new Date(match.createdAt) : new Date(match.startTime || Date.now());
      setTimeAgo(formatDistanceToNow(date, { addSuffix: true }));
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 60000);

    return () => clearInterval(interval);
  }, [match.createdAt, match.startTime]);
  
  // Determine if this is history API data, game API data, or mock data
  const isHistoryData = !!match.teamOne && !match.playerOne;
  const isGameApiData = !!match.playerOne;
  const isMockData = !isHistoryData && !isGameApiData;
  
  // Extract match status (API format uses uppercase, mock uses lowercase)
  const status = isMockData 
    ? match.status 
    : match.status.toLowerCase();
  
  // Extract team data based on the format
  let teamA, teamB;
  
  if (isHistoryData) {
    // History API format
    teamA = {
      name: match.teamOne?.name || "Team One",
      owner: {
        username: match.teamOne?.player?.address 
          ? `${match.teamOne.player.address.slice(0, 6)}...${match.teamOne.player.address.slice(-4)}` 
          : "Player One",
        avatar: ""
      },
      percentageChange: match.teamOneScore || 0
    };
    
    teamB = {
      name: match.teamTwo?.name || "Waiting for opponent",
      owner: {
        username: match.teamTwo?.player?.address 
          ? `${match.teamTwo.player.address.slice(0, 6)}...${match.teamTwo.player.address.slice(-4)}` 
          : "Waiting for opponent",
        avatar: ""
      },
      percentageChange: match.teamTwoScore || 0
    };
  } else if (isGameApiData) {
    // Game API format
    teamA = {
      name: match.teamOne?.name || "Team One",
      owner: {
        username: match.playerOne?.address 
          ? `${match.playerOne.address.slice(0, 6)}...${match.playerOne.address.slice(-4)}` 
          : "Player One",
        avatar: ""
      },
      percentageChange: match.teamOneScore || 0
    };
    
    teamB = {
      name: match.teamTwo?.name || "Waiting for opponent",
      owner: {
        username: match.playerTwo?.address 
          ? `${match.playerTwo.address.slice(0, 6)}...${match.playerTwo.address.slice(-4)}` 
          : "Waiting for opponent",
        avatar: ""
      },
      percentageChange: match.teamTwoScore || 0
    };
  } else {
    // Mock data format
    teamA = match.teamA;
    teamB = match.teamB;
  }
  
  // Determine match duration
  const duration = isMockData
    ? match.duration
    : match.status === "COMPLETED" || match.status === "completed"
      ? "Completed" 
      : match.status === "IN_PROGRESS" || match.status === "in_progress"
        ? "In Progress" 
        : "Pending";

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <div className="match-card bg-card/90 backdrop-blur-sm rounded-lg border p-4 hover:border-primary/50 transition-all">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                  status === "in_progress" || (status === "pending" && (isHistoryData || isGameApiData))
                    ? "bg-green-500/20 text-green-500"
                    : status === "completed"
                    ? "bg-blue-500/20 text-blue-500"
                    : "bg-yellow-500/20 text-yellow-500"
                }`}
              >
                {status === "in_progress" || (status === "pending" && (isHistoryData || isGameApiData) && (match.playerTwo || match.teamTwo)) ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live
                  </>
                ) : status === "completed" ? (
                  <>
                    <Trophy className="h-3 w-3" />
                    Completed
                  </>
                ) : (
                  <>
                    <Clock className="h-3 w-3" />
                    {isMockData ? "Scheduled" : "Pending"}
                  </>
                )}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              {status === "in_progress" ? (
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
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                  {teamA.owner.avatar ? (
                    <img
                      src={teamA.owner.avatar}
                      alt={teamA.owner.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base truncate max-w-[8rem]">
                    {teamA.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[8rem]">
                    {teamA.owner.username}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="text-lg sm:text-xl font-bold">VS</div>
              {isMockData && (
                <div className="mt-2 flex space-x-3 justify-center">
                  <div
                    className={`text-sm sm:text-base font-medium ${
                      teamA.percentageChange >= 0
                        ? "positive-value"
                        : "negative-value"
                    }`}
                  >
                    {teamA.percentageChange >= 0 ? "+" : ""}
                    {teamA.percentageChange.toFixed(2)}%
                  </div>
                  <div
                    className={`text-sm sm:text-base font-medium ${
                      teamB.percentageChange >= 0
                        ? "positive-value"
                        : "negative-value"
                    }`}
                  >
                    {teamB.percentageChange >= 0 ? "+" : ""}
                    {teamB.percentageChange.toFixed(2)}%
                  </div>
                </div>
              )}
              <div className="mt-2 text-xs text-muted-foreground">
                {isMockData ? `Duration: ${duration}` : `Status: ${match.status}`}
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-muted rounded-full overflow-hidden flex items-center justify-center">
                  {teamB.owner.avatar ? (
                    <img
                      src={teamB.owner.avatar}
                      alt={teamB.owner.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base truncate max-w-[8rem]">
                    {teamB.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[8rem]">
                    {teamB.owner.username}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {isMockData && match.status === "live" && (
            <div className="mt-4 flex justify-between items-center">
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  teamA.percentageChange > teamB.percentageChange
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {teamA.percentageChange > teamB.percentageChange
                  ? "Leading"
                  : "Behind"}
              </div>
              <div className="h-1 flex-1 mx-4 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    teamA.percentageChange > teamB.percentageChange
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: `${
                      teamA.percentageChange > teamB.percentageChange
                        ? "60%"
                        : "40%"
                    }`,
                  }}
                ></div>
              </div>
              <div
                className={`text-xs px-2 py-1 rounded-full ${
                  teamB.percentageChange > teamA.percentageChange
                    ? "bg-green-500/20 text-green-500"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {teamB.percentageChange > teamA.percentageChange
                  ? "Leading"
                  : "Behind"}
              </div>
            </div>
          )}

          {(isHistoryData || isGameApiData) && match.result && (
            <div className="mt-4 text-center">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500`}
              >
                <Trophy className="h-3 w-3" />
                Winner:{" "}
                {match.result === "PLAYER_ONE_WIN"
                  ? teamA.name
                  : match.result === "PLAYER_TWO_WIN"
                  ? teamB.name
                  : "Draw"}
              </div>
            </div>
          )}
          
          {isMockData && match.status === "completed" && match.winner && (
            <div className="mt-4 text-center">
              <div
                className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-500`}
              >
                <Trophy className="h-3 w-3" />
                Winner:{" "}
                {match.winner === "teamA"
                  ? teamA.name
                  : teamB.name}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};