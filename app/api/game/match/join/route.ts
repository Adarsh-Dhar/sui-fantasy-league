import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { matchId, teamId, address } = body;

    // Validate required fields
    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      );
    }

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    if (!address) {
      return NextResponse.json(
        { error: 'Player address is required' },
        { status: 400 }
      );
    }

    // Find player by address
    const player = await prisma.player.findUnique({
      where: { address }
    });

    if (!player) {
      return NextResponse.json(
        { error: 'Player not found' },
        { status: 404 }
      );
    }

    // Find team by ID and verify it belongs to the player
    const team = await prisma.team.findFirst({
      where: {
        id: teamId,
        playerId: player.id
      }
    });

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found or does not belong to the player' },
        { status: 404 }
      );
    }

    // Find the match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        playerOne: true,
        teamOne: true
      }
    });

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      );
    }

    // Check if the match is already full
    if (match.playerTwoId) {
      return NextResponse.json(
        { error: 'Match already has two players' },
        { status: 400 }
      );
    }

    // Check if the player is trying to join their own match
    if (match.playerOneId === player.id) {
      return NextResponse.json(
        { error: 'You cannot join your own match' },
        { status: 400 }
      );
    }

    // Join the match
    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: {
        playerTwo: {
          connect: { id: player.id }
        },
        teamTwo: {
          connect: { id: team.id }
        },
        status: 'IN_PROGRESS'
      },
      include: {
        playerOne: true,
        teamOne: true,
        playerTwo: true,
        teamTwo: true
      }
    });

    return NextResponse.json({ match: updatedMatch }, { status: 200 });
  } catch (error) {
    console.error('Error joining match:', error);
    return NextResponse.json(
      { error: 'Failed to join match' },
      { status: 500 }
    );
  }
}
