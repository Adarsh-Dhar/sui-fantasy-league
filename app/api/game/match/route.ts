import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { teamId, type, address, duration, price, vaultId } = body;

    // Validate required fields
    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    if (!type || !['RANDOM', 'FRIEND'].includes(type)) {
      return NextResponse.json(
        { error: 'Valid match type is required (RANDOM or FRIEND)' },
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

    // Convert duration string to seconds
    let durationInSeconds = 60; // Default 1 minute
    if (duration) {
      if (duration === '1m') durationInSeconds = 60;
      else if (duration === '5m') durationInSeconds = 300;
      else if (duration === '1h') durationInSeconds = 3600;
      else if (duration === '12h') durationInSeconds = 43200;
      else durationInSeconds = parseInt(duration);
    }

    // Parse price (default to 1 SUI)
    const matchPrice = price ? parseInt(price) : 1;

    // Log the vault ID but don't use it in the match creation
    console.log('Received vault ID in request:', vaultId);
    
    console.log('Creating match with parameters:', {
      type,
      playerId: player.id,
      teamId: team.id,
      duration: durationInSeconds,
      price: matchPrice
    });
    
    // Create a new match
    let match;
    try {
      // Create with duration, price, and vault information
      // Ensure all required fields are included
      match = await prisma.match.create({
        data: {
          type,
          playerOne: {
            connect: { id: player.id }
          },
          teamOne: {
            connect: { id: team.id }
          },
          duration: durationInSeconds,
          price: matchPrice,
          status: 'PENDING',
          vaultId: vaultId, // Save the vault ID with the match
        },
        include: {
          playerOne: true,
          teamOne: true,
          playerTwo: true,
          teamTwo: true
        }
      });
      
      console.log('Match created successfully:', match.id);
    } catch (error) {
      console.error('Error creating match:', error);
      // More detailed error response
      return NextResponse.json(
        { error: 'Failed to create match', details: error instanceof Error ? error.message : 'Unknown error' },
        { status: 500 }
      );
    }

    // For RANDOM matches, try to find a pending match to join
    if (type === 'RANDOM') {
      // Look for a pending random match that's not created by the current player
      const pendingMatch = await prisma.match.findFirst({
        where: {
          type: 'RANDOM',
          status: 'PENDING',
          playerOneId: {
            not: player.id
          },
          playerTwoId: null
        },
        include: {
          playerOne: true,
          teamOne: true
        }
      });

      // If a pending match is found, join it as playerTwo (never as playerOne)
      if (pendingMatch) {
        // Double-check that we're not replacing playerOne
        if (pendingMatch.playerOne && pendingMatch.playerOne.id !== player.id) {
          const updatedMatch = await prisma.match.update({
            where: { id: pendingMatch.id },
            data: {
              playerTwo: {
                connect: { id: player.id }
              },
              teamTwo: {
                connect: { id: team.id }
              },
              status: 'IN_PROGRESS',
              startTime: new Date() // Set the start time when match becomes active
            },
            include: {
              playerOne: true,
              teamOne: true,
              playerTwo: true,
              teamTwo: true
            }
          });

          return NextResponse.json({ match: updatedMatch }, { status: 200 });
        }
      }
    }

    return NextResponse.json({ match }, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Failed to create match' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    const address = searchParams.get('address');

    // If ID is provided, return the specific match
    if (id) {
      const match = await prisma.match.findUnique({
        where: { id },
        include: {
          playerOne: true,
          teamOne: true,
          playerTwo: true,
          teamTwo: true
        }
      });

      if (!match) {
        return NextResponse.json(
          { error: 'Match not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({ match }, { status: 200 });
    }

    // If address is provided, return all matches for the player
    if (address) {
      const player = await prisma.player.findUnique({
        where: { address }
      });

      if (!player) {
        return NextResponse.json(
          { error: 'Player not found' },
          { status: 404 }
        );
      }

      const matches = await prisma.match.findMany({
        where: {
          OR: [
            { playerOneId: player.id },
            { playerTwoId: player.id }
          ]
        },
        include: {
          playerOne: true,
          teamOne: true,
          playerTwo: true,
          teamTwo: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return NextResponse.json({ matches }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Match ID or player address is required' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error retrieving match:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve match' },
      { status: 500 }
    );
  }
}
