import { useState, useEffect } from 'react';
import { getBinanceWebSocketClient, PriceUpdate } from '@/lib/websocket-client';

interface PriceData {
  [symbol: string]: {
    price: string;
    timestamp: number;
  };
}

export function usePriceWebSocket(symbols: string[]) {
  const [priceData, setPriceData] = useState<PriceData>({});
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbols || symbols.length === 0) {
      return;
    }

    const wsClient = getBinanceWebSocketClient();
    const normalizedSymbols = symbols.map(s => 
      // Convert to lowercase and ensure it ends with usdt if not specified
      s.toLowerCase().endsWith('usdt') ? s.toLowerCase() : `${s.toLowerCase()}usdt`
    );

    // Subscribe to all symbols
    normalizedSymbols.forEach(symbol => {
      wsClient.subscribeToSymbol(symbol);
    });

    // Handle price updates
    const handlePriceUpdate = (update: PriceUpdate) => {
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
      setError(null);
    };

    const handleError = (err: any) => {
      setError(`WebSocket error: ${err.message || 'Unknown error'}`);
    };

    const handleClose = () => {
      setIsConnected(false);
    };

    // Register event listeners
    wsClient.on('price', handlePriceUpdate);
    wsClient.on('open', handleOpen);
    wsClient.on('error', handleError);
    wsClient.on('close', handleClose);

    // Clean up on unmount
    return () => {
      // Unsubscribe from all symbols
      normalizedSymbols.forEach(symbol => {
        wsClient.unsubscribeFromSymbol(symbol);
      });

      // Remove event listeners
      wsClient.off('price', handlePriceUpdate);
      wsClient.off('open', handleOpen);
      wsClient.off('error', handleError);
      wsClient.off('close', handleClose);
    };
  }, [symbols.join(',')]); // Only re-run if the symbols array changes

  return {
    priceData,
    isConnected,
    error
  };
}
