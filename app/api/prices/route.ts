import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') || 'bitcoin';
    
    const url = 'https://api.coingecko.com/api/v3/simple/price';
    const response = await fetch(`${url}?ids=${id}&vs_currencies=usd&include_24hr_change=true`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching token prices:', error);
    return NextResponse.json({ error: 'Failed to fetch token prices' }, { status: 500 });
  }
}
