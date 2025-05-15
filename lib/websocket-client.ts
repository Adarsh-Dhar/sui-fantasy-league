// WebSocket client for Binance price updates
import { EventEmitter } from 'events';

export interface PriceUpdate {
  symbol: string;
  price: string;
  timestamp: number;
}

class BinanceWebSocketClient extends EventEmitter {
  private connections: Map<string, WebSocket> = new Map();
  private reconnectTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private isActive: boolean = true;

  constructor() {
    super();
  }

  public subscribeToSymbol(symbol: string): void {
    // Normalize symbol to lowercase
    const normalizedSymbol = symbol.toLowerCase();
    
    // If already connected to this symbol, don't create a new connection
    if (this.connections.has(normalizedSymbol)) {
      return;
    }

    this.connectToSymbol(normalizedSymbol);
  }

  public unsubscribeFromSymbol(symbol: string): void {
    const normalizedSymbol = symbol.toLowerCase();
    
    // Close the connection if it exists
    if (this.connections.has(normalizedSymbol)) {
      const ws = this.connections.get(normalizedSymbol);
      if (ws) {
        ws.close();
      }
      this.connections.delete(normalizedSymbol);
    }

    // Clear any reconnect timeout
    if (this.reconnectTimeouts.has(normalizedSymbol)) {
      clearTimeout(this.reconnectTimeouts.get(normalizedSymbol));
      this.reconnectTimeouts.delete(normalizedSymbol);
    }
  }

  public disconnect(): void {
    this.isActive = false;
    
    // Close all connections
    this.connections.forEach((ws, symbol) => {
      ws.close();
      this.connections.delete(symbol);
    });

    // Clear all reconnect timeouts
    this.reconnectTimeouts.forEach((timeout, symbol) => {
      clearTimeout(timeout);
      this.reconnectTimeouts.delete(symbol);
    });
  }

  private connectToSymbol(symbol: string): void {
    const streamType = "aggTrade"; // Using aggTrade for real-time price updates
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@${streamType}`;

    try {
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log(`WebSocket connection opened for ${symbol}`);
        this.emit('open', symbol);
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Extract the price from the aggTrade data
          const update: PriceUpdate = {
            symbol: symbol,
            price: data.p, // 'p' is the price field in aggTrade stream
            timestamp: data.E // 'E' is the event time
          };
          
          this.emit('price', update);
        } catch (error) {
          console.error(`Error parsing WebSocket message for ${symbol}:`, error);
        }
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${symbol}:`, error);
        this.emit('error', { symbol, error });
      };

      ws.onclose = () => {
        console.log(`WebSocket connection closed for ${symbol}`);
        this.connections.delete(symbol);
        this.emit('close', symbol);
        
        // Attempt to reconnect if the client is still active
        if (this.isActive) {
          const timeout = setTimeout(() => {
            console.log(`Attempting to reconnect WebSocket for ${symbol}`);
            this.connectToSymbol(symbol);
          }, 5000); // Reconnect after 5 seconds
          
          this.reconnectTimeouts.set(symbol, timeout);
        }
      };

      this.connections.set(symbol, ws);
    } catch (error) {
      console.error(`Error creating WebSocket for ${symbol}:`, error);
      
      // Attempt to reconnect if the client is still active
      if (this.isActive) {
        const timeout = setTimeout(() => {
          console.log(`Attempting to reconnect WebSocket for ${symbol}`);
          this.connectToSymbol(symbol);
        }, 5000); // Reconnect after 5 seconds
        
        this.reconnectTimeouts.set(symbol, timeout);
      }
    }
  }
}

// Create a singleton instance
let instance: BinanceWebSocketClient | null = null;

export const getBinanceWebSocketClient = (): BinanceWebSocketClient => {
  if (!instance) {
    instance = new BinanceWebSocketClient();
  }
  return instance;
};
