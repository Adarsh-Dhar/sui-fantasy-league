import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { distributeBettingPool, TimeInterval } from "@/utils/bet-distribution";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { teamOneScore, teamTwoScore, result, winnerId, endTime, teamOneGain, teamTwoGain } = await request.json();

    // Get the match with player and team details
    const match = await prisma.match.findUnique({
      where: { id },
      include: {
        playerOne: true,
        playerTwo: true,
        teamOne: true,
        teamTwo: true
      }
    });

    if (!match || !match.playerTwo || !match.teamTwo) {
      return NextResponse.json(
        { error: "Match not found or incomplete" },
        { status: 404 }
      );
    }

    // Calculate bet distribution
    // Use the match price from the database to determine pot amount
    // The price field in the database represents the amount each player contributes
    // When creating a match, price is parsed as an integer: const matchPrice = price ? parseInt(price) : 1;
    const betAmount = typeof match.price === 'number' ? match.price : parseInt(String(match.price)) || 1;
    // Total pot is the bet amount multiplied by the number of players (2 for a standard match)
    const potAmount = betAmount * 2;
    console.log("pot amount", potAmount)
    
    // Determine time interval from match duration
    let timeInterval: TimeInterval = '1h'; // Default
    if (match.duration) {
      if (match.duration <= 1) timeInterval = '1m';
      else if (match.duration <= 5) timeInterval = '5m';
      else if (match.duration <= 60) timeInterval = '1h';
      else timeInterval = '12h';
    }

    // Calculate bet distribution
    const distribution = distributeBettingPool(
      teamOneGain || 0,
      teamTwoGain || 0,
      potAmount,
      timeInterval,
      match.playerOne.address,
      match.playerTwo.address
    );

    // Update the match in the database
    const updatedMatch = await prisma.match.update({
      where: {
        id,
      },
      data: {
        status: "COMPLETED",
        teamOneScore,
        teamTwoScore,
        result,
        winnerId,
        endTime: new Date(endTime),
        teamOneGain,
        teamTwoGain,
        winnerShare: distribution.winnerShare,
        loserShare: distribution.loserShare
      },
    });

    // Update player stats (wins/losses)
    // Scoring system: 2 points for win, -1 point for loss
    if (result === "PLAYER_ONE_WIN") {
      // Winner gets 2 points and a win
      await prisma.player.update({
        where: { id: updatedMatch.playerOneId },
        data: { wins: { increment: 1 } },
      });
      
      // Loser gets -1 point and a loss
      if (updatedMatch.playerTwoId) {
        await prisma.player.update({
          where: { id: updatedMatch.playerTwoId },
          data: { losses: { increment: 1 } },
        });
      }
    } else if (result === "PLAYER_TWO_WIN" && updatedMatch.playerTwoId) {
      // Winner gets 2 points and a win
      await prisma.player.update({
        where: { id: updatedMatch.playerTwoId },
        data: { wins: { increment: 1 } },
      });
      
      // Loser gets -1 point and a loss
      await prisma.player.update({
        where: { id: updatedMatch.playerOneId },
        data: { losses: { increment: 1 } },
      });
    }

    return NextResponse.json({ 
      success: true, 
      match: updatedMatch,
      distribution
    });
  } catch (error) {
    console.error("Error completing match:", error);
    return NextResponse.json(
      { error: "Failed to complete match" },
      { status: 500 }
    );
  }
}
