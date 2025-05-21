"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Confetti from "@/components/confetti";
import { Trophy, ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
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
  endTime?: number;
  duration?: number;
}

export default function MatchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Get scores from URL params
  const matchId = searchParams.get('id');
  const teamAScore = parseFloat(searchParams.get('teamAScore') || '0');
  const teamBScore = parseFloat(searchParams.get('teamBScore') || '0');
  
  // Determine winner based on scores
  const teamAWins = teamAScore > teamBScore;
  const isDraw = teamAScore === teamBScore;
  
  useEffect(() => {
    // Show confetti effect
    setShowConfetti(true);
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fetch match data
  useEffect(() => {
    const fetchMatch = async () => {
      if (!matchId) {
        router.push('/matches');
        return;
      }
      
      try {
        setLoading(true);
        const response = await fetch(`/api/game/match?id=${matchId}`);
        
        if (response.ok) {
          const data = await response.json();
          setMatch(data.match);
        } else {
          console.error("Failed to fetch match data");
          router.push('/matches');
        }
      } catch (error) {
        console.error("Error fetching match:", error);
        router.push('/matches');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatch();
  }, [matchId, router]);
  
  if (loading || !match) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Determine winner and loser teams
  const winnerTeam = teamAWins ? match.teamOne : (isDraw ? null : match.teamTwo);
  const loserTeam = teamAWins ? match.teamTwo : (isDraw ? null : match.teamOne);
  const winnerScore = teamAWins ? teamAScore : teamBScore;
  const loserScore = teamAWins ? teamBScore : teamAScore;
  
  // Determine winner player
  const winnerPlayer = teamAWins ? match.playerOne : (isDraw ? null : match.playerTwo);
  
  // Format addresses for display
  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="relative">
        {showConfetti && <Confetti />}
        
        <div className="mb-8">
          <Link href="/matches">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Matches
            </Button>
          </Link>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm border rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold mb-8 glow-text">Match Results</h1>
          
          {isDraw ? (
            <div className="mb-8">
              <div className="text-2xl font-bold mb-2">It's a Draw!</div>
              <div className="text-xl mb-6">Both teams performed equally well</div>
              
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className="text-lg font-medium mb-1">{match.teamOne.name}</div>
                  <div className="text-3xl font-bold text-primary">{teamAScore.toFixed(4)}%</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    by {formatAddress(match.playerOne.address)}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-medium mb-1">{match.teamTwo?.name || 'Team B'}</div>
                  <div className="text-3xl font-bold text-primary">{teamBScore.toFixed(4)}%</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    by {formatAddress(match.playerTwo?.address)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="rounded-full w-24 h-24 bg-secondary/10 flex items-center justify-center">
                      <Trophy className="h-12 w-12 text-[hsl(var(--secondary))] animate-pulse" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-sm font-bold">1</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold mt-4 mb-2">Congratulations!</h2>
                <div className="text-xl font-medium mb-1">{winnerTeam?.name}</div>
                <div className="text-sm text-muted-foreground mb-2">
                  by {formatAddress(winnerPlayer?.address)}
                </div>
                <div className="flex justify-center items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-[hsl(var(--positive))]" />
                  <div className="text-3xl font-bold text-[hsl(var(--positive))]">
                    {winnerScore.toFixed(4)}%
                  </div>
                </div>
                <div className="text-lg font-bold text-[hsl(var(--positive))]">
                  Winner!
                </div>
              </div>
              
              {loserTeam && (
                <div className="mt-8 pt-8 border-t">
                  <div className="text-xl font-medium mb-1">{loserTeam.name}</div>
                  <div className="text-sm text-muted-foreground mb-2">
                    by {formatAddress(teamAWins ? match.playerTwo?.address : match.playerOne.address)}
                  </div>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <TrendingDown className="h-5 w-5 text-[hsl(var(--negative))]" />
                    <div className="text-2xl font-bold text-[hsl(var(--negative))]">
                      {loserScore.toFixed(4)}%
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          
          <div className="flex gap-4 justify-center mt-10">
            <Link href="/matches">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Matches
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="default" className="gap-2">
                <Trophy className="h-4 w-4" />
                Leaderboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
