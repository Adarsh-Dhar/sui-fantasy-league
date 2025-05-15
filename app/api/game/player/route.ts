import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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