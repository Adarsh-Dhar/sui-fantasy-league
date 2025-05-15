import { Suspense } from "react";
import { Trophy } from "lucide-react";
import { LeaderboardTable } from "@/components/leaderboard-table";

// Import the components directly
import { LeaderboardContent, LeaderboardSkeleton } from "./leaderboard-content";


export default function LeaderboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top performers in the SUI Fantasy League
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Win = 2 points | Loss = -1 point
          </p>
        </div>
        
        <div className="mb-10">
          <Suspense fallback={<LeaderboardSkeleton />}>
            <LeaderboardContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}