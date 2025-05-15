"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getBinanceWebSocketClient, MatchInfo } from "@/lib/websocket-client";
import { PerformanceTestGraph } from "@/components/performance-test-graph";

export default function TestPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [priceData, setPriceData] = useState({
    btcusdt: { price: "0", timestamp: 0 },
    ethusdt: { price: "0", timestamp: 0 }
  });

  useEffect(() => {
    const wsClient = getBinanceWebSocketClient();
    
    // Create a test match for logging purposes
    const testMatch: MatchInfo = {
      id: "test-match-" + Date.now(),
      teamOne: {
        id: "team-btc",
        name: "BTC Team",
        tokens: ["btc"]
      },
      teamTwo: {
        id: "team-eth",
        name: "ETH Team",
        tokens: ["eth"]
      },
      isActive: true
    };
    
    // Enable WebSocket logging for this test match
    wsClient.setActiveMatch(testMatch);
    
    // Subscribe to BTC and ETH streams
    wsClient.subscribeToSymbol("btcusdt");
    wsClient.subscribeToSymbol("ethusdt");
    
    // Handle price updates
    const handlePriceUpdate = (update: any) => {
      setPriceData(prev => ({
        ...prev,
        [update.symbol]: {
          price: update.price,
          timestamp: update.timestamp
        }
      }));
    };
    
    // Handle connection events
    const handleOpen = () => {
      setIsConnected(true);
      console.log("WebSocket connection opened");
    };
    
    const handleError = (err: any) => {
      console.error("WebSocket error:", err);
    };
    
    const handleClose = () => {
      setIsConnected(false);
      console.log("WebSocket connection closed");
    };
    
    // Register event listeners
    wsClient.on("price", handlePriceUpdate);
    wsClient.on("open", handleOpen);
    wsClient.on("error", handleError);
    wsClient.on("close", handleClose);
    
    // Clean up on unmount
    return () => {
      // Disable WebSocket logging
      wsClient.setActiveMatch(null);
      
      // Unsubscribe from streams
      wsClient.unsubscribeFromSymbol("btcusdt");
      wsClient.unsubscribeFromSymbol("ethusdt");
      
      // Remove event listeners
      wsClient.off("price", handlePriceUpdate);
      wsClient.off("open", handleOpen);
      wsClient.off("error", handleError);
      wsClient.off("close", handleClose);
    };
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">WebSocket Test: BTC vs ETH</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded-lg bg-card/80 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2">BTC/USDT</h2>
          <div className="text-2xl font-bold">
            ${parseFloat(priceData.btcusdt.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            Last update: {priceData.btcusdt.timestamp > 0 ? format(new Date(priceData.btcusdt.timestamp), "HH:mm:ss") : "--:--:--"}
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-card/80 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2">ETH/USDT</h2>
          <div className="text-2xl font-bold">
            ${parseFloat(priceData.ethusdt.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className="text-xs text-muted-foreground">
            Last update: {priceData.ethusdt.timestamp > 0 ? format(new Date(priceData.ethusdt.timestamp), "HH:mm:ss") : "--:--:--"}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className={`text-xs flex items-center mb-2 ${isConnected ? 'text-green-500' : 'text-amber-500'}`}>
          <span className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></span>
          {isConnected ? 'WebSocket connected' : 'WebSocket disconnected'}
        </div>
      </div>
      
      <PerformanceTestGraph />
    </div>
  );
}
