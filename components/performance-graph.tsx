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
  const [matchStartTime, setMatchStartTime] = useState<Date | null>(null);
  const [matchDuration, setMatchDuration] = useState<number>(60); // 1 minute in seconds
  const [isMatchActive, setIsMatchActive] = useState<boolean>(false);
  const [remainingTime, setRemainingTime] = useState<number>(matchDuration);
  
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
    
    // Format tokens for WebSocket subscription (lowercase and append usdt if needed)
    const wsSymbols = uniqueTokens.map(token => {
      const lowerToken = token.toLowerCase();
      return lowerToken.endsWith('usdt') ? lowerToken : `${lowerToken}usdt`;
    });
    
    setTokenSymbols(wsSymbols);
    setIsLoading(false);
  }, [match]);

  // Update token prices from WebSocket data
  useEffect(() => {
    if (Object.keys(priceData).length === 0) return;
    
    // Create a new token prices object from WebSocket data
    const newPrices: TokenPrices = {};
    
    // Map WebSocket symbols back to token symbols
    if (match.teamOne) {
      match.teamOne.tokens.forEach(token => {
        const lowerToken = token.toLowerCase();
        const symbolWithUsdt = lowerToken.endsWith('usdt') ? lowerToken : `${lowerToken}usdt`;
        
        if (priceData[symbolWithUsdt]) {
          newPrices[token] = {
            price: parseFloat(priceData[symbolWithUsdt].price),
            timestamp: priceData[symbolWithUsdt].timestamp
          };
        }
      });
    }
    
    if (match.teamTwo) {
      match.teamTwo.tokens.forEach(token => {
        const lowerToken = token.toLowerCase();
        const symbolWithUsdt = lowerToken.endsWith('usdt') ? lowerToken : `${lowerToken}usdt`;
        
        if (priceData[symbolWithUsdt] && !newPrices[token]) {
          newPrices[token] = {
            price: parseFloat(priceData[symbolWithUsdt].price),
            timestamp: priceData[symbolWithUsdt].timestamp
          };
        }
      });
    }
    
    // Only update if we have new prices
    if (Object.keys(newPrices).length > 0) {
      setTokenPrices(newPrices);
    }
  }, [priceData, match]);

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
    
    // Generate initial data points with simulated historical data
    const now = new Date();
    const data = [];
    
    // Calculate the initial investment (1$ per token)
    const teamOneInitialInvestment = match.teamOne.tokens.length;
    const teamTwoInitialInvestment = match.teamTwo.tokens.length;
    
    // Generate 20 data points for the chart, one for each minute
    // with simulated historical values
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      // Generate random but consistent values for historical data
      // Use the timestamp as seed for consistency
      const seed = timestamp.getTime();
      const randomA = Math.sin(seed * 0.001) * 5; // ±5% range
      const randomB = Math.cos(seed * 0.001) * 5; // ±5% range
      
      data.push({
        time: format(timestamp, "HH:mm:ss"),
        timestamp: timestamp.toISOString(),
        teamOne: randomA,
        teamTwo: randomB,
      });
    }
    
    setChartData(data);
    setLastUpdateTime(now);
  }, [match, chartData.length]);
  
  // Initialize match when component mounts or when match status changes
  useEffect(() => {
    // Check if match is in progress
    const isInProgress = match.status === 'IN_PROGRESS';
    
    if (isInProgress && !isMatchActive) {
      // Match just started
      setIsMatchActive(true);
      setMatchStartTime(new Date());
      
      // Reset chart data
      setChartData([]);
      
      // Store initial prices
      const initialTokenPrices: {[token: string]: number} = {};
      
      // Store initial prices for all tokens
      if (match.teamOne) {
        match.teamOne.tokens.forEach(token => {
          if (tokenPrices[token]) {
            initialTokenPrices[token] = tokenPrices[token].price;
          }
        });
      }
      
      if (match.teamTwo) {
        match.teamTwo.tokens.forEach(token => {
          if (tokenPrices[token] && !initialTokenPrices[token]) {
            initialTokenPrices[token] = tokenPrices[token].price;
          }
        });
      }
      
      setInitialPrices(initialTokenPrices);
    } else if (!isInProgress && isMatchActive) {
      // Match just ended
      setIsMatchActive(false);
    }
  }, [match.status, isMatchActive, tokenPrices, match.teamOne, match.teamTwo]);
  
  // Function to save match results to the database
  const saveMatchResults = async (teamOneScore: number, teamTwoScore: number) => {
    try {
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
      
      // Refresh the page data after a short delay
      setTimeout(() => {
        router.refresh();
      }, 1000);
      
    } catch (error) {
      console.error('Error saving match results:', error);
    }
  };
  
  // Update remaining time
  useEffect(() => {
    if (!isMatchActive || !matchStartTime) return;
    
    const timer = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor((now.getTime() - matchStartTime.getTime()) / 1000);
      const remaining = Math.max(0, matchDuration - elapsedSeconds);
      
      setRemainingTime(remaining);
      
      // Auto-end match after duration
      if (remaining <= 0) {
        setIsMatchActive(false);
        clearInterval(timer);
        
        // Get the final scores
        if (chartData.length > 0) {
          const lastDataPoint = chartData[chartData.length - 1];
          saveMatchResults(lastDataPoint.teamOne, lastDataPoint.teamTwo);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isMatchActive, matchStartTime, matchDuration, chartData, match.id, match.playerOneId, match.playerTwoId, router]);

  // Update chart data based on token prices
  useEffect(() => {
    // Only update if we have token prices, initial prices, and match is active
    if (Object.keys(tokenPrices).length === 0 || Object.keys(initialPrices).length === 0 || !match.teamTwo || !isMatchActive) {
      return;
    }
    
    const now = new Date();
    
    // Calculate percentage change from initial price for each team
    const calculateTeamPercentageChange = (tokens: string[]) => {
      if (tokens.length === 0) return 0;
      
      let totalInitialValue = 0;
      let totalCurrentValue = 0;
      
      tokens.forEach(token => {
        const initialPrice = initialPrices[token];
        const currentPrice = tokenPrices[token]?.price;
        
        if (initialPrice && currentPrice) {
          totalInitialValue += initialPrice;
          totalCurrentValue += currentPrice;
        }
      });
      
      if (totalInitialValue === 0) return 0;
      
      // Calculate percentage change: (current - initial) / initial * 100
      return ((totalCurrentValue - totalInitialValue) / totalInitialValue) * 100;
    };
    
    // Calculate percentage change for each team
    const teamOnePercentageChange = calculateTeamPercentageChange(match.teamOne.tokens);
    const teamTwoPercentageChange = calculateTeamPercentageChange(match.teamTwo.tokens);
    
    // These are the actual percentage changes that will be used as scores
    const teamOneValue = teamOnePercentageChange;
    const teamTwoValue = teamTwoPercentageChange;
    
    // Check if it's time to add a new data point (every 10 seconds)
    const timeDiff = now.getTime() - lastUpdateTime.getTime();
    
    if (timeDiff >= 10000) { // 10 seconds in milliseconds
      // Add a new data point and remove the oldest one
      setChartData(prevData => {
        const newData = [...prevData];
        
        // Remove the oldest data point
        newData.shift();
        
        // Add the new data point
        newData.push({
          time: format(now, "HH:mm:ss"),
          timestamp: now.toISOString(),
          teamOne: teamOneValue,
          teamTwo: teamTwoValue,
        });
        
        return newData;
      });
      
      // Update the last update time
      setLastUpdateTime(now);
    } else {
      // Just update the latest data point with new values
      setChartData(prevData => {
        const newData = [...prevData];
        
        // Update the latest data point
        if (newData.length > 0) {
          const lastIndex = newData.length - 1;
          newData[lastIndex] = {
            ...newData[lastIndex],
            teamOne: teamOneValue,
            teamTwo: teamTwoValue,
          };
        }
        
        return newData;
      });
    }
  }, [match, tokenPrices, initialPrices, chartData, lastUpdateTime, isMatchActive]);

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
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show match status and remaining time
  const matchStatus = isMatchActive ? (
    <div className="text-xs text-green-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
      Match in progress - Time remaining: {formatTime(remainingTime)}
    </div>
  ) : match.status === 'COMPLETED' ? (
    <div className="text-xs text-blue-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span>
      Match completed
    </div>
  ) : (
    <div className="text-xs text-amber-500 flex items-center mb-2">
      <span className="w-2 h-2 bg-amber-500 rounded-full mr-1"></span>
      Match pending
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
        </div>
        <div className="p-3 rounded-lg bg-card/50 border border-border">
          <div className="text-sm font-medium mb-1">{match.teamTwo.name}</div>
          <div className="text-xl font-bold" style={{ color: chartColors.teamTwo }}>
            {chartData.length > 0 ? 
              `${chartData[chartData.length - 1].teamTwo >= 0 ? '+' : ''}${chartData[chartData.length - 1].teamTwo.toFixed(4)}%` : 
              '0.0000%'}
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
              tickFormatter={(value) => `${value.toFixed(6)}%`}
              tickLine={false}
              axisLine={false}
              // Auto-scale to make any change fill the entire chart height
              domain={['auto', 'auto']}
              // Increase the number of ticks to show more detail
              allowDecimals={true}
              // Ensure we show enough decimal places
              tickCount={20}
              // Use a dynamic scale that automatically adjusts to the data range
              scale="auto"
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
