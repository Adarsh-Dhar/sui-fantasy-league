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
import { format } from "date-fns";
import { usePriceWebSocket } from "@/hooks/use-price-websocket";

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
  duration: number | null;
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
  startTime?: string; // Timestamp when match started (status changed to IN_PROGRESS)
}

interface ChartDataPoint {
  time: string;
  timestamp: number;
  averageA: number;
  averageB: number;
}

export const PerformanceGraph = ({ match }: { match: Match }) => {
  // State for chart data
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  
  // Set up token symbols for WebSocket subscription
  const [tokenSymbols, setTokenSymbols] = useState<string[]>([]);
  
  // Use match start time as initial time (when match status changed to IN_PROGRESS)
  const matchStartTime = useMemo(() => {
    return match.startTime ? new Date(match.startTime).getTime() : null;
  }, [match.startTime]);
  
  // Get real-time price updates via WebSocket
  const { averageA, averageB, connectionTime, timestamp, initialTime: wsInitialTime } = usePriceWebSocket(tokenSymbols);
  
  // Use match start time as the initial time
  const initialTime = useMemo(() => matchStartTime || wsInitialTime, [matchStartTime, wsInitialTime]);
  
  // Calculate time remaining in the match
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  
  // Format the connection time into hours, minutes, and seconds
  
  // Calculate connection duration only when both timestamp and initialTime are available
  const connectionDuration = useMemo(() => {
    if (!timestamp || !initialTime) return null;
    return timestamp - initialTime;
  }, [timestamp, initialTime]);

  const formattedConnectionTime = useMemo(() => {
    
    if (!connectionDuration) return null;
    
    const totalSeconds = Math.floor(connectionDuration / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return {
      hours,
      minutes,
      seconds,
      formatted: `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`
    };
  }, [connectionDuration]);
  
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
    
    // Format tokens for WebSocket subscription
    const wsSymbols = uniqueTokens.map(token => {
      const symbol = tokenToSymbol[token.toLowerCase()] || token.toLowerCase();
      return symbol.endsWith('usdt') ? symbol : `${symbol}usdt`;
    });
    
    setTokenSymbols(wsSymbols);
  }, [match.teamOne, match.teamTwo]);
  
  // Update chart data when averageA or averageB changes
  useEffect(() => {
    if (averageA !== null || averageB !== null) {
      updateChartData(averageA, averageB);
    }
  }, [averageA, averageB]);
  
  // Calculate time remaining whenever connectionDuration changes
  useEffect(() => {
    if (match.duration && connectionDuration) {
      // Match duration is in seconds, connectionDuration is in milliseconds
      const durationMs = match.duration * 1000;
      const remainingMs = Math.max(0, durationMs - connectionDuration);
      
      // Format remaining time
      if (remainingMs <= 0) {
        setTimeRemaining("Time's up!");
      } else {
        const remainingSeconds = Math.floor(remainingMs / 1000);
        const minutes = Math.floor(remainingSeconds / 60);
        const seconds = remainingSeconds % 60;
        setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    }
  }, [connectionDuration, match.duration]);
  
  // Function to update chart data with latest averageA and averageB from WebSocket
  const updateChartData = (averageAValue: number | null, averageBValue: number | null) => {
    if (averageAValue === null && averageBValue === null) return;
    
    const now = new Date();
    setLastUpdateTime(now);
    
    const newPoint: ChartDataPoint = {
      time: format(now, 'HH:mm:ss'),
      timestamp: now.getTime(),
      averageA: averageAValue !== null ? averageAValue : 0,
      averageB: averageBValue !== null ? averageBValue : 0,
    };
    
    setChartData(prevData => {
      // If this is the first data point and we have a match start time,
      // add a starting point at the match start time with zeros
      if (prevData.length === 0 && matchStartTime) {
        const matchStartDate = new Date(matchStartTime);
        const startingPoint: ChartDataPoint = {
          time: format(matchStartDate, 'HH:mm:ss'),
          timestamp: matchStartTime,
          averageA: 0,
          averageB: 0,
        };
        return [startingPoint, newPoint];
      }
      
      // Keep only the last 30 data points to avoid performance issues
      const newData = [...prevData, newPoint];
      if (newData.length > 30) {
        return newData.slice(newData.length - 30);
      }
      return newData;
    });
  };

  // Define chart colors
  const chartColors = useMemo(() => {
    return {
      teamOne: "#3b82f6", // Blue for Team A
      teamTwo: "#eab308", // Yellow for Team B
      grid: "hsl(var(--muted))",
      text: "hsl(var(--muted-foreground))",
    };
  }, []);

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-2 text-xs">
          <p className="font-medium">{`Time: ${label}`}</p>
          <p className="text-[#3b82f6]">
            {`Average A: ${payload[0]?.value.toFixed(4)}%`}
          </p>
          <p className="text-[#eab308]">
            {`Average B: ${payload[1]?.value.toFixed(4)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border shadow-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Performance Graph</h3>
        <div className="flex items-center gap-4">
          {timeRemaining && (
            <div className="text-xs font-medium text-primary">
              Time remaining: {timeRemaining}
            </div>
          )}
          {formattedConnectionTime && (
            <div className="text-xs text-muted-foreground">
              Connection time: {formattedConnectionTime.formatted}
            </div>
          )}
          {timestamp && (
            <div className="text-xs font-medium text-primary-foreground bg-primary px-2 py-1 rounded">
              Timestamp: {new Date(timestamp).toLocaleTimeString()}
            </div>
          )}
          {initialTime && (
            <div className="text-xs font-medium text-emerald-100 bg-emerald-600 px-2 py-1 rounded ml-2">
              Match Start: {new Date(initialTime).toLocaleTimeString()}
            </div>
          )}
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
              tickFormatter={(value) => `${value.toFixed(4)}`}
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
                return value === "averageA" ? "Average A" : "Average B";
              }}
              wrapperStyle={{
                paddingTop: "10px"
              }}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="averageA"
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
              dataKey="averageB"
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