import { NextResponse } from 'next/server';
import { TokenData } from '@/lib/types';

export const dynamic = 'force-dynamic';

class TokenService {
  private tokenList: Record<string, TokenData[]> = {
    spot: [
      {
        id: 'BTC', name: 'BTC', symbol: 'BTC',
        price: 0
      },
      {
        id: 'ETH', name: 'ETH', symbol: 'ETH',
        price: 0
      },
      {
        id: 'SOL', name: 'SOL', symbol: 'SOL',
        price: 0
      },
      {
        id: 'BNB', name: 'BNB', symbol: 'BNB',
        price: 0
      }
    ]
  };

  async getTokenList(category: string = 'spot'): Promise<TokenData[]> {
    return this.tokenList[category] || [];
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