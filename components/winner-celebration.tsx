"use client";

import { useEffect, useState } from "react";
import Confetti from "@/components/confetti";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define our own Match interface to match the database schema
interface MatchPlayer {
  id: string;
  address: string;
}

interface MatchTeam {
  id: string;
  name: string;
  tokens: string[];
  playerId: string;
}

interface Match {
  id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  type: 'RANDOM' | 'FRIEND';
  createdAt: string;
  updatedAt: string;
  playerOneId: string;
  playerOne: MatchPlayer;
  playerTwoId?: string;
  playerTwo?: MatchPlayer;
  teamOneId: string;
  teamOne: MatchTeam;
  teamTwoId?: string;
  teamTwo?: MatchTeam;
  winnerId?: string;
  result?: 'PLAYER_ONE_WIN' | 'PLAYER_TWO_WIN' | 'DRAW';
}

interface WinnerCelebrationProps {
  match: Match;
}

export const WinnerCelebration = ({ match }: WinnerCelebrationProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Determine the winner based on the match result
  let winnerTeam;
  let winnerPlayer;
  
  if (match.result === 'PLAYER_ONE_WIN') {
    winnerTeam = match.teamOne;
    winnerPlayer = match.playerOne;
  } else if (match.result === 'PLAYER_TWO_WIN') {
    winnerTeam = match.teamTwo;
    winnerPlayer = match.playerTwo;
  } else {
    // In case of a draw or no result, default to team one
    winnerTeam = match.teamOne;
    winnerPlayer = match.playerOne;
  }
  
  const winnerName = winnerTeam?.name;
  const ownerAddress = winnerPlayer?.address;
  const shortenedAddress = `${ownerAddress?.slice(0, 6)}...${ownerAddress?.slice(-4)}`;

  return (
    <div className="relative">
      {showConfetti && <Confetti />}
      <div className="mx-auto max-w-md px-6 py-12 text-center bg-card/80 backdrop-blur-sm border rounded-lg shadow-lg">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="rounded-full w-24 h-24 bg-secondary/10 flex items-center justify-center">
              <Trophy className="h-12 w-12 text-[hsl(var(--secondary))] animate-pulse" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
              <span className="text-sm font-bold">1</span>
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-2 glow-text">Congratulations!</h1>
        <div className="mb-6">
          <p className="text-lg font-medium mb-1">{winnerName}</p>
          <p className="text-sm text-muted-foreground">by {shortenedAddress}</p>
          <div className="mt-4 text-xl font-bold text-[hsl(var(--positive))]">
            Winner!
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link href="/matches">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Matches
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button variant="glowing" className="gap-2">
              <Trophy className="h-4 w-4" />
              Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};