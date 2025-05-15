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
    if (result === "PLAYER_ONE_WIN") {
      await prisma.player.update({
        where: { id: updatedMatch.playerOneId },
        data: { wins: { increment: 1 } },
      });
      
      if (updatedMatch.playerTwoId) {
        await prisma.player.update({
          where: { id: updatedMatch.playerTwoId },
          data: { losses: { increment: 1 } },
        });
      }
    } else if (result === "PLAYER_TWO_WIN" && updatedMatch.playerTwoId) {
      await prisma.player.update({
        where: { id: updatedMatch.playerTwoId },
        data: { wins: { increment: 1 } },
      });
      
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
