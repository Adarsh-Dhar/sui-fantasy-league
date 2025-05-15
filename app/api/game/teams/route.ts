import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Player address is required' },
        { status: 400 }
      );
    }

    // First, find the player by address
    const player = await prisma.player.findUnique({
      where: { address },
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    // Then, find all teams for this player
    const teams = await prisma.team.findMany({
      where: { playerId: player.id },
      include: {
        player: true
      }
    });

    // Transform the teams to match the expected format in the frontend
    const formattedTeams = teams.map(team => {
      // For each token ID, we should fetch token data
      // For now, we'll create placeholder token data
      const tokenData = team.tokens.map(tokenId => ({
        id: tokenId,
        name: "Token", // This would need to be fetched from a tokens API
        symbol: tokenId.slice(0, 4).toUpperCase(), // Placeholder
        price: 100, // Placeholder
        change24h: 0, // Placeholder
        logo: null // Placeholder
      }));

      return {
        id: team.id,
        name: team.name,
        owner: player.address,
        tokens: tokenData,
        totalValue: tokenData.reduce((sum, token) => sum + token.price, 0),
        createdAt: new Date().toISOString() // Using current date as placeholder
      };
    });

    return NextResponse.json({ teams: formattedTeams }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving teams:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve teams' },
      { status: 500 }
    );
  }
}
