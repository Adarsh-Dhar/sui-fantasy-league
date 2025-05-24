import { NextResponse } from 'next/server';
import { TokenData } from '@/lib/types';

export const dynamic = 'force-dynamic';

class Logger {
  log(message: string) {
    console.log(message);
  }

  error(message: string) {
    console.error(message);
  }
}

class TokenService {
  private tokenList: Record<string, TokenData[]> = {};
  private logger = new Logger();

  async getTokenList(category: string = 'spot'): Promise<TokenData[]> {
    if (!this.tokenList[category]) {
      let url = 'https://api.binance.com/api/v3/exchangeInfo';
      if (category === 'futures') {
        url = 'https://fapi.binance.com/fapi/v1/exchangeInfo';
      }
      const response = await fetch(url);
      try {
        const data = await response.json();
        if (!data.symbols || !Array.isArray(data.symbols)) {
          this.logger.error('Invalid API response format');
          return [];
        }
        
        const tokens: TokenData[] = data.symbols.map((item: any) => ({
          id: item.baseAsset,
          name: item.baseAsset,
          symbol: item.baseAsset
        }));
        
        // Remove duplicates based on id
        const uniqueTokens: TokenData[] = Array.from(
          new Map(tokens.map(token => [token.id, token])).values()
        );
        
        this.logger.log(
          `Found ${uniqueTokens.length} ${category} tokens on Binance`,
        );
        this.tokenList[category] = uniqueTokens;
        return uniqueTokens;
      } catch (error) {
        this.logger.error(`Error fetching data: ${error}`);
        return [];
      }
    }
    console.log('tokenList', this.tokenList);
    return this.tokenList[category];
  }
}

const tokenService = new TokenService();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'spot';
    
    const tokens = await tokenService.getTokenList(category);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error('Error fetching token list:', error);
    return NextResponse.json({ error: 'Failed to fetch token list' }, { status: 500 });
  }
}