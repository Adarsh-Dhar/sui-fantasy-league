"use client";

import { useEffect, useState } from "react";
import Confetti from "@/components/confetti";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Match } from "@/lib/types";

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

  const winner = match.teamA.percentageChange > match.teamB.percentageChange 
    ? match.teamA 
    : match.teamB;
  
  const percentageGain = winner.percentageChange.toFixed(2);
  const winnerName = winner.name;
  const ownerName = winner.owner.username;

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
          <p className="text-sm text-muted-foreground">by {ownerName}</p>
          <div className="mt-4 text-xl font-bold text-[hsl(var(--positive))]">
            +{percentageGain}%
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