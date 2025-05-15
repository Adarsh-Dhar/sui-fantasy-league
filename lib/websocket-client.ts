// WebSocket client for Binance price updates
import { EventEmitter } from 'events';

export interface PriceUpdate {
  symbol: string;
  price: string;
  timestamp: number;
}

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
}

class BinanceWebSocketClient extends EventEmitter {
  private connections: Map<string, WebSocket> = new Map();
  private reconnectTimeouts: Map<string, NodeJS.Timeout> = new Map();
  private isActive: boolean = true;
  private activeMatch: MatchInfo | null = null;
  private priceLog: Array<{
    matchId: string;
    timestamp: number;
    formattedTime: string;
    prices: Record<string, string>;
    teamOnePerformance?: number;
    teamTwoPerformance?: number;
  }> = [];

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
    
    try {
      // Close the connection if it exists
      if (this.connections.has(normalizedSymbol)) {
        const ws = this.connections.get(normalizedSymbol);
        if (ws && ws.readyState !== WebSocket.CLOSED && ws.readyState !== WebSocket.CLOSING) {
          ws.close();
        }
        this.connections.delete(normalizedSymbol);
      }

      // Clear any reconnect timeout
      if (this.reconnectTimeouts.has(normalizedSymbol)) {
        clearTimeout(this.reconnectTimeouts.get(normalizedSymbol));
        this.reconnectTimeouts.delete(normalizedSymbol);
      }
    } catch (error) {
      console.log(`Safe unsubscribe from ${symbol}: ${error}`);
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
  
  /**
   * Check if there are any active WebSocket connections
   */
  public hasActiveConnections(): boolean {
    return this.connections.size > 0;
  }

  /**
   * Set active match information for logging purposes
   */
  public setActiveMatch(match: MatchInfo | null): void {
    this.activeMatch = match;
    
    if (match) {
      console.log(`WebSocket logging enabled for match: ${match.id}`);
      // Clear previous log if starting a new match
      if (match.isActive) {
        this.priceLog = [];
      }
    } else {
      console.log('WebSocket logging disabled - no active match');
    }
  }
  
  /**
   * Get logged price data for a specific match
   */
  public getMatchPriceLog(matchId: string): any[] {
    return this.priceLog.filter(entry => entry.matchId === matchId);
  }
  
  /**
   * Log current prices with match performance data
   */
  public logMatchPerformance(teamOnePerformance: number, teamTwoPerformance: number): void {
    if (!this.activeMatch || !this.activeMatch.isActive) return;
    
    // Find the latest log entry (should be from the same update cycle)
    const latestEntry = this.priceLog[this.priceLog.length - 1];
    
    if (latestEntry) {
      // Update the latest entry with performance data
      latestEntry.teamOnePerformance = teamOnePerformance;
      latestEntry.teamTwoPerformance = teamTwoPerformance;
      
      console.log(`Match ${this.activeMatch.id} performance update:`, {
        time: latestEntry.formattedTime,
        teamOne: `${this.activeMatch.teamOne.name}: ${teamOnePerformance.toFixed(4)}%`,
        teamTwo: this.activeMatch.teamTwo ? `${this.activeMatch.teamTwo.name}: ${teamTwoPerformance.toFixed(4)}%` : 'N/A'
      });
    }
  }

  private connectToSymbol(symbol: string): void {
    // If we already have an active connection for this symbol, don't create a new one
    if (this.connections.has(symbol) && 
        this.connections.get(symbol)?.readyState !== WebSocket.CLOSED && 
        this.connections.get(symbol)?.readyState !== WebSocket.CLOSING) {
      return;
    }
    
    const streamType = "aggTrade"; // Using aggTrade for real-time price updates
    const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@${streamType}`;

    try {
      const ws = new WebSocket(wsUrl);

      // Store the connection immediately to prevent duplicate connections
      this.connections.set(symbol, ws);

      ws.onopen = () => {
        console.log("symbol", symbol);
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
          
          // Log price data if there's an active match
          if (this.activeMatch && this.activeMatch.isActive) {
            // Check if this symbol is relevant to the active match
            const allTokens = [
              ...this.activeMatch.teamOne.tokens,
              ...(this.activeMatch.teamTwo?.tokens || [])
            ];
            
            const relevantTokens = allTokens.map(token => {
              const lowerToken = token.toLowerCase();
              return lowerToken.endsWith('usdt') ? lowerToken : `${lowerToken}usdt`;
            });
            
            if (relevantTokens.includes(symbol)) {
              // Format timestamp for logging
              const date = new Date(update.timestamp);
              const formattedTime = date.toISOString();
              
              // Check if we already have an entry for this timestamp (within 100ms)
              const existingEntryIndex = this.priceLog.findIndex(
                entry => Math.abs(entry.timestamp - update.timestamp) < 100
              );
              
              if (existingEntryIndex >= 0) {
                // Update existing entry
                this.priceLog[existingEntryIndex].prices[symbol] = update.price;
              } else {
                // Create new entry
                this.priceLog.push({
                  matchId: this.activeMatch.id,
                  timestamp: update.timestamp,
                  formattedTime,
                  prices: { [symbol]: update.price }
                });
                
                // Keep log size reasonable (max 1000 entries)
                if (this.priceLog.length > 1000) {
                  this.priceLog.shift();
                }
              }
            }
          }
          
          this.emit('price', update);
        } catch (error) {
          console.error(`Error parsing WebSocket message for ${symbol}:`, error);
        }
      };

      ws.onerror = (error) => {
        console.error(`WebSocket error for ${symbol}:`, error);
        this.emit('error', { symbol, error });
      };

      ws.onclose = (event) => {
        console.log(`WebSocket connection closed for ${symbol}`, event.wasClean ? '(clean)' : '(unclean)');
        this.connections.delete(symbol);
        this.emit('close', symbol);
        
        // Attempt to reconnect if the client is still active and this wasn't a clean close
        if (this.isActive && !event.wasClean) {
          const timeout = setTimeout(() => {
            console.log(`Attempting to reconnect WebSocket for ${symbol}`);
            this.connectToSymbol(symbol);
          }, 5000); // Reconnect after 5 seconds
          
          this.reconnectTimeouts.set(symbol, timeout);
        }
      };
    } catch (error) {
      console.error(`Error creating WebSocket for ${symbol}:`, error);
      this.connections.delete(symbol);
      
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
