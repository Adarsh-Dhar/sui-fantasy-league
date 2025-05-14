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
import { format, parseISO } from "date-fns";
import { generateMatchHistory } from "@/lib/data";
import { Match } from "@/lib/types";

interface PerformanceGraphProps {
  match: Match;
}

export const PerformanceGraph = ({ match }: PerformanceGraphProps) => {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    // Generate historical data for the match
    const history = generateMatchHistory(match, 20);
    
    // Format data for the chart
    const formattedData = history.map((point) => ({
      time: format(parseISO(point.timestamp), "HH:mm"),
      timestamp: point.timestamp,
      teamA: point.teamA.percentageChange,
      teamB: point.teamB.percentageChange,
    }));
    
    setChartData(formattedData);
  }, [match]);

  const chartColors = useMemo(() => {
    return {
      teamA: "hsl(var(--positive))",
      teamB: "hsl(var(--negative))",
      grid: "hsl(var(--muted))",
      text: "hsl(var(--muted-foreground))",
    };
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.teamA }}
              ></span>
              <span className="mr-2">{match.teamA.name}:</span>
              <span className="font-medium" style={{ color: chartColors.teamA }}>
                {payload[0].value >= 0 ? "+" : ""}
                {payload[0].value.toFixed(2)}%
              </span>
            </p>
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.teamB }}
              ></span>
              <span className="mr-2">{match.teamB.name}:</span>
              <span className="font-medium" style={{ color: chartColors.teamB }}>
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
                return value === "teamA" ? match.teamA.name : match.teamB.name;
              }}
            />
            <Line
              type="monotone"
              dataKey="teamA"
              stroke={chartColors.teamA}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="teamB"
              stroke={chartColors.teamB}
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