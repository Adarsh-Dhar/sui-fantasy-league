import { useState, useEffect, useRef } from 'react';

// Define interface types based on your server implementation
export interface PriceUpdate {
  symbol: string;
  price: string;
  timestamp: number;
}

export interface TokenPercentageUpdate {
  symbol: string;
  currentPrice: string;
  initialPrice: string;
  percentageChange: number;
  timestamp: number;
}

export interface AllTokensUpdate {
  tokens: TokenPercentageUpdate[];
  timestamp: number;
  initialTime?: number | null;
  averagePercentageChange: number;
  averageA?: number | null;
  averageB?: number | null;
  isFinalResult?: boolean;
}

interface PriceData {
  [symbol: string]: {
    price: string;
    timestamp: number;
    percentageChange?: number;
  };
}

interface UsePriceWebSocketOptions {
  setATokens?: string[];
  setBTokens?: string[];
  onSessionEnd?: (finalResults: AllTokensUpdate) => void;
  autoReconnect?: boolean;
}

export function usePriceWebSocket(
  symbols: string[], 
  options: UsePriceWebSocketOptions = {}
) {
  const [priceData, setPriceData] = useState<PriceData>({});
  const [percentageData, setPercentageData] = useState<TokenPercentageUpdate[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [averageA, setAverageA] = useState<number | null>(null);
  const [averageB, setAverageB] = useState<number | null>(null);
  const [overallAverage, setOverallAverage] = useState<number | null>(null);
  const [sessionEnded, setSessionEnded] = useState<boolean>(false);
  const [sessionEndTime, setSessionEndTime] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);
  const [connectionTime, setConnectionTime] = useState<string | null>(null);
  const [connectionDuration, setConnectionDuration] = useState<number | null>(null);
  const [timestamp, setTimestamp] = useState<number | null>(null);
  const [initialTime, setinitialTime] = useState<number | null>(null);
  const [initialPrices, setInitialPrices] = useState<Record<string, string>>({})
  
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    setATokens,
    setBTokens,
    onSessionEnd,
    autoReconnect = true
  } = options;

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      return;
    }

    // Clear any existing reconnect timeout
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    // Function to establish the WebSocket connection
    const connectWebSocket = () => {
      // Close any existing connection
      if (socketRef.current && socketRef.current.readyState !== WebSocket.CLOSED) {
        socketRef.current.close();
      }

      // Connect to the WebSocket server
      const socket = new WebSocket('ws://localhost:5000');
      socketRef.current = socket;

      // Handle connection opening
      socket.onopen = () => {
        console.log('WebSocket connection established with server');
        setIsConnected(true);
        setError(null);
        
        // Normalize symbols for consistency
        const normalizedSymbols = symbols.map(s => 
          s.toLowerCase().endsWith('usdt') ? s.toLowerCase() : `${s.toLowerCase()}usdt`
        );
        
        // Once connected, send subscription message
        const subscriptionMessage = {
          type: 'subscribeToTokens',
          tokens: normalizedSymbols,
          setATokens: setATokens?.map(s => s.toLowerCase().endsWith('usdt') ? s.toLowerCase() : `${s.toLowerCase()}usdt`) || [],
          setBTokens: setBTokens?.map(s => s.toLowerCase().endsWith('usdt') ? s.toLowerCase() : `${s.toLowerCase()}usdt`) || []
        };
        
        socket.send(JSON.stringify(subscriptionMessage));
      };

      // Handle incoming messages
      socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);

          // Only process allTokensUpdate messages
          if (message.type === 'allTokensUpdate') {
            const tokenUpdate = message.data as AllTokensUpdate;
            
            // Update percentage data for all tokens
            setPercentageData(tokenUpdate.tokens);
            
            // Update set averages
            //@ts-ignore
            setAverageA(tokenUpdate.averageA);
            //@ts-ignore
            setAverageB(tokenUpdate.averageB);
            setOverallAverage(tokenUpdate.averagePercentageChange);
            setTimestamp(tokenUpdate.timestamp);
            
            // Set initial timestamp if it's provided by the server
            if (tokenUpdate.initialTime !== undefined && tokenUpdate.initialTime !== null) {
              setinitialTime(tokenUpdate.initialTime);
              console.log('Server provided initialTime:', tokenUpdate.initialTime);
            }
            
            // Collect initial prices from tokens
            if (initialTime === null && tokenUpdate.tokens.length > 0) {
              const initialPricesObj: Record<string, string> = {};
              tokenUpdate.tokens.forEach(token => {
                initialPricesObj[token.symbol] = token.initialPrice;
              });
              setInitialPrices(initialPricesObj);
            }
            
            // Update connection time and duration if available
            if (message.connectionTime) {
              setConnectionTime(message.connectionTime);
            }
            if (message.connectionDuration) {
              setConnectionDuration(message.connectionDuration);
            }
            
            // Update price data with percentages
            const updatedPriceData = { ...priceData };
            tokenUpdate.tokens.forEach(token => {
              updatedPriceData[token.symbol] = {
                price: token.currentPrice,
                timestamp: token.timestamp,
                percentageChange: token.percentageChange
              };
            });
            setPriceData(updatedPriceData);
          } else {
            // Log other message types but don't process them
            console.log(`Received message of type: ${message.type}`);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      // Handle WebSocket errors
      socket.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('WebSocket connection error');
      };

      // Handle WebSocket close
      socket.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        
        // Attempt to reconnect if enabled
        if (autoReconnect && event.code !== 1000) {
          console.log('Attempting to reconnect in 5 seconds...');
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Reconnecting to WebSocket server...');
            connectWebSocket();
          }, 5000);
        }
      };
    };

    // Initialize connection
    connectWebSocket();

    // Update remaining session time if a session is active
    let timerInterval: NodeJS.Timeout | null = null;
    if (sessionEndTime) {
      timerInterval = setInterval(() => {
        const now = Date.now();
        const remaining = sessionEndTime - now;
        
        if (remaining <= 0) {
          setRemainingTime(0);
          if (timerInterval) clearInterval(timerInterval);
        } else {
          setRemainingTime(remaining);
        }
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (timerInterval) clearInterval(timerInterval);
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [symbols.join(','), setATokens?.join(','), setBTokens?.join(',')]); // Depend on symbols and token sets

  // Function to start a timed session
  const startTimedSession = (durationSeconds: number) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'startTimedSession',
        duration: durationSeconds
      }));
    } else {
      setError('WebSocket is not connected, cannot start session.');
    }
  };

  // Function to start the standard 60-second session
  const startFixedSession = () => {
    startTimedSession(60);
  };

  // Function to reset price tracking
  const resetTracking = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'resetTracking'
      }));
      
      // Reset local state
      setPercentageData([]);
      setAverageA(null);
      setAverageB(null);
      setOverallAverage(null);
      setSessionEnded(false);
      setSessionEndTime(null);
      setRemainingTime(null);
    } else {
      setError('WebSocket is not connected, cannot reset tracking.');
    }
  };

  // Function to request the latest percentage data
  const refreshPercentageData = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'getAllTokenPercentages'
      }));
    } else {
      setError('WebSocket is not connected, cannot refresh data.');
    }
  };

  return {
    priceData,
    percentageData,
    isConnected,
    error,
    averageA,
    averageB,
    timestamp,
    initialTime,
    initialPrices,
    overallAverage,
    sessionEnded,
    remainingTime,
    connectionTime,
    connectionDuration,
    startTimedSession,
    startFixedSession,
    resetTracking,
    refreshPercentageData
  };
}
