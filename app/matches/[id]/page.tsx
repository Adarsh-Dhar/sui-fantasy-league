"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import Link from "next/link";
import { Clock, TrendingUp, ArrowLeft, Users, Zap, Trophy, Coins } from "lucide-react";
import { PerformanceGraph } from "@/components/performance-graph";
import { WinnerCelebration } from "@/components/winner-celebration";
import { usePriceWebSocket } from "@/hooks/use-price-websocket";
import { Transaction } from "@mysten/sui/transactions";
import { VAULT_PACKAGE_ID } from "@/lib/constants";


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
  endTime?: number; // Timestamp when match should end
  duration?: number; // Match duration in seconds
  price?: number; // Match price in SUI tokens
  vaultId?: string; // Vault ID for match deposits
}

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const account = useCurrentAccount();
  const [match, setMatch] = useState<Match | null>(null);
  const [matchEnded, setMatchEnded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [teams, setTeams] = useState<any[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [depositLoading, setDepositLoading] = useState(false);
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  const [tokenSymbols, setTokenSymbols] = useState<string[]>([]);
  
  // Get real-time price updates via WebSocket
  const { averageA, averageB, percentageData } = usePriceWebSocket(tokenSymbols, {
    setATokens: match?.teamOne?.tokens || [],
    setBTokens: match?.teamTwo?.tokens || []
  });
  
  // Create a map of token symbols to their current price and percentage change
  const tokenDataMap = percentageData.reduce((acc, token) => {
    // Convert symbol to match our token format (remove 'usdt' suffix)
    const symbol = token.symbol.replace('usdt', '');
    acc[symbol] = {
      currentPrice: token.currentPrice,
      percentageChange: token.percentageChange
    };
    return acc;
  }, {} as Record<string, { currentPrice: string, percentageChange: number }>);

  // Fetch match data
  useEffect(() => {
    let isMounted = true;
    
    const fetchMatch = async () => {
      try {
        const matchId = params.id as string;
        const response = await fetch(`/api/game/match?id=${matchId}`);
        
        if (response.ok && isMounted) {
          const data = await response.json();
          const newMatch = data.match;
          
          // Only update state if there's a change in match status or players
          if (!match || 
              match.status !== newMatch.status || 
              match.playerTwoId !== newMatch.playerTwoId) {
            console.log("Match updated:", newMatch);
            setMatch(newMatch);
            setMatchEnded(newMatch.status === "COMPLETED");
            
            // Set up token symbols for WebSocket subscription
            if (newMatch.teamOne) {
              // Combine tokens from both teams (if team two exists)
              const allTokens = [...newMatch.teamOne.tokens];
              if (newMatch.teamTwo) {
                allTokens.push(...newMatch.teamTwo.tokens);
              }
              
              // Remove duplicates
              const uniqueTokens = Array.from(new Set(allTokens));
              
              // Map full token names to ticker symbols
              const tokenToSymbol: Record<string, string> = {
                'bitcoin': 'btc',
                'ethereum': 'eth',
                'optimism': 'op',
                'solana': 'sol',
                'avalanche': 'avax',
                'cardano': 'ada',
                'polkadot': 'dot',
                'chainlink': 'link',
                'polygon': 'matic',
                'binance': 'bnb',
                'ripple': 'xrp',
                'dogecoin': 'doge',
                'shiba': 'shib',
                'litecoin': 'ltc',
                'uniswap': 'uni',
                'tron': 'trx',
                'stellar': 'xlm',
                'cosmos': 'atom',
                'near': 'near',
                'sui': 'sui'
              };
              
              // Format tokens for WebSocket subscription
              const wsSymbols = uniqueTokens.map(token => {
                const symbol = tokenToSymbol[token.toLowerCase()] || token.toLowerCase();
                return symbol.endsWith('usdt') ? symbol : `${symbol}usdt`;
              });
              
              setTokenSymbols(wsSymbols);
            }
          } 
        }
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
    
    // Set up polling to refresh match data
    // Use more frequent polling (3 seconds) for pending matches waiting for an opponent
    // and less frequent polling (15 seconds) for matches in progress or completed
    const pollingInterval = match && match.status === "PENDING" && !match.playerTwo ? 3000 : 15000;
    const intervalId = setInterval(fetchMatch, pollingInterval);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [params.id]);

  // Fetch user teams for joining a match
  useEffect(() => {
    const fetchTeams = async () => {
      if (!account?.address) return;
      
      try {
        const response = await fetch(`/api/game/teams?address=${account.address}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data.teams);
          
          // Auto-select the first team if available
          if (data.teams.length > 0 && !selectedTeamId) {
            setSelectedTeamId(data.teams[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    // Only fetch teams if this is a pending friend match or the user is not already in the match
    if (match && match.type === "FRIEND" && match.status === "PENDING" && 
        match.playerOne.address !== account?.address && !match.playerTwo) {
      fetchTeams();
    }
  }, [account?.address, match, selectedTeamId]);



  // Handle joining a friend match
  const handleJoinMatch = async () => {
    if (!selectedTeamId || !account?.address || !match) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch(`/api/game/match/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId: match.id,
          teamId: selectedTeamId,
          address: account.address,
        }),
      });

      if (response.ok) {
        // Immediately refresh the match data to show the updated state
        const updatedMatchResponse = await fetch(`/api/game/match?id=${match.id}`);
        if (updatedMatchResponse.ok) {
          const data = await updatedMatchResponse.json();
          const updatedMatch = data.match;
          setMatch(updatedMatch);
          
          // If the match has a vault ID, deposit 1 SUI to it
          if (updatedMatch.vaultId) {
            await depositToVault(updatedMatch.vaultId, updatedMatch.price || 1);
          }
          
          // Force a refresh of the matches list in the background
          // This helps ensure the matches list is updated when navigating back
          fetch(`/api/game/match?address=${account.address}`, { cache: 'no-store' })
            .then(() => console.log('Matches list refreshed in background'))
            .catch(err => console.error('Error refreshing matches list:', err));
        }
      } else {
        const error = await response.json();
        console.error("Error joining match:", error);
      }
    } catch (error) {
      console.error("Error joining match:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Function to deposit SUI to the match vault
  const depositToVault = async (vaultId: string, amount: number) => {
    if (!vaultId || !account) {
      console.error('No vault ID available or user not connected');
      return;
    }
    
    setDepositLoading(true);
    
    try {
      console.log('Starting deposit to vault:', vaultId, 'amount:', amount);
      
      // Create a transaction to deposit SUI based on match price
      const tx = new Transaction();
      
      // Convert SUI to MIST (1 SUI = 1,000,000,000 MIST)
      // Ensure we're using BigInt for large numbers to avoid precision issues
      const amountToDeposit = BigInt(Math.floor(amount * 1000000000));
      
      // Split coins from the gas object
      // Use BigInt to ensure proper type handling
      const coinToDeposit = tx.splitCoins(tx.gas, [tx.pure.u64(amountToDeposit)]);
      
      // Call the deposit function from the vault contract with proper type arguments
      tx.moveCall({
        target: `${VAULT_PACKAGE_ID}::simple_vault::deposit`,
        typeArguments: ['0x2::sui::SUI'],
        arguments: [tx.object(vaultId), coinToDeposit]
      });
      
      // Execute the transaction
      await new Promise<void>((resolve, reject) => {
        signAndExecute(
          {
            transaction: tx,
          },
          {
            onSuccess: (result) => {
              console.log('Deposit transaction successful:', result);
              resolve();
            },
            onError: (error) => {
              console.error('Error depositing SUI:', error);
              reject(error);
            },
          },
        );
      }).catch(error => {
        console.error("Promise rejection in deposit:", error);
      });
      
    } catch (error) {
      console.error("Error during deposit:", error);
    } finally {
      setDepositLoading(false);
    }
  };

  if (!match) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Match not found</h2>
        <p className="mt-2 text-muted-foreground">
          The match youre looking for doesnt exist or has been removed.
        </p>
        <Link href="/matches" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Matches
          </Button>
        </Link>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Match not found</h2>
        <p className="mt-2 text-muted-foreground">
          The match youre looking for doesnt exist or has been removed.
        </p>
        <Link href="/matches" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Matches
          </Button>
        </Link>
      </div>
    );
  }

  // Show the winner celebration if the match is completed
  if (matchEnded && match.result) {
    return <WinnerCelebration match={match as any} />;
  }



  // For pending friend matches where the current user is not the creator and no second player yet
  if (match.type === "FRIEND" && match.status === "PENDING" && 
      match.playerOne.address !== account?.address && !match.playerTwo) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6 mb-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Join Friend Match</h1>
            <p className="mb-6 text-muted-foreground">
              Youve been invited to join a match created by {match.playerOne.address.slice(0, 6)}...{match.playerOne.address.slice(-4)}
            </p>
            
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3">Opponents Team</h2>
              <div className="p-4 rounded-lg bg-muted/30">
                <h3 className="font-bold">{match.teamOne.name}</h3>
                <p className="text-sm text-muted-foreground">{match.teamOne.tokens.length} tokens</p>
              </div>
            </div>
            
            {teams.length > 0 ? (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-3">Select Your Team</h2>
                <div className="grid gap-3">
                  {teams.map((team) => (
                    <div 
                      key={team.id}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${selectedTeamId === team.id ? 'bg-primary/20 border border-primary' : 'bg-muted/30 hover:bg-muted/50'}`}
                      onClick={() => setSelectedTeamId(team.id)}
                    >
                      <h3 className="font-bold">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.tokens.length} tokens</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-6 text-center">
                <p className="text-muted-foreground mb-4">
                  You dont have any teams yet. Create a team to join this match.
                </p>
                <Button
                  onClick={() => router.push("/teams/create")}
                  className="gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Create Team
                </Button>
              </div>
            )}
            
            <Button
              onClick={handleJoinMatch}
              disabled={!selectedTeamId || isLoading}
              size="lg"
              className="gap-2 w-full md:w-auto"
            >
              <Zap className="h-5 w-5" />
              {isLoading ? "Joining Match..." : "Join Match"}   
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // For pending matches waiting for an opponent
  if (match.status === "PENDING" && !match.playerTwo) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6 mb-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Waiting for Opponent</h1>
            <p className="mb-6 text-muted-foreground">
              {match.type === "RANDOM" ? 
                "Waiting for a random player to join the match..." : 
                "Waiting for your friend to join the match. Share the link below:"}
            </p>
            
            {match.type === "FRIEND" && (
              <div className="mb-6">
                <div className="bg-muted/30 p-4 rounded-lg flex items-center justify-between">
                  <code className="text-sm">{window.location.href}</code>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(window.location.href)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}
            
            <div className="animate-pulse flex justify-center items-center gap-2 text-primary">
              <Users className="h-5 w-5" />
              <span>Waiting for opponent to join...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const timeRemaining = match.status === "IN_PROGRESS" ? "In Progress" : "Finished";
  const timeElapsed = match.status === "IN_PROGRESS" ? "Live" : "Completed";
  
  // Format match duration for display
  const formatDuration = (seconds: number) => {
    if (seconds === 60) return "1 Minute";
    if (seconds === 300) return "5 Minutes";
    if (seconds === 3600) return "1 Hour";
    if (seconds === 43200) return "12 Hours";
    
    // Fallback for custom durations
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} Minutes`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours} Hours`;
  };
  
  const matchDuration = formatDuration(match.duration || 60);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/matches">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Matches
            </Button>
          </Link>
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full mb-2 ${
                  match.status === "IN_PROGRESS"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-blue-500/20 text-blue-500"
                }`}
              >
                {match.status === "IN_PROGRESS" ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Match
                  </>
                ) : (
                  <>Match Complete</>
                )}
              </div>
              <h1 className="text-2xl font-bold">
                {match.teamOne.name} vs {match.teamTwo?.name || "Waiting for opponent"}
              </h1>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                <span>{timeElapsed}</span>
                <span className="text-muted-foreground">•</span>
                <span>{timeRemaining}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-3 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold">{match.teamOne.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                by {match.playerOne.address.slice(0, 6)}...{match.playerOne.address.slice(-4)}
              </p>
              <div className="text-xl font-bold text-[#3b82f6]">
                {averageA !== null ? (averageA > 0 ? `+${averageA.toFixed(4)}%` : `${averageA.toFixed(4)}%`) : '+0.0000%'}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                $0
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">VS</div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 justify-center">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Real-time performance</span>
                </div>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{matchDuration}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4" />
                    <span>{(match as any).price || 1} SUI</span>
                  </div>
                </div>
              </div>
            </div>

            {match.teamTwo ? (
              <div className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-3 flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">{match.teamTwo.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  by {match.playerTwo?.address.slice(0, 6)}...{match.playerTwo?.address.slice(-4)}
                </p>
                <div className="text-xl font-bold text-[#eab308]">
                  {averageB !== null ? (averageB > 0 ? `+${averageB.toFixed(4)}%` : `${averageB.toFixed(4)}%`) : '+0.0000%'}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  $0
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center text-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-3 flex items-center justify-center opacity-50">
                  <Users className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-muted-foreground">Waiting for opponent</h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {match.type === "FRIEND" ? "Share the link with a friend" : "Finding a random opponent"}
                </p>
              </div>
            )}
          </div>

          {/* Convert the match object to be compatible with PerformanceGraph's Match interface */}
          <PerformanceGraph 
            match={{
              ...match,
              duration: match.duration || null // Convert undefined to null
            }} 
          />
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Team Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">{match.teamOne.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {match.teamOne.tokens.map((tokenId, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-muted/50 rounded-lg border-l-4 border-[#3b82f6]"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-background flex items-center justify-center">
                      <span className="text-xs font-bold">{tokenId.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <div className="font-medium">{tokenId.slice(0, 4).toUpperCase()}</div>
                      <div className="text-xs">
                        {(() => {
                          const tokenSymbol = tokenId.toLowerCase();
                          const tokenData = tokenDataMap[tokenSymbol];
                          if (tokenData) {
                            const { currentPrice, percentageChange } = tokenData;
                            const formattedPrice = parseFloat(currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                            const formattedChange = percentageChange > 0 
                              ? `+${percentageChange.toFixed(4)}%` 
                              : `${percentageChange.toFixed(4)}%`;
                            const changeClass = percentageChange >= 0 ? 'text-positive' : 'text-negative';
                            return (
                              <>
                                <span className="font-medium">${formattedPrice}</span>
                                <span className={changeClass}> {formattedChange}</span>
                              </>
                            );
                          }
                          return '+0.0000%';
                        })()} 
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {match.teamTwo && (
              <div>
                <h3 className="text-lg font-medium mb-3">{match.teamTwo.name}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {match.teamTwo.tokens.map((tokenId, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-muted/50 rounded-lg border-l-4 border-[#eab308]"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-background flex items-center justify-center">
                        <span className="text-xs font-bold">{tokenId.slice(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="font-medium">{tokenId.slice(0, 4).toUpperCase()}</div>
                        <div className="text-xs">
                          {(() => {
                            const tokenSymbol = tokenId.toLowerCase();
                            const tokenData = tokenDataMap[tokenSymbol];
                            if (tokenData) {
                              const { currentPrice, percentageChange } = tokenData;
                              const formattedPrice = parseFloat(currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                              const formattedChange = percentageChange > 0 
                                ? `+${percentageChange.toFixed(2)}%` 
                                : `${percentageChange.toFixed(2)}%`;
                              const changeClass = percentageChange >= 0 ? 'text-positive' : 'text-negative';
                              return (
                                <>
                                  <span className="font-medium">${formattedPrice}</span>
                                  <span className={changeClass}> {formattedChange}</span>
                                </>
                              );
                            }
                            return '+0.0000%';
                          })()} 
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}