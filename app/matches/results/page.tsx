"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Confetti from "@/components/confetti";
import { Trophy, ArrowLeft, TrendingUp, TrendingDown, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BetDistributionResult } from "@/components/bet-distribution-result";
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { toast } from 'sonner';
import { VAULT_PACKAGE_ID } from '@/lib/constants';

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
  // Match price in SUI tokens
  price?: number;
  // Performance gains as percentages
  teamOneGain?: number;
  teamTwoGain?: number;
  // Betting distribution results
  winnerShare?: number;
  loserShare?: number;
  // Vault information
  vaultId?: string;
}

export default function MatchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [match, setMatch] = useState<Match | null>(null);
  const [loading, setLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  // Get scores from URL params
  const matchId = searchParams.get('id');
  const teamAScore = parseFloat(searchParams.get('teamAScore') || '0');
  const teamBScore = parseFloat(searchParams.get('teamBScore') || '0');
  
  // Get performance gains from URL params (for updating match data)
  const teamAGain = parseFloat(searchParams.get('teamAGain') || '0');
  const teamBGain = parseFloat(searchParams.get('teamBGain') || '0');
  
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
          console.log('data', data)
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

  const handleWithdrawShare = async (amount: number) => {
    console.log('handleWithdrawShare', account?.address, match)
    if (!account?.address || !match) return;

    try {
      if(!amount) {
        toast.error('No share available to withdraw');
        return;
      }

      const tx = new Transaction();
      const shareAmount = Math.floor(amount * 1000000000);

      // Call the withdraw function from the contract
     const coin = tx.moveCall({
      target: `${VAULT_PACKAGE_ID}::simple_vault::withdraw`,
      typeArguments: ['0x2::sui::SUI'],
      arguments: [
        tx.object(match.vaultId || ''),
        tx.pure.u64(shareAmount),
      ],
     })

      tx.transferObjects([coin], account.address);

      signAndExecute(
        {
          transaction: tx,
        },
        {
          onSuccess: (result) => {
            if (result.effects === 'success') {
              toast.success(`Successfully withdrew ${shareAmount} SUI`);
            } else {
              toast.error('Failed to withdraw share');
            }
          },
          onError: (error) => {
            console.error('Error withdrawing share:', error);
            toast.error('Failed to withdraw share');
          },
        },
      );
    } catch (error) {
      console.error('Error withdrawing share:', error);
      toast.error('Failed to withdraw share');
    }
  };

  // Handle match completion
  const handleCompleteMatch = async () => {
    if (!match || !match.vaultId) {
      console.error('Match or vault ID not found');
      return;
    }

    try {
      const tx = new Transaction();
      
      // Call the complete function from the vault contract
      tx.moveCall({
        arguments: [tx.object(match.vaultId)],
        target: `${VAULT_PACKAGE_ID}::simple_vault::complete`,
      });

      signAndExecute(
        {
          transaction: tx,
          chain: 'sui:devnet',
        },
        {
          onSuccess: async () => {
            // Update match status in the database
            const response = await fetch(`/api/matches/${match.id}/complete`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                teamOneScore: teamAScore,
                teamTwoScore: teamBScore,
                result: isDraw ? 'DRAW' : teamAWins ? 'PLAYER_ONE_WIN' : 'PLAYER_TWO_WIN',
                winnerId: isDraw ? null : teamAWins ? match.playerOneId : match.playerTwoId,
                endTime: new Date().toISOString(),
                teamOneGain: teamAGain,
                teamTwoGain: teamBGain,
              }),
            });

            if (response.ok) {
              router.push('/matches');
            } else {
              console.error('Failed to update match status');
            }
          },
          onError: (error) => {
            console.error('Error completing match:', error);
          },
        },
      );
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
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
              <div className="text-2xl font-bold mb-2">Its a Draw!</div>
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
                
                {winnerPlayer?.address === account?.address ? (
                  <h2 className="text-2xl font-bold mt-4 mb-2">Congratulations! You Won!</h2>
                ) : (
                  <h2 className="text-2xl font-bold mt-4 mb-2">Sorry, better luck next time!</h2>
                )}
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
          
          {/* Betting Distribution Results */}
          <div className="mt-10 pt-8 border-t">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Coins className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">Betting Results</h3>
            </div>
            
            {account?.address && match && (
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">
                    {winnerPlayer?.address === account.address ? 'Winner Share' : 'Loser Share'}
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {winnerPlayer?.address === account.address ? match.winnerShare : match.loserShare} SUI
                  </p>
                </div>
              </div>
            )}
            
            {/* Calculate bet distribution directly */}
            {(() => {
              // Get performance values directly from URL params
              // This ensures we're using the actual values displayed in the UI
              const teamAPerformance = parseFloat(searchParams.get('teamAScore') || '0');
              const teamBPerformance = parseFloat(searchParams.get('teamBScore') || '0');
              
              // Force different values for demonstration if they're identical
              let finalTeamAPerformance = teamAPerformance;
              let finalTeamBPerformance = teamBPerformance;
              
              if (Math.abs(teamAPerformance - teamBPerformance) < 0.0001) {
                finalTeamAPerformance = 0.5;
                finalTeamBPerformance = 0.1;
              }
              
              // Parameters
              const k = match.duration && match.duration <= 1 ? 0.2 : 
                      match.duration && match.duration <= 5 ? 0.15 : 
                      match.duration && match.duration <= 60 ? 0.1 : 0.05;
              
              // Use the match price from the database to determine pot amount
              const betAmount = match.price || 1; // Default to 1 SUI if price is not available
              const potAmount = betAmount * 2; // Total pot is price × number of players
              const floor = 0.05 * potAmount; // 5% minimum for loser
              
              // Determine winner and loser gains
              const isAWinner = finalTeamAPerformance > finalTeamBPerformance;
              const winnerGain = isAWinner ? finalTeamAPerformance : finalTeamBPerformance;
              const loserGain = isAWinner ? finalTeamBPerformance : finalTeamAPerformance;
              
              // Adjusted gains
              const adjustedWinnerGain = winnerGain + k;
              const adjustedLoserGain = loserGain + k;
              const totalAdjustedGain = adjustedWinnerGain + adjustedLoserGain;
              
              // Calculate shares
              let winnerShare = (adjustedWinnerGain / totalAdjustedGain) * potAmount;
              let loserShare = potAmount - winnerShare;
              
              // Apply floor
              if (loserShare < floor) {
                loserShare = floor;
                winnerShare = potAmount - floor;
              }
              
              // Format for display - use the actual bet amount instead of hardcoded 1 SUI
              const individualBetAmount = betAmount; // Each player's contribution
              const winnerProfit = (winnerShare - individualBetAmount).toFixed(4);
              const loserLoss = (individualBetAmount - loserShare).toFixed(4);
              
              
              return (
                <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg p-6 max-w-lg mx-auto shadow-xl">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-slate-800 border border-emerald-600/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-slate-200">Winner</h4>
                      <div className="text-2xl font-bold text-emerald-400">{winnerShare.toFixed(4)} SUI</div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-slate-300">Performance:</span>
                        <span className="text-sm font-medium bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                          +{winnerGain.toFixed(4)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-slate-300">Profit:</span>
                        <span className="text-sm font-medium bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded">
                          +{winnerProfit} SUI
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-slate-800 border border-amber-600/30 rounded-lg">
                      <h4 className="font-semibold mb-2 text-slate-200">Loser</h4>
                      <div className="text-2xl font-bold text-amber-400">{loserShare.toFixed(4)} SUI</div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-slate-300">Performance:</span>
                        <span className="text-sm font-medium bg-amber-900/60 text-amber-300 px-2 py-0.5 rounded">
                          {loserGain >= 0 ? '+' : ''}{loserGain.toFixed(4)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-slate-300">Loss:</span>
                        <span className="text-sm font-medium bg-red-900/60 text-red-300 px-2 py-0.5 rounded">
                          -{loserLoss} SUI
                        </span>
                      </div>
                    </div>
                  </div>
                  <div>
                  <Button 
                  onClick={async () => {
                    let amount;
                    console.log('winnerPlayer', winnerPlayer?.address, account?.address)
                    if(winnerPlayer?.address === account?.address) {
                      amount = winnerShare.toFixed(4);
                      console.log('amount1', amount)
                    } else {
                      amount = loserShare.toFixed(4);
                      console.log('amount2', amount)
                    }
                    if(!amount) {
                      toast.error('No share available to withdraw');
                      return;
                    }
                    console.log('amount', amount)
                    await handleWithdrawShare(parseFloat(amount.toString()))
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Withdraw Share
                </Button>
                    </div>
                </div>
              );
              
            })()}
             
          </div>
          
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
