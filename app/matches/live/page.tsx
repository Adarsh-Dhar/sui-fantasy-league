"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { getBinanceWebSocketClient, MatchInfo } from "@/lib/websocket-client";
import { PerformanceLiveGraph } from "@/components/performance-live-graph";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy } from "lucide-react";

export default function LiveMatchPage() {
  const router = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [matchStarted, setMatchStarted] = useState(false);
  const [matchEnded, setMatchEnded] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [priceData, setPriceData] = useState({
    opusdt: { price: "0", timestamp: 0, initialPrice: null as number | null, percentChange: 0 },
    solusdt: { price: "0", timestamp: 0, initialPrice: null as number | null, percentChange: 0 }
  });

  useEffect(() => {
    const wsClient = getBinanceWebSocketClient();
    
    // Create a live match for the competition
    const liveMatch: MatchInfo = {
      id: "live-match-" + Date.now(),
      teamOne: {
        id: "team-op",
        name: "Optimism Team",
        tokens: ["op"]
      },
      teamTwo: {
        id: "team-sol",
        name: "Solana Team",
        tokens: ["sol"]
      },
      isActive: true
    };
    
    // Enable WebSocket logging for this match
    wsClient.setActiveMatch(liveMatch);
    
    // Subscribe to OP and SOL streams
    wsClient.subscribeToSymbol("opusdt");
    wsClient.subscribeToSymbol("solusdt");
    
    // Handle price updates
    const handlePriceUpdate = (update: any) => {
      setPriceData(prev => {
        const symbol = update.symbol;
        const price = parseFloat(update.price);
        const currentData = prev[symbol as keyof typeof prev];
        
        if (!currentData) return prev;
        
        // If match has started but no initial price is set, set it now
        let initialPrice = currentData.initialPrice;
        if (matchStarted && initialPrice === null) {
          initialPrice = price;
        }
        
        // Calculate percent change if initial price exists
        let percentChange = 0;
        if (initialPrice !== null) {
          percentChange = ((price - initialPrice) / initialPrice) * 100;
        }
        
        return {
          ...prev,
          [symbol]: {
            price: update.price,
            timestamp: update.timestamp,
            initialPrice,
            percentChange
          }
        };
      });
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
      wsClient.unsubscribeFromSymbol("opusdt");
      wsClient.unsubscribeFromSymbol("solusdt");
      
      // Remove event listeners
      wsClient.off("price", handlePriceUpdate);
      wsClient.off("open", handleOpen);
      wsClient.off("error", handleError);
      wsClient.off("close", handleClose);
    };
  }, []);

  // Start the match and begin tracking performance
  const startMatch = () => {
    setMatchStarted(true);
    setStartTime(new Date());
    
    // Set a timer to end the match after 1 minute
    setTimeout(() => {
      endMatch();
    }, 60000); // 1 minute
  };

  // End the match and determine the winner
  const endMatch = () => {
    setMatchEnded(true);
    setEndTime(new Date());
    
    // Determine winner based on percentage change
    const opChange = priceData.opusdt.percentChange;
    const solChange = priceData.solusdt.percentChange;
    
    if (opChange > solChange) {
      setWinner("Optimism Team");
    } else if (solChange > opChange) {
      setWinner("Solana Team");
    } else {
      setWinner("It's a tie!");
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mr-2"
          onClick={() => router.push('/matches')}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Matches
        </Button>
        <h1 className="text-2xl font-bold">Live Token Battle: OP vs SOL</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded-lg bg-card/80 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2">Optimism (OP/USDT)</h2>
          <div className="text-2xl font-bold">
            ${parseFloat(priceData.opusdt.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4
            })}
          </div>
          {matchStarted && (
            <div className={`text-lg font-semibold ${priceData.opusdt.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceData.opusdt.percentChange >= 0 ? '+' : ''}
              {priceData.opusdt.percentChange.toFixed(4)}%
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Last update: {priceData.opusdt.timestamp > 0 ? format(new Date(priceData.opusdt.timestamp), "HH:mm:ss") : "--:--:--"}
          </div>
        </div>
        
        <div className="p-4 border rounded-lg bg-card/80 backdrop-blur-sm">
          <h2 className="text-lg font-medium mb-2">Solana (SOL/USDT)</h2>
          <div className="text-2xl font-bold">
            ${parseFloat(priceData.solusdt.price).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 4
            })}
          </div>
          {matchStarted && (
            <div className={`text-lg font-semibold ${priceData.solusdt.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceData.solusdt.percentChange >= 0 ? '+' : ''}
              {priceData.solusdt.percentChange.toFixed(4)}%
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            Last update: {priceData.solusdt.timestamp > 0 ? format(new Date(priceData.solusdt.timestamp), "HH:mm:ss") : "--:--:--"}
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className={`text-xs flex items-center mb-2 ${isConnected ? 'text-green-500' : 'text-amber-500'}`}>
          <span className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-500' : 'bg-amber-500'}`}></span>
          {isConnected ? 'WebSocket connected' : 'WebSocket disconnected'}
        </div>
      </div>
      
      {!matchStarted && !matchEnded && (
        <div className="mb-8 text-center">
          <Button 
            size="lg" 
            onClick={startMatch}
            disabled={!isConnected}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Start 1-Minute Match
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            Start a 1-minute competition between OP and SOL tokens. The token with the highest percentage increase wins!
          </p>
        </div>
      )}
      
      {matchStarted && !matchEnded && (
        <div className="mb-8 text-center">
          <div className="text-lg font-medium">Match in progress</div>
          <div className="text-sm text-muted-foreground">
            Started at {startTime?.toLocaleTimeString()} • Ends in {Math.max(0, 60 - Math.floor((Date.now() - (startTime?.getTime() || Date.now())) / 1000))} seconds
          </div>
        </div>
      )}
      
      {matchEnded && (
        <div className="mb-8 text-center p-6 border rounded-lg bg-card/80 backdrop-blur-sm">
          <div className="flex justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Match Complete!</h2>
          <p className="text-lg mb-4">Winner: {winner}</p>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Optimism (OP)</p>
              <p className={`text-lg font-bold ${priceData.opusdt.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceData.opusdt.percentChange >= 0 ? '+' : ''}
                {priceData.opusdt.percentChange.toFixed(4)}%
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium">Solana (SOL)</p>
              <p className={`text-lg font-bold ${priceData.solusdt.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {priceData.solusdt.percentChange >= 0 ? '+' : ''}
                {priceData.solusdt.percentChange.toFixed(4)}%
              </p>
            </div>
          </div>
          <div className="mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setMatchStarted(false);
                setMatchEnded(false);
                setStartTime(null);
                setEndTime(null);
                setWinner(null);
                setPriceData({
                  opusdt: { price: priceData.opusdt.price, timestamp: priceData.opusdt.timestamp, initialPrice: null, percentChange: 0 },
                  solusdt: { price: priceData.solusdt.price, timestamp: priceData.solusdt.timestamp, initialPrice: null, percentChange: 0 }
                });
              }}
            >
              Start New Match
            </Button>
          </div>
        </div>
      )}
      
      <PerformanceLiveGraph tokens={["opusdt", "solusdt"]} matchActive={matchStarted} />
    </div>
  );
}
