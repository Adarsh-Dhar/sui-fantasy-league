import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const url = 'https://api.coingecko.com/api/v3/coins/list';
    const response = await fetch(url, {
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
    console.error('Error fetching token list:', error);
    return NextResponse.json({ error: 'Failed to fetch token list' }, { status: 500 });
  }
}