import { completedMatches } from "@/lib/data";
import { MatchCard } from "@/components/match-card";
import { History } from "lucide-react";

export default function HistoryPage() {
  // Group completed matches by month
  const groupedMatches = completedMatches.reduce((acc, match) => {
    const date = new Date(match.endTime || match.startTime);
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[month]) {
      acc[month] = [];
    }
    
    acc[month].push(match);
    return acc;
  }, {} as Record<string, typeof completedMatches>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center">
              <History className="h-8 w-8 text-secondary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Match History</h1>
          <p className="text-muted-foreground">
            Review your past matches and performance
          </p>
        </div>
        
        {Object.entries(groupedMatches).length > 0 ? (
          Object.entries(groupedMatches).map(([month, matches]) => (
            <div key={month} className="mb-8">
              <h2 className="text-xl font-bold mb-4 border-b pb-2">{month}</h2>
              <div className="grid grid-cols-1 gap-6">
                {matches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
            <p className="text-muted-foreground">You don't have any match history yet</p>
          </div>
        )}
      </div>
    </div>
  );
}