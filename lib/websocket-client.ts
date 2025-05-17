import { EventEmitter } from 'events';

// Define the price update interface
export interface PriceUpdate {
  symbol: string;
  price: string;
  timestamp: number;
}

// Define the match info interface
export interface MatchInfo {
  id: string;
  teamOne: {
    id: string;
    name: string;
    tokens: string[];
  };
  teamTwo?: {
    id: string;
    name: string;
    tokens: string[];
  };
  isActive: boolean;
  teamOneScore?: number;
  teamTwoScore?: number;
  status?: 'IN_PROGRESS' | 'COMPLETED';
  winnerId?: string;
}

// Singleton instance
let instance: BinanceWebSocketClient | null = null;

// Binance WebSocket client class
class BinanceWebSocketClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private reconnectInterval = 5000; // 5 seconds
  private subscriptions: Set<string> = new Set();
  private isConnected = false;
  private url = 'wss://stream.binance.com:9443/ws';

  constructor() {
    super();
    this.connect();
  }

  private connect(): void {
    if (typeof window === 'undefined') {
      console.log('WebSocket not available in server environment');
      return;
    }

    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.emit('open');
        
        // Resubscribe to all symbols
        if (this.subscriptions.size > 0) {
          this.subscribeToSymbols(Array.from(this.subscriptions));
        }
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          // Handle ticker data
          if (data.e === 'ticker') {
            const update: PriceUpdate = {
              symbol: data.s.toLowerCase(),
              price: data.c,
              timestamp: data.E
            };
            this.emit('price', update);
          }
        } catch (err) {
          console.error('Error parsing WebSocket message:', err);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.emit('error', error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket closed');
        this.isConnected = false;
        this.emit('close');
        
        // Attempt to reconnect
        if (!this.reconnectTimer) {
          this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = null;
            this.connect();
          }, this.reconnectInterval);
        }
      };
    } catch (err) {
      console.error('Error creating WebSocket:', err);
    }
  }

  // Subscribe to a single symbol
  public subscribeToSymbol(symbol: string): void {
    this.subscribeToSymbols([symbol]);
  }

  // Subscribe to multiple symbols
  public subscribeToSymbols(symbols: string[]): void {
    if (!this.ws || !this.isConnected) {
      // Save subscriptions for when connection is established
      symbols.forEach(symbol => this.subscriptions.add(symbol));
      return;
    }

    // Add to subscriptions set
    symbols.forEach(symbol => this.subscriptions.add(symbol));
    
    // Format symbols for Binance API (must be uppercase)
    const formattedSymbols = symbols.map(s => s.toUpperCase());
    
    // Create subscription message
    const subscribeMsg = {
      method: 'SUBSCRIBE',
      params: formattedSymbols.map(symbol => `${symbol}@ticker`),
      id: Date.now()
    };
    
    // Send subscription message
    this.ws.send(JSON.stringify(subscribeMsg));
  }

  // Unsubscribe from a single symbol
  public unsubscribeFromSymbol(symbol: string): void {
    this.unsubscribeFromSymbols([symbol]);
  }

  // Unsubscribe from multiple symbols
  public unsubscribeFromSymbols(symbols: string[]): void {
    if (!this.ws || !this.isConnected) {
      // Remove from pending subscriptions
      symbols.forEach(symbol => this.subscriptions.delete(symbol));
      return;
    }

    // Remove from subscriptions set
    symbols.forEach(symbol => this.subscriptions.delete(symbol));
    
    // Format symbols for Binance API (must be uppercase)
    const formattedSymbols = symbols.map(s => s.toUpperCase());
    
    // Create unsubscription message
    const unsubscribeMsg = {
      method: 'UNSUBSCRIBE',
      params: formattedSymbols.map(symbol => `${symbol}@ticker`),
      id: Date.now()
    };
    
    // Send unsubscription message
    this.ws.send(JSON.stringify(unsubscribeMsg));
  }

  // Send match info to connected clients
  public broadcastMatchUpdate(matchInfo: MatchInfo): void {
    this.emit('match', matchInfo);
  }

  // Set active match for logging
  public setActiveMatch(matchInfo: MatchInfo | null): void {
    console.log('Setting active match:', matchInfo ? matchInfo.id : 'none');
  }

  // Log match performance data
  public logMatchPerformance(teamOneScore: number, teamTwoScore: number): void {
    // This method is a stub for compatibility with existing code
    // The actual implementation is handled by the usePriceWebSocket hook
  }

  // Get match price log
  public getMatchPriceLog(matchId: string): any[] {
    // This method is a stub for compatibility with existing code
    // The actual implementation is handled by the usePriceWebSocket hook
    return [];
  }

  // Check if there are active connections
  public hasActiveConnections(): boolean {
    return this.isConnected && this.subscriptions.size > 0;
  }

  // Close the WebSocket connection
  public close(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

// Get the singleton instance
export function getBinanceWebSocketClient(): BinanceWebSocketClient {
  if (!instance) {
    instance = new BinanceWebSocketClient();
  }
  return instance;
}
