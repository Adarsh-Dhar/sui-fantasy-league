"use client";

import { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, parseISO, subMinutes } from "date-fns";
import { usePriceWebSocket } from "@/hooks/use-price-websocket";
import { getBinanceWebSocketClient, MatchInfo } from "@/lib/websocket-client";
import { MatchResultAnnouncement } from "@/components/match-result-announcement";
import { useRouter } from "next/navigation";

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
  endTime?: number; // Timestamp when match should end
}

interface PerformanceGraphProps {
  match: Match;
}

interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
}

interface TokenPrice {
  price: number;
  timestamp: number;
  initialPrice?: number;
  percentChange?: number;
}

interface TokenPrices {
  [key: string]: TokenPrice;
}

interface ChartDataPoint {
  time: string;
  timestamp: string;
  teamOne: number;
  teamTwo: number;
}

export const PerformanceGraph = ({ match }: { match: Match }) => {
  const router = useRouter();
  
  // Chart and token data
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});
  const [isLoading, setIsLoading] = useState(true);
  const [tokenSymbols, setTokenSymbols] = useState<string[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  
  // Match state
  const [initialPrices, setInitialPrices] = useState<{[token: string]: number}>({});
  const [matchStartTime, setMatchStartTime] = useState<number | null>(null);
  const [matchEndTime, setMatchEndTime] = useState<number | null>(null);
  const [matchDuration] = useState<number>(60 * 1000); // 1 minute in milliseconds
  const [isMatchActive, setIsMatchActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(matchDuration / 1000); // in seconds
  
  // Result announcement
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [finalScores, setFinalScores] = useState<{teamOne: number, teamTwo: number}>({teamOne: 0, teamTwo: 0});
  
  // Get real-time price updates via WebSocket
  const { priceData, isConnected } = usePriceWebSocket(tokenSymbols);

  // Initialize token symbols for WebSocket subscription
  useEffect(() => {
    if (!match.teamOne) return;
    
    // Combine tokens from both teams (if team two exists)
    const allTokens = [...match.teamOne.tokens];
    if (match.teamTwo) {
      allTokens.push(...match.teamTwo.tokens);
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
    
    // Format tokens for WebSocket subscription (convert to ticker symbols, lowercase and append usdt if needed)
    const wsSymbols = uniqueTokens.map(token => {
      // Get ticker symbol or use original token if not in mapping
      const tickerSymbol = tokenToSymbol[token.toLowerCase()] || token.toLowerCase();
      return tickerSymbol.endsWith('usdt') ? tickerSymbol : `${tickerSymbol}usdt`;
    });
    
    setTokenSymbols(wsSymbols);
    setIsLoading(false);
  }, [match]);

  // Update token prices from WebSocket data
  useEffect(() => {
    if (Object.keys(priceData).length === 0) return;
    
    // Create a new token prices object from WebSocket data
    const newPrices: TokenPrices = {};
    
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
    
    // Map WebSocket symbols back to token symbols
    if (match.teamOne) {
      match.teamOne.tokens.forEach(token => {
        const tickerSymbol = tokenToSymbol[token.toLowerCase()] || token.toLowerCase();
        const symbolWithUsdt = tickerSymbol.endsWith('usdt') ? tickerSymbol : `${tickerSymbol}usdt`;
        
        if (priceData[symbolWithUsdt]) {
          // Get current price from WebSocket data
          const currentPrice = parseFloat(priceData[symbolWithUsdt].price);
          
          // Get previous token data if it exists
          const prevTokenData = tokenPrices[token];
          
          // Calculate initial price and percent change
          let initialPrice = prevTokenData?.initialPrice;
          let percentChange = 0;
          
          // If we don't have an initial price yet, set it
          if (!initialPrice && isMatchActive) {
            initialPrice = currentPrice;
          } else if (initialPrice) {
            // Calculate percent change from initial price
            percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;
          }
          
          newPrices[token] = {
            price: currentPrice,
            timestamp: priceData[symbolWithUsdt].timestamp,
            initialPrice: initialPrice,
            percentChange: percentChange
          };
        }
      });
    }
    
    if (match.teamTwo) {
      match.teamTwo.tokens.forEach(token => {
        const tickerSymbol = tokenToSymbol[token.toLowerCase()] || token.toLowerCase();
        const symbolWithUsdt = tickerSymbol.endsWith('usdt') ? tickerSymbol : `${tickerSymbol}usdt`;
        
        if (priceData[symbolWithUsdt]) {
          // Get current price from WebSocket data
          const currentPrice = parseFloat(priceData[symbolWithUsdt].price);
          
          // Get previous token data if it exists
          const prevTokenData = tokenPrices[token];
          
          // Calculate initial price and percent change
          let initialPrice = prevTokenData?.initialPrice;
          let percentChange = 0;
          
          // If we don't have an initial price yet, set it
          if (!initialPrice && isMatchActive) {
            initialPrice = currentPrice;
          } else if (initialPrice) {
            // Calculate percent change from initial price
            percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;
          }
          
          newPrices[token] = {
            price: currentPrice,
            timestamp: priceData[symbolWithUsdt].timestamp,
            initialPrice: initialPrice,
            percentChange: percentChange
          };
        }
      });
    }
    
    // Only update if we have new prices
    if (Object.keys(newPrices).length > 0) {
      setTokenPrices(newPrices);
      console.log('Updated token prices with percent changes:', newPrices);
    }
  }, [priceData, match, tokenPrices, isMatchActive]);

  // Generate initial chart data
  useEffect(() => {
    // Only generate chart data if we have two teams
    if (!match.teamTwo) {
      setChartData([]);
      return;
    }
    
    // Check if we already have chart data
    if (chartData.length > 0) {
      // We already have data, don't reset it
      return;
    }
    
    // Generate initial data points with empty values
    // This will create a baseline for the real-time data
    const now = new Date();
    const data = [];
    
    // Generate 20 empty data points for the chart
    // These will be filled with real data as it comes in
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      data.push({
        time: format(timestamp, "HH:mm:ss"),
        timestamp: timestamp.toISOString(),
        teamOne: 0, // Start at 0% change
        teamTwo: 0, // Start at 0% change
      });
    }
    
    setChartData(data);
    setLastUpdateTime(now);
  }, [match, chartData.length]);
  
  // Initialize match when component mounts or when match status changes
  useEffect(() => {
    // Check if match is in progress
    const isInProgress = match.status === 'IN_PROGRESS';
    const wsClient = getBinanceWebSocketClient();
    
    if (isInProgress && !isMatchActive) {
      // Match just started
      setIsMatchActive(true);
      
      // Don't set start time yet - we'll set it when we have all initial prices
      // This prevents the timer from starting before we have price data
      
      // Reset chart data
      setChartData([]);
      
      // Reset initial prices
      setInitialPrices({});
      
      // Enable WebSocket logging for this match
      const matchInfo: MatchInfo = {
        id: match.id,
        teamOne: {
          id: match.teamOne.id,
          name: match.teamOne.name,
          tokens: match.teamOne.tokens
        },
        teamTwo: match.teamTwo ? {
          id: match.teamTwo.id,
          name: match.teamTwo.name,
          tokens: match.teamTwo.tokens
        } : undefined,
        isActive: true
      };
      
      wsClient.setActiveMatch(matchInfo);
      console.log(`Match ${match.id} started - WebSocket logging enabled, duration: ${matchDuration/1000} seconds`);
      
    } else if (!isInProgress && isMatchActive) {
      // Match just ended
      setIsMatchActive(false);
      setMatchStartTime(null);
      setMatchEndTime(null);
      
      // Disable WebSocket logging
      if (match.teamTwo) {
        const matchInfo: MatchInfo = {
          id: match.id,
          teamOne: {
            id: match.teamOne.id,
            name: match.teamOne.name,
            tokens: match.teamOne.tokens
          },
          teamTwo: {
            id: match.teamTwo.id,
            name: match.teamTwo.name,
            tokens: match.teamTwo.tokens
          },
          isActive: false
        };
        
        wsClient.setActiveMatch(matchInfo);
        
        // Log the final data
        const priceLog = wsClient.getMatchPriceLog(match.id);
        console.log(`Match ${match.id} completed - WebSocket log data:`, {
          entries: priceLog.length,
          firstEntry: priceLog[0],
          lastEntry: priceLog[priceLog.length - 1]
        });
      }
    }
    
    // Cleanup when component unmounts
    return () => {
      if (isMatchActive) {
        wsClient.setActiveMatch(null);
      }
    };
  }, [match.status, isMatchActive, matchDuration, match.teamOne, match.teamTwo, match.id]);
  
  // Function to save match results to the database
  const saveMatchResults = async (teamOneScore: number, teamTwoScore: number) => {
    try {
      // Get WebSocket client for logging
      const wsClient = getBinanceWebSocketClient();
      
      // Determine the winner
      let result: 'PLAYER_ONE_WIN' | 'PLAYER_TWO_WIN' | 'DRAW' = 'DRAW';
      let winnerId = null;
      
      if (teamOneScore > teamTwoScore) {
        result = 'PLAYER_ONE_WIN';
        winnerId = match.playerOneId;
      } else if (teamTwoScore > teamOneScore) {
        result = 'PLAYER_TWO_WIN';
        winnerId = match.playerTwoId || null;
      }
      
      // Log the final match data
      const priceLog = wsClient.getMatchPriceLog(match.id);
      console.log(`Match ${match.id} completed with result: ${result}`, {
        teamOneScore: teamOneScore.toFixed(4) + '%',
        teamTwoScore: teamTwoScore.toFixed(4) + '%',
        winner: result,
        winnerId: winnerId,
        priceDataPoints: priceLog.length,
        finalPriceData: priceLog[priceLog.length - 1]
      });
      
      // Update the match in the database
      const response = await fetch(`/api/matches/${match.id}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamOneScore,
          teamTwoScore,
          result,
          winnerId,
          endTime: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save match results');
      }
      
      // Show the announcement
      setFinalScores({ teamOne: teamOneScore, teamTwo: teamTwoScore });
      setShowAnnouncement(true);
      
      // Update local match state to show completion
      match.status = 'COMPLETED';
      match.result = result;
      //@ts-ignore
      match.winnerId = winnerId;
      
      // Refresh the page data after a short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
      
    } catch (error) {
      console.error('Error saving match results:', error);
    }
  };
  
  // Update remaining time and handle match completion
  useEffect(() => {
    if (!isMatchActive || !matchStartTime || !matchEndTime) return;
    
    console.log(`Timer started at ${new Date(matchStartTime).toISOString()}, ending at ${new Date(matchEndTime).toISOString()}`);
    console.log(`Match duration: ${matchDuration/1000} seconds`);
    
    const timer = setInterval(() => {
      const now = Date.now();
      
      // If we've passed the end time, end the match
      if (now >= matchEndTime) {
        console.log('Match time expired - ending match');
        setIsMatchActive(false);
        clearInterval(timer);
        
        // Get the final scores
        if (chartData.length > 0) {
          const lastDataPoint = chartData[chartData.length - 1];
          console.log('Final scores:', {
            teamOne: lastDataPoint.teamOne.toFixed(4) + '%',
            teamTwo: lastDataPoint.teamTwo.toFixed(4) + '%'
          });
          
          // Save match results and determine winner
          saveMatchResults(lastDataPoint.teamOne, lastDataPoint.teamTwo);
        } else {
          console.error('No chart data available to determine winner');
        }
        return;
      }
      
      // Calculate remaining time in seconds
      const remainingMs = matchEndTime - now;
      const remainingSec = Math.ceil(remainingMs / 1000);
      
      setRemainingTime(remainingSec);
      console.log(`Time remaining: ${remainingSec} seconds (${remainingMs}ms)`);
      
    }, 500); // Check more frequently (every 500ms) for more accurate timing
    
    return () => {
      console.log('Clearing timer');
      clearInterval(timer);
    };
  }, [isMatchActive, matchStartTime, matchEndTime, matchDuration, chartData]);

  // Update chart data based on token prices
  useEffect(() => {
    // Only update if we have token prices and match.teamTwo exists
    if (Object.keys(tokenPrices).length === 0 || !match.teamTwo) {
      return;
    }
    
    // Set up a timer to update the chart regularly
    let updateTimer: NodeJS.Timeout;
    let mounted = true;
    
    const updateChartData = () => {
      if (!mounted) return;
      
      const now = new Date();
      const wsClient = getBinanceWebSocketClient();
      
      // Initialize prices if needed
      if (Object.keys(initialPrices).length === 0 && isMatchActive) {
        const newInitialPrices: {[token: string]: number} = {};
        let allTokensHavePrices = true;
        
        // Store initial prices for all tokens
        if (match.teamOne) {
          match.teamOne.tokens.forEach(token => {
            if (tokenPrices[token]) {
              newInitialPrices[token] = tokenPrices[token].price;
            } else {
              allTokensHavePrices = false;
            }
          });
        }
        
        if (match.teamTwo) {
          match.teamTwo.tokens.forEach(token => {
            if (tokenPrices[token]) {
              newInitialPrices[token] = tokenPrices[token].price;
            } else {
              allTokensHavePrices = false;
            }
          });
        }
        
        // Only set initial prices if we have prices for all tokens
        if (Object.keys(newInitialPrices).length > 0 && allTokensHavePrices) {
          setInitialPrices(newInitialPrices);
          
          // Set precise timestamps for match start and end
          const startTimestamp = Date.now();
          const endTimestamp = startTimestamp + matchDuration;
          
          setMatchStartTime(startTimestamp);
          setMatchEndTime(endTimestamp);
          setRemainingTime(Math.ceil(matchDuration / 1000));
          
          // Store end time in match object for reference
          match.endTime = endTimestamp;
          
          console.log('Match timing set:', {
            startTime: new Date(startTimestamp).toISOString(),
            endTime: new Date(endTimestamp).toISOString(),
            duration: `${matchDuration/1000} seconds`
          });
          console.log('Set initial prices for all tokens:', newInitialPrices);
        }
      }
      
      // Calculate average percentage change for each team
      const calculateTeamPercentageChange = (tokens: string[]) => {
        if (tokens.length === 0) return 0;
        
        let totalPercentChange = 0;
        let validTokenCount = 0;
        
        tokens.forEach(token => {
          const tokenData = tokenPrices[token];
          
          if (tokenData?.percentChange !== undefined) {
            totalPercentChange += tokenData.percentChange;
            validTokenCount++;
          }
        });
        
        if (validTokenCount === 0) return 0;
        
        // Return the average percentage change across all tokens
        return totalPercentChange / validTokenCount;
      };
      
      // Calculate percentage change for each team
      const teamOnePercentageChange = calculateTeamPercentageChange(match.teamOne.tokens);
      const teamTwoPercentageChange = calculateTeamPercentageChange(match.teamTwo?.tokens || []);
      
      // Log performance data to WebSocket client if match is active
      if (isMatchActive) {
        wsClient.logMatchPerformance(teamOnePercentageChange, teamTwoPercentageChange);
      }
      
      // Initialize chart data if empty
      if (chartData.length === 0) {
        const newData: ChartDataPoint[] = [];
        for (let i = 19; i >= 0; i--) {
          const timestamp = subMinutes(now, i);
          newData.push({
            time: format(timestamp, "HH:mm:ss"),
            timestamp: timestamp.toISOString(),
            teamOne: 0,
            teamTwo: 0,
          });
        }
        setChartData(newData);
      } else {
        // Update chart data
        setChartData(prevData => {
          // Create a new array with all previous data points shifted left
          const newData = [...prevData];
          
          // Remove the oldest data point
          newData.shift();
          
          // Add the new data point with current time and values
          newData.push({
            time: format(now, "HH:mm:ss"),
            timestamp: now.toISOString(),
            teamOne: teamOnePercentageChange,
            teamTwo: teamTwoPercentageChange,
          });
          
          return newData;
        });
      }
      
      // Update the last update time
      setLastUpdateTime(now);
      
      // Schedule next update
      updateTimer = setTimeout(updateChartData, 1000);
    };
    
    // Start the update cycle
    updateChartData();
    
    // Clean up
    return () => {
      mounted = false;
      clearTimeout(updateTimer);
    };
  }, [match, tokenPrices, initialPrices, isMatchActive]);

  const chartColors = useMemo(() => {
    return {
      teamOne: "hsl(var(--positive))",
      teamTwo: "hsl(var(--negative))",
      grid: "hsl(var(--muted))",
      text: "hsl(var(--muted-foreground))",
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length && match.teamTwo) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.teamOne }}
              ></span>
              <span className="mr-2">{match.teamOne.name}:</span>
              <span className="font-medium" style={{ color: chartColors.teamOne }}>
                {payload[0].value >= 0 ? "+" : ""}
                {payload[0].value.toFixed(2)}%
              </span>
            </p>
            <div className="ml-5 mt-1 mb-2 space-y-1">
              {match.teamOne.tokens.map(token => {
                const tokenData = tokenPrices[token];
                const percentChange = tokenData?.percentChange || 0;
                const color = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
                
                return (
                  <div key={token} className="text-xs flex justify-between">
                    <span className="text-muted-foreground mr-2">{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                    <span className={color}>
                      {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.teamTwo }}
              ></span>
              <span className="mr-2">{match.teamTwo.name}:</span>
              <span className="font-medium" style={{ color: chartColors.teamTwo }}>
                {payload[1].value >= 0 ? "+" : ""}
                {payload[1].value.toFixed(2)}%
              </span>
            </p>
            <div className="ml-5 mt-1 space-y-1">
              {match.teamTwo.tokens.map(token => {
                const tokenData = tokenPrices[token];
                const percentChange = tokenData?.percentChange || 0;
                const color = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
                
                return (
                  <div key={token} className="text-xs flex justify-between">
                    <span className="text-muted-foreground mr-2">{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                    <span className={color}>
                      {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // If there's no second team, show a placeholder
  if (!match.teamTwo) {
    return (
      <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
        <h3 className="text-lg font-medium mb-4">Match Performance</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Waiting for opponent to join...</p>
        </div>
      </div>
    );
  }
  
  // Show loading state while fetching token prices
  if (isLoading && chartData.length === 0) {
    return (
      <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
        <h3 className="text-lg font-medium mb-4">Match Performance</h3>
        <div className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Loading token performance data...</p>
        </div>
      </div>
    );
  }
  
  // Format remaining time as MM:SS
  const formatTime = (seconds: number): string => {
    // Ensure seconds is not negative
    const positiveSeconds = Math.max(0, seconds);
    const mins = Math.floor(positiveSeconds / 60);
    const secs = positiveSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show match status and remaining time
  const matchStatus = isMatchActive ? (
    <div className="text-xs text-green-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
      <span className="font-medium">Match in progress - Time remaining: {formatTime(remainingTime)}</span>
    </div>
  ) : match.status === 'COMPLETED' ? (
    <div className="text-xs text-blue-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
      <span className="font-medium">Match completed</span>
      {match.result && (
        <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
          {match.result === 'PLAYER_ONE_WIN' ? `${match.teamOne.name} won` : 
           match.result === 'PLAYER_TWO_WIN' ? `${match.teamTwo?.name} won` : 'Draw'}
        </span>
      )}
    </div>
  ) : (
    <div className="text-xs text-amber-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
      <span className="font-medium">Match pending - Will run for {formatTime(matchDuration)}</span>
    </div>
  );
  
  // Show WebSocket connection status
  const connectionStatus = isConnected ? (
    <div className="text-xs text-green-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
      Live price updates active
    </div>
  ) : (
    <div className="text-xs text-amber-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
      Using polling for updates
    </div>
  );
  
  // Close the announcement modal
  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false);
  };
  
  return (
    <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
      {/* Match result announcement */}
      {showAnnouncement && (
        <MatchResultAnnouncement
          match={match}
          teamOneScore={finalScores.teamOne}
          teamTwoScore={finalScores.teamTwo}
          onClose={handleCloseAnnouncement}
        />
      )}
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">Match Performance</h3>
        {connectionStatus}
      </div>
      
      {/* Match status and timer */}
      <div className="mb-4">
        {matchStatus}
      </div>
      
      {/* Team scores */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 rounded-lg bg-card/50 border border-border">
          <div className="text-sm font-medium mb-1">{match.teamOne.name}</div>
          <div className="text-xl font-bold" style={{ color: chartColors.teamOne }}>
            {chartData.length > 0 ? 
              `${chartData[chartData.length - 1].teamOne >= 0 ? '+' : ''}${chartData[chartData.length - 1].teamOne.toFixed(4)}%` : 
              '0.0000%'}
          </div>
          
          {/* Individual token performance for Team One */}
          <div className="mt-2 space-y-1 text-xs">
            {match.teamOne.tokens.map(token => {
              const tokenData = tokenPrices[token];
              const percentChange = tokenData?.percentChange || 0;
              const color = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
              
              return (
                <div key={token} className="flex justify-between">
                  <span className="text-muted-foreground">{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                  <span className={color}>
                    {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(4)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-3 rounded-lg bg-card/50 border border-border">
          <div className="text-sm font-medium mb-1">{match.teamTwo.name}</div>
          <div className="text-xl font-bold" style={{ color: chartColors.teamTwo }}>
            {chartData.length > 0 ? 
              `${chartData[chartData.length - 1].teamTwo >= 0 ? '+' : ''}${chartData[chartData.length - 1].teamTwo.toFixed(4)}%` : 
              '0.0000%'}
          </div>
          
          {/* Individual token performance for Team Two */}
          <div className="mt-2 space-y-1 text-xs">
            {match.teamTwo.tokens.map(token => {
              const tokenData = tokenPrices[token];
              const percentChange = tokenData?.percentChange || 0;
              const color = percentChange >= 0 ? 'text-green-500' : 'text-red-500';
              
              return (
                <div key={token} className="flex justify-between">
                  <span className="text-muted-foreground">{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                  <span className={color}>
                    {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(4)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Current token prices */}
      <div className="mb-4 p-3 rounded-lg bg-black/10 border border-border">
        <div className="text-sm font-medium mb-2">Current Token Prices:</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground mb-1">{match.teamOne.name}</div>
            {match.teamOne.tokens.map(token => {
              const tokenData = tokenPrices[token];
              const currentPrice = tokenData?.price || 0;
              const initialPrice = tokenData?.initialPrice || 0;
              
              return (
                <div key={token} className="flex justify-between text-xs">
                  <span>{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                  <span className="font-medium">
                    ${currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground mb-1">{match.teamTwo.name}</div>
            {match.teamTwo.tokens.map(token => {
              const tokenData = tokenPrices[token];
              const currentPrice = tokenData?.price || 0;
              
              return (
                <div key={token} className="flex justify-between text-xs">
                  <span>{token.charAt(0).toUpperCase() + token.slice(1)}:</span>
                  <span className="font-medium">
                    ${currentPrice.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis
              dataKey="time"
              stroke={chartColors.text}
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={chartColors.text}
              fontSize={12}
              tickFormatter={(value) => `${value.toFixed(4)}%`}
              tickLine={false}
              axisLine={false}
              // Auto-scale to make any change fill the entire chart height
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
              // Increase the number of ticks to show more detail
              allowDecimals={true}
              // Ensure we show enough decimal places
              tickCount={5}
              // Ensure we can see very small changes
              interval={0}
              // Add padding to make the chart more readable
              padding={{ top: 10, bottom: 10 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => {
                return value === "teamOne" ? match.teamOne.name : match.teamTwo?.name;
              }}
            />
            <Line
              type="monotone"
              dataKey="teamOne"
              stroke={chartColors.teamOne}
              // Use small dots to make changes more visible
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
              // Make the line thicker
              strokeWidth={2}
              // Turn off animation to see changes immediately
              isAnimationActive={false}
              // Connect null points to avoid gaps
              connectNulls={true}
            />
            <Line
              type="monotone"
              dataKey="teamTwo"
              stroke={chartColors.teamTwo}
              // Use small dots to make changes more visible
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
              // Make the line thicker
              strokeWidth={2}
              // Turn off animation to see changes immediately
              isAnimationActive={false}
              // Connect null points to avoid gaps
              connectNulls={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
