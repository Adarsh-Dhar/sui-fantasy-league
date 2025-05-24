import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { matchId, claimType } = body

    if (!matchId) {
      return NextResponse.json(
        { error: 'Match ID is required' },
        { status: 400 }
      )
    }

    // Get current match
    const match = await prisma.match.findUnique({
      where: { id: matchId }
    })

    if (!match) {
      return NextResponse.json(
        { error: 'Match not found' },
        { status: 404 }
      )
    }

    // Check if share has already been claimed
    if (claimType === 'winner' && match.winnerShareClaimed) {
      return NextResponse.json(
        { error: 'Winner share has already been claimed' },
        { status: 400 }
      )
    }

    if (claimType === 'loser' && match.loserShareClaimed) {
      return NextResponse.json(
        { error: 'Loser share has already been claimed' },
        { status: 400 }
      )
    }

    // Update only the specific claim type
    const updateData = claimType === 'winner' 
      ? { winnerShareClaimed: true }
      : { loserShareClaimed: true }

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: updateData
    })

    return NextResponse.json({ match: updatedMatch })

  } catch (error) {
    console.error('Error updating match claim status:', error)
    return NextResponse.json(
      { error: 'Failed to update match claim status' },
      { status: 500 }
    )
  }
}
