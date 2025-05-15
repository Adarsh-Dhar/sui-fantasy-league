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
  btc: number;
  eth: number;
}

export const PerformanceTestGraph = () => {
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
    const symbols = ["btcusdt", "ethusdt"];
    
    // Generate initial data points with empty values
    const now = new Date();
    const data: ChartDataPoint[] = [];
    
    // Generate 20 empty data points for the chart
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      data.push({
        time: format(timestamp, "HH:mm:ss"),
        timestamp: timestamp.toISOString(),
        btc: 0,
        eth: 0,
      });
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
        addLogMessage(`Initial price set for ${symbol.toUpperCase()}: ${numericPrice.toFixed(2)} USDT`);
        
        // If we have both symbols, start active tracking
        if ((symbol === 'btcusdt' || symbol === 'ethusdt') && mounted) {
          if (receivedSymbols.has('btcusdt') && receivedSymbols.has('ethusdt')) {
            setIsActive(true);
            addLogMessage('Both initial prices received - starting performance tracking');
          }
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
    
    // Subscribe to symbols with a slight delay to avoid React 18 double-mount issues
    const subscribeTimer = setTimeout(() => {
      if (mounted) {
        symbols.forEach(symbol => {
          wsClient.subscribeToSymbol(symbol);
        });
        addLogMessage("Subscribing to BTC and ETH price streams");
      }
    }, 100);
    
    // Clean up on unmount
    return () => {
      mounted = false;
      clearTimeout(subscribeTimer);
      
      // Remove event listeners first
      wsClient.off("price", handlePriceUpdate);
      wsClient.off("open", handleOpen);
      wsClient.off("error", handleError);
      wsClient.off("close", handleClose);
      
      // Then unsubscribe from symbols
      symbols.forEach(symbol => {
        wsClient.unsubscribeFromSymbol(symbol);
      });
    };
  }, []);
  
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
    
    // Make sure we have both initial prices and current prices before calculating
    if (!isActive || 
        !initialPrices.btcusdt || 
        !initialPrices.ethusdt || 
        !currentPrices.btcusdt || 
        !currentPrices.ethusdt) {
      return;
    }
    
    let updateTimer: NodeJS.Timeout;
    let mounted = true;
    
    const updateChart = () => {
      if (!mounted) return;
      
      const now = new Date();
      
      // Calculate percentage change from initial price
      const calculatePercentageChange = (symbol: string) => {
        const initialPrice = initialPrices[symbol];
        const currentPrice = currentPrices[symbol];
        
        if (!initialPrice || !currentPrice) return 0;
        
        // Calculate percentage change: (current - initial) / initial * 100
        return ((currentPrice - initialPrice) / initialPrice) * 100;
      };
      
      // Calculate percentage changes
      const btcPercentageChange = calculatePercentageChange("btcusdt");
      const ethPercentageChange = calculatePercentageChange("ethusdt");
      
      // Only log occasionally to avoid flooding the console
      if (Math.random() < 0.1) { // ~10% chance to log each update
        addLogMessage(`Performance - BTC: ${btcPercentageChange.toFixed(6)}%, ETH: ${ethPercentageChange.toFixed(6)}%`);
      }
      
      setChartData(prevData => {
        // Create a new array with all previous data points shifted left
        const newData = [...prevData];
        
        // Remove the oldest data point
        newData.shift();
        
        // Add the new data point with current time and values
        newData.push({
          time: format(now, "HH:mm:ss"),
          timestamp: now.toISOString(),
          btc: btcPercentageChange,
          eth: ethPercentageChange,
        });
        
        return newData;
      });
      
      // Update the last update time
      setLastUpdateTime(now);
      
      // Schedule next update
      updateTimer = setTimeout(updateChart, 1000);
    };
    
    // Start the update cycle
    updateChart();
    
    // Clean up
    return () => {
      mounted = false;
      clearTimeout(updateTimer);
    };
  }, [isActive, initialPrices, currentPrices]);
  
  // Chart styling
  const chartColors = useMemo(() => {
    return {
      btc: "#F7931A", // Bitcoin orange
      eth: "#627EEA", // Ethereum blue
      grid: "hsl(var(--muted))",
      text: "hsl(var(--muted-foreground))",
    };
  }, []);
  
  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.btc }}
              ></span>
              <span className="mr-2">BTC:</span>
              <span className="font-medium" style={{ color: chartColors.btc }}>
                {payload[0].value >= 0 ? "+" : ""}
                {payload[0].value.toFixed(6)}%
              </span>
            </p>
            <p className="text-xs flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: chartColors.eth }}
              ></span>
              <span className="mr-2">ETH:</span>
              <span className="font-medium" style={{ color: chartColors.eth }}>
                {payload[1].value >= 0 ? "+" : ""}
                {payload[1].value.toFixed(6)}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };
  
  // Reset the chart and start fresh
  const handleReset = () => {
    // Reset initial prices to current prices
    setInitialPrices(currentPrices);
    
    // Reset chart data
    const now = new Date();
    const data: ChartDataPoint[] = [];
    
    // Generate 20 empty data points
    for (let i = 19; i >= 0; i--) {
      const timestamp = subMinutes(now, i);
      
      data.push({
        time: format(timestamp, "HH:mm:ss"),
        timestamp: timestamp.toISOString(),
        btc: 0,
        eth: 0,
      });
    }
    
    setChartData(data);
    setLastUpdateTime(now);
    
    // Log the new baseline prices
    if (currentPrices.btcusdt && currentPrices.ethusdt) {
      addLogMessage(`New baseline established - BTC: ${currentPrices.btcusdt.toFixed(2)} USDT, ETH: ${currentPrices.ethusdt.toFixed(2)} USDT`);
    } else {
      addLogMessage("Chart reset - waiting for new price data");
    }
  };
  
  // Client-side only rendering for the chart to avoid hydration issues
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Use requestAnimationFrame to ensure we're in the browser environment
    const raf = requestAnimationFrame(() => {
      setIsMounted(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);
  
  if (!isMounted) {
    return (
      <div className="space-y-6">
        <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
          <div className="h-[250px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading chart...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">BTC vs ETH Performance</h3>
          <div className={`text-xs flex items-center ${isConnected ? 'text-green-500' : 'text-amber-500'}`}>
            <span className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></span>
            {isConnected ? 'Live updates' : 'Disconnected'}
          </div>
        </div>
        
        {/* Team scores */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg bg-card/50 border border-border">
            <div className="text-sm font-medium mb-1">BTC</div>
            <div className="text-xl font-bold" style={{ color: chartColors.btc }}>
              {chartData.length > 0 ? 
                `${chartData[chartData.length - 1].btc >= 0 ? '+' : ''}${chartData[chartData.length - 1].btc.toFixed(6)}%` : 
                '0.000000%'}
            </div>
          </div>
          <div className="p-3 rounded-lg bg-card/50 border border-border">
            <div className="text-sm font-medium mb-1">ETH</div>
            <div className="text-xl font-bold" style={{ color: chartColors.eth }}>
              {chartData.length > 0 ? 
                `${chartData[chartData.length - 1].eth >= 0 ? '+' : ''}${chartData[chartData.length - 1].eth.toFixed(6)}%` : 
                '0.000000%'}
            </div>
          </div>
        </div>
        
        {/* Initial prices display */}
        <div className="mb-4 p-3 rounded-lg bg-black/10 border border-border">
          <div className="text-sm font-medium mb-2">Initial Reference Prices:</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-muted-foreground">BTC: </span>
              <span className="text-sm font-medium">
                {initialPrices.btcusdt ? `$${initialPrices.btcusdt.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}` : 'Waiting...'}
              </span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">ETH: </span>
              <span className="text-sm font-medium">
                {initialPrices.ethusdt ? `$${initialPrices.ethusdt.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}` : 'Waiting...'}
              </span>
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
                domain={['dataMin - 0.1', 'dataMax + 0.1']}
                allowDecimals={true}
                tickCount={5}
                interval={0}
                padding={{ top: 10, bottom: 10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                formatter={(value) => {
                  return value === "btc" ? "Bitcoin" : "Ethereum";
                }}
              />
              <Line
                type="monotone"
                dataKey="btc"
                stroke={chartColors.btc}
                dot={{ r: 1 }}
                activeDot={{ r: 4 }}
                strokeWidth={2}
                isAnimationActive={false}
                connectNulls={true}
              />
              <Line
                type="monotone"
                dataKey="eth"
                stroke={chartColors.eth}
                dot={{ r: 1 }}
                activeDot={{ r: 4 }}
                strokeWidth={2}
                isAnimationActive={false}
                connectNulls={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={handleReset}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Reset Baseline
          </button>
        </div>
      </div>
      
      {/* Log display */}
      <div className="w-full rounded-lg border border-border p-4 bg-card/80 backdrop-blur-sm">
        <h3 className="text-lg font-medium mb-2">WebSocket Log</h3>
        <div className="bg-black/80 rounded-md p-3 h-[200px] overflow-y-auto font-mono text-xs">
          {logMessages.length === 0 ? (
            <div className="text-muted-foreground">Waiting for WebSocket events...</div>
          ) : (
            logMessages.map((message, index) => (
              <div key={index} className="text-green-400 mb-1">{message}</div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
