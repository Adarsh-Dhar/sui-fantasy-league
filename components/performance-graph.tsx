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
  usd: number;
  usd_24h_change: number;
}

interface TokenPrices {
  [key: string]: TokenPrice;
}

export const PerformanceGraph = ({ match }: PerformanceGraphProps) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [tokenPrices, setTokenPrices] = useState<TokenPrices>({});
  const [tokenInfoMap, setTokenInfoMap] = useState<Map<string, string>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  // Fetch token info from the tokens API
  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const response = await fetch('/api/tokens');
        if (response.ok) {
          const tokens: TokenInfo[] = await response.json();
          
          // Create a map of symbol -> id for quick lookup
          const tokenMap = new Map<string, string>();
          tokens.forEach(token => {
            tokenMap.set(token.symbol.toLowerCase(), token.id);
          });
          
          setTokenInfoMap(tokenMap);
        }
      } catch (error) {
        console.error('Error fetching token info:', error);
      }
    };

    fetchTokenInfo();
  }, []);

  // Fetch token prices for both teams
  useEffect(() => {
    const fetchTokenPrices = async () => {
      if (!match.teamOne || tokenInfoMap.size === 0) {
        return;
      }

      setIsLoading(true);
      
      try {
        // Combine tokens from both teams (if team two exists)
        const allTokens = [...match.teamOne.tokens];
        if (match.teamTwo) {
          allTokens.push(...match.teamTwo.tokens);
        }
        
        // Remove duplicates
        const uniqueTokens = Array.from(new Set(allTokens));
        
        // Get the token IDs from the token info map
        const tokenIds: string[] = [];
        const tokenToIdMap = new Map<string, string>();
        
        for (const token of uniqueTokens) {
          const lowerToken = token.toLowerCase();
          const tokenId = tokenInfoMap.get(lowerToken);
          
          if (tokenId) {
            tokenIds.push(tokenId);
            tokenToIdMap.set(token, tokenId);
          } else {
            console.warn(`No token ID found for ${token}`);
            // Use the token symbol as fallback
            tokenIds.push(lowerToken);
            tokenToIdMap.set(token, lowerToken);
          }
        }
        
        // Fetch prices for all tokens at once
        const prices: TokenPrices = {};
        
        if (tokenIds.length > 0) {
          const response = await fetch(`/api/prices?id=${tokenIds.join(',')}`);
          
          if (response.ok) {
            const data = await response.json();
            
            // Map the data back to our token keys
            uniqueTokens.forEach(token => {
              const tokenId = tokenToIdMap.get(token);
              if (tokenId && data[tokenId]) {
                prices[token] = data[tokenId];
              }
            });
          }
        }
        
        setTokenPrices(prices);
      } catch (error) {
        console.error('Error fetching token prices:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (tokenInfoMap.size > 0) {
      fetchTokenPrices();
      
      // Set up polling to refresh prices every minute
      const intervalId = setInterval(() => fetchTokenPrices(), 60000);
      
      return () => clearInterval(intervalId);
    }
  }, [match, tokenInfoMap]);

  // Generate chart data based on token prices
  useEffect(() => {
    // Only generate chart data if we have two teams and token prices
    if (!match.teamTwo || Object.keys(tokenPrices).length === 0) {
      setChartData([]);
      return;
    }
    
    // Generate simulated historical data for the match
    const now = new Date();
    const data = [];
    
    // Calculate the initial investment (1$ per token)
    const teamOneInitialInvestment = match.teamOne.tokens.length;
    const teamTwoInitialInvestment = match.teamTwo.tokens.length;
    
    // Calculate the current value based on real token prices
    const calculateTeamValue = (tokens: string[]) => {
      return tokens.reduce((total, token) => {
        // If we have price data for this token, use it, otherwise assume $1
        const tokenPrice = tokenPrices[token]?.usd || 1;
        return total + tokenPrice;
      }, 0);
    };
    
    // Generate 20 data points, one for each minute going back in time
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      // For historical points, simulate based on the 24h change
      // The closer to now, the closer to the actual current price
      const timeRatio = i / 19; // 0 for current time, 1 for oldest time
      
      const calculateHistoricalValue = (tokens: string[]) => {
        return tokens.reduce((total, token) => {
          if (!tokenPrices[token]) return total + 1; // Default to $1 if no price data
          
          const currentPrice = tokenPrices[token].usd;
          const change24h = tokenPrices[token].usd_24h_change || 0;
          
          // Calculate a simulated historical price based on the 24h change
          // The further back in time, the more we apply the inverse of the 24h change
          const historicalPrice = currentPrice - (currentPrice * (change24h / 100) * timeRatio);
          
          return total + historicalPrice;
        }, 0);
      };
      
      const teamOneValue = calculateHistoricalValue(match.teamOne.tokens);
      const teamTwoValue = calculateHistoricalValue(match.teamTwo.tokens);
      
      // Calculate percentage change from initial investment
      const teamOneChange = ((teamOneValue / teamOneInitialInvestment) * 100) - 100;
      const teamTwoChange = ((teamTwoValue / teamTwoInitialInvestment) * 100) - 100;
      
      data.push({
        time: format(timestamp, "HH:mm"),
        timestamp: timestamp.toISOString(),
        teamOne: teamOneChange,
        teamTwo: teamTwoChange,
      });
    }
    
    setChartData(data);
  }, [match, tokenPrices]);

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
  
  return (
    <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
      <h3 className="text-lg font-medium mb-4">Match Performance</h3>
      <div className="h-[300px]">
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
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
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
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="teamTwo"
              stroke={chartColors.teamTwo}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};