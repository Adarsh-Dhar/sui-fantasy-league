import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { teamOneScore, teamTwoScore, result, winnerId, endTime } = await request.json();

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

    return NextResponse.json({ success: true, match: updatedMatch });
  } catch (error) {
    console.error("Error completing match:", error);
    return NextResponse.json(
      { error: "Failed to complete match" },
      { status: 500 }
    );
  }
}
