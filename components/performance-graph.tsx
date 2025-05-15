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

export const PerformanceGraph = ({ match }: PerformanceGraphProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Only generate chart data if we have two teams
    if (!match.teamTwo) {
      setChartData([]);
      return;
    }
    
    // Generate simulated historical data for the match
    const now = new Date();
    const data = [];
    
    // Generate 20 data points, one for each minute going back in time
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      // Generate random percentage changes that trend in a direction
      // This is just for visualization purposes
      const teamOneChange = (Math.sin(i / 3) * 5) + (Math.random() * 2 - 1);
      const teamTwoChange = (Math.cos(i / 3) * 5) + (Math.random() * 2 - 1);
      
      data.push({
        time: format(timestamp, "HH:mm"),
        timestamp: timestamp.toISOString(),
        teamOne: teamOneChange,
        teamTwo: teamTwoChange,
      });
    }
    
    setChartData(data);
  }, [match]);

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