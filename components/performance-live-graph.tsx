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
import { format, subMinutes } from "date-fns";
import { getBinanceWebSocketClient } from "@/lib/websocket-client";

interface ChartDataPoint {
  time: string;
  timestamp: string;
  [key: string]: any;
}

interface PerformanceLiveGraphProps {
  tokens: string[];
  matchActive: boolean;
}

export const PerformanceLiveGraph = ({ tokens, matchActive }: PerformanceLiveGraphProps) => {
  // Chart and token data
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [initialPrices, setInitialPrices] = useState<{[token: string]: number}>({});
  const [currentPrices, setCurrentPrices] = useState<{[token: string]: number}>({});
  const [lastUpdateTime, setLastUpdateTime] = useState<Date>(new Date());
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [logMessages, setLogMessages] = useState<string[]>([]);

  // Initialize WebSocket connection and chart data
  useEffect(() => {
    // Only run this effect on the client side to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    let mounted = true;
    const wsClient = getBinanceWebSocketClient();
    
    // Generate initial data points with empty values
    const now = new Date();
    const data: ChartDataPoint[] = [];
    
    // Generate 20 empty data points for the chart
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      const dataPoint: ChartDataPoint = {
        time: format(timestamp, "HH:mm:ss"),
        timestamp: timestamp.toISOString(),
      };
      
      // Add empty values for each token
      tokens.forEach(token => {
        dataPoint[token] = 0;
      });
      
      data.push(dataPoint);
    }
    
    if (mounted) {
      setChartData(data);
      setLastUpdateTime(now);
    }
    
    // Track received symbols for initial prices
    const receivedSymbols = new Set<string>();
    
    // Handle price updates
    const handlePriceUpdate = (update: any) => {
      if (!mounted) return;
      
      const { symbol, price, timestamp } = update;
      const numericPrice = parseFloat(price);
      
      // Only process updates for tokens we're interested in
      if (!tokens.includes(symbol)) return;
      
      // Store current price
      setCurrentPrices(prev => ({
        ...prev,
        [symbol]: numericPrice
      }));
      
      // Track initial prices for each symbol individually
      if (!receivedSymbols.has(symbol)) {
        receivedSymbols.add(symbol);
        
        // Update initial prices
        setInitialPrices(prev => ({
          ...prev,
          [symbol]: numericPrice
        }));
        
        // Log the initial price for this symbol
        addLogMessage(`Initial price set for ${symbol.toUpperCase()}: ${numericPrice.toFixed(4)} USDT`);
        
        // If we have all tokens, start active tracking
        if (tokens.every(token => receivedSymbols.has(token)) && mounted) {
          setIsActive(true);
          addLogMessage('All initial prices received - starting performance tracking');
        }
      }
    };
    
    // Handle connection events
    const handleOpen = (symbol: string) => {
      if (!mounted) return;
      setIsConnected(true);
      addLogMessage(`WebSocket connection opened for ${symbol}`);
    };
    
    const handleError = (err: any) => {
      if (!mounted) return;
      addLogMessage(`WebSocket error: ${err.symbol || 'Unknown symbol'} - ${err.error?.message || 'Unknown error'}`);
    };
    
    const handleClose = (symbol: string) => {
      if (!mounted) return;
      addLogMessage(`WebSocket connection closed for ${symbol}`);
      // Only set disconnected if all connections are closed
      if (!wsClient.hasActiveConnections()) {
        setIsConnected(false);
      }
    };
    
    // Register event listeners
    wsClient.on("price", handlePriceUpdate);
    wsClient.on("open", handleOpen);
    wsClient.on("error", handleError);
    wsClient.on("close", handleClose);
    
    // Clean up on unmount
    return () => {
      mounted = false;
      
      // Remove event listeners first
      wsClient.off("price", handlePriceUpdate);
      wsClient.off("open", handleOpen);
      wsClient.off("error", handleError);
      wsClient.off("close", handleClose);
    };
  }, [tokens]);
  
  // Helper function to add log messages
  const addLogMessage = (message: string) => {
    setLogMessages(prev => {
      const newMessages = [...prev, `[${format(new Date(), "HH:mm:ss")}] ${message}`];
      // Keep only the last 10 messages
      return newMessages.slice(-10);
    });
  };
  
  // Update chart data based on price changes
  useEffect(() => {
    // Only run this effect on the client side
    if (typeof window === 'undefined') return;
    
    // Make sure we have initial prices for all tokens and match is active
    if (!isActive || !matchActive || tokens.some(token => !initialPrices[token] || !currentPrices[token])) {
      return;
    }
    
    let updateTimer: NodeJS.Timeout;
    let mounted = true;
    
    const updateChart = () => {
      if (!mounted) return;
      
      const now = new Date();
      
      // Calculate percentage change from initial price for each token
      const calculatePercentageChange = (symbol: string) => {
        const initialPrice = initialPrices[symbol];
        const currentPrice = currentPrices[symbol];
        
        if (!initialPrice || !currentPrice) return 0;
        
        // Calculate percentage change: (current - initial) / initial * 100
        return ((currentPrice - initialPrice) / initialPrice) * 100;
      };
      
      // Calculate percentage changes for all tokens
      const percentageChanges: {[token: string]: number} = {};
      tokens.forEach(token => {
        percentageChanges[token] = calculatePercentageChange(token);
      });
      
      // Create new data point
      const newDataPoint: ChartDataPoint = {
        time: format(now, "HH:mm:ss"),
        timestamp: now.toISOString(),
      };
      
      // Add percentage changes for each token
      tokens.forEach(token => {
        newDataPoint[token] = percentageChanges[token];
      });
      
      // Update chart data by removing oldest point and adding new one
      setChartData(prev => {
        const newData = [...prev.slice(1), newDataPoint];
        return newData;
      });
      
      setLastUpdateTime(now);
      
      // Log performance data for the match
      const tokenValues = tokens.map(token => 
        `${token.replace('usdt', '').toUpperCase()}: ${percentageChanges[token].toFixed(4)}%`
      ).join(' | ');
      
      addLogMessage(`Performance update: ${tokenValues}`);
    };
    
    // Update immediately and then every 2 seconds
    updateChart();
    updateTimer = setInterval(updateChart, 2000);
    
    return () => {
      mounted = false;
      clearInterval(updateTimer);
    };
  }, [isActive, matchActive, initialPrices, currentPrices, tokens]);
  
  // Define colors for each token
  const tokenColors = useMemo(() => {
    const colors: {[key: string]: string} = {
      opusdt: "#FF0080", // Optimism - bright pink
      solusdt: "#9945FF", // Solana - purple
      btcusdt: "#F7931A", // Bitcoin - orange
      ethusdt: "#627EEA", // Ethereum - blue
      suiusdt: "#6fbcf0", // SUI - light blue
      arbusdt: "#28A0F0", // Arbitrum - blue
      avaxusdt: "#E84142", // Avalanche - red
      maticusdt: "#8247E5", // Polygon - purple
    };
    
    return colors;
  }, []);
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border p-2 rounded-md shadow-md text-xs">
          <p className="font-medium">{label}</p>
          <div className="space-y-1 mt-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center">
                <div
                  className="w-2 h-2 rounded-full mr-1"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="capitalize">{entry.name.replace('usdt', '').toUpperCase()}: </span>
                <span className={entry.value >= 0 ? 'text-green-500 ml-1' : 'text-red-500 ml-1'}>
                  {entry.value >= 0 ? '+' : ''}{entry.value.toFixed(4)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-lg border bg-card/80 backdrop-blur-sm p-4">
      <div className="mb-4">
        <h3 className="text-lg font-medium">Performance Chart</h3>
        <p className="text-sm text-muted-foreground">
          Real-time token performance comparison
        </p>
      </div>
      
      <div className="h-64 mb-4">
        {!matchActive ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Start the match to see performance data</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }} 
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `${value.toFixed(2)}%`}
                domain={['auto', 'auto']}
                tick={{ fontSize: 12 }}
                width={50}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {tokens.map(token => (
                <Line
                  key={token}
                  type="monotone"
                  dataKey={token}
                  name={token.replace('usdt', '').toUpperCase()}
                  stroke={tokenColors[token] || "#8884d8"}
                  activeDot={{ r: 6 }}
                  dot={false}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      
      <div className="text-xs text-muted-foreground">
        <div className="flex justify-between">
          <span>Last update: {format(lastUpdateTime, "HH:mm:ss")}</span>
          <span className={isConnected ? "text-green-500" : "text-amber-500"}>
            {isConnected ? "Connected" : "Disconnected"}
          </span>
        </div>
      </div>
      
      {/* Log messages (hidden by default, can be shown for debugging) */}
      {false && (
        <div className="mt-4 p-2 bg-muted rounded-md text-xs max-h-32 overflow-y-auto">
          <div className="font-medium mb-1">Log</div>
          {logMessages.map((msg, i) => (
            <div key={i} className="text-muted-foreground">{msg}</div>
          ))}
        </div>
      )}
    </div>
  );
};
