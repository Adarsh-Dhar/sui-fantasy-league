import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { LeaderboardEntry } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    // Get all players with their win/loss records
    const players = await prisma.player.findMany({
      include: {
        teams: true,
      },
    });

    // Calculate points and create leaderboard entries
    const leaderboardEntries = players.map((player) => {
      // Calculate points: 2 points per win, -1 point per loss
      const points = (player.wins * 2) + (player.losses * -1);
      
      return {
        id: player.id,
        address: player.address,
        wins: player.wins,
        losses: player.losses,
        points: points,
        teams: player.teams,
      };
    });
    
    // Filter out players with no matches
    const activeEntries = leaderboardEntries.filter(
      (entry) => entry.wins > 0 || entry.losses > 0
    );

    // Sort by points (descending)
    const sortedEntries = activeEntries.sort((a, b) => b.points - a.points);
    
    // Add rank to each entry
    const rankedEntries = sortedEntries.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));

    return NextResponse.json(rankedEntries);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
