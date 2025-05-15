import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export async function POST(request: Request) {
  try {
    const { address } : { address: string } = await request.json();
    
    // Check if player already exists
    const existingPlayer = await prisma.player.findUnique({
      where: { address }
    });

    // If player already exists, return it
    if (existingPlayer) {
      return NextResponse.json({ player: existingPlayer, isNewPlayer: false }, { status: 200 });
    }

    // Create a new player if they don't exist
    const player = await prisma.player.create({
      data: { address }
    });

    return NextResponse.json({ player, isNewPlayer: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating player:', error);
    return NextResponse.json(
      { error: 'Failed to create or find player' },
      { status: 500 }
    );
  }
}

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

    const player = await prisma.player.findUnique({
      where: { address }
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ player }, { status: 200 });
  } catch (error) {
    console.error('Error retrieving player:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve player' },
      { status: 500 }
    );
  }
}