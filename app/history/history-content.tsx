"use client";

import { useState, useEffect } from "react";
import { MatchCard } from "@/components/match-card";
import { useWallet } from "@suiet/wallet-kit";
import { Skeleton } from "@/components/ui/skeleton";
import { History } from "lucide-react";

interface MatchHistory {
  id: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  startTime: string | null;
  endTime: string | null;
  duration: string;
  result: string | null;
  teamOneScore: number | null;
  teamTwoScore: number | null;
  isWinner: boolean | null;
  isPlayerOne: boolean;
  teamOne: {
    id: string;
    name: string;
    player: {
      id: string;
      address: string;
    };
  };
  teamTwo: {
    id: string;
    name: string;
    player: {
      id: string;
      address: string;
    };
  } | null;
}

export function HistoryContent() {
  const { address } = useWallet();
  const [matches, setMatches] = useState<MatchHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchHistory = async () => {
      if (!address) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/history?address=${address}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch match history");
        }
        
        const data = await response.json();
        console.log('Fetched match history:', data);
        setMatches(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching match history:", err);
        setError("Failed to load match history");
        setLoading(false);
      }
    };

    fetchMatchHistory();
  }, [address]);

  // Separate matches by status
  const liveMatches = matches.filter(match => match.status === 'IN_PROGRESS');
  const pendingMatches = matches.filter(match => match.status === 'PENDING');
  const completedMatches = matches.filter(match => match.status === 'COMPLETED');
  
  // Group completed matches by month
  const groupedCompletedMatches = completedMatches.reduce((acc, match) => {
    // Skip matches without timestamp data
    if (!match.endTime && !match.startTime) return acc;
    
    // Use a fallback date if both are null (shouldn't happen with the check above)
    const timestamp = match.endTime || match.startTime || new Date().toISOString();
    const date = new Date(timestamp);
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!acc[month]) {
      acc[month] = [];
    }
    
    acc[month].push(match);
    return acc;
  }, {} as Record<string, MatchHistory[]>);

  if (loading) {
    return <HistorySkeleton />;
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <p className="text-red-600 dark:text-red-400">{error}</p>
        <p className="text-sm text-muted-foreground mt-2">
          Please try again later
        </p>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
        <p className="text-muted-foreground">Connect your wallet to view match history</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
        <p className="text-muted-foreground">You don't have any match history yet</p>
      </div>
    );
  }

  return (
    <>
      {liveMatches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-green-500">Live Matches</h2>
          <div className="grid grid-cols-1 gap-6">
            {liveMatches.map((match: MatchHistory) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}
      
      {pendingMatches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2 text-yellow-500">Pending Matches</h2>
          <div className="grid grid-cols-1 gap-6">
            {pendingMatches.map((match: MatchHistory) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}
      
      {Object.entries(groupedCompletedMatches).map(([month, monthMatches]) => (
        <div key={month} className="mb-8">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Completed - {month}</h2>
          <div className="grid grid-cols-1 gap-6">
            {monthMatches.map((match: MatchHistory) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      ))}
      
      {liveMatches.length === 0 && pendingMatches.length === 0 && completedMatches.length === 0 && (
        <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
          <p className="text-muted-foreground">You don't have any matches yet</p>
        </div>
      )}
    </>
  );
}

export function HistorySkeleton() {
  return (
    <>
      <div className="mb-8">
        <div className="h-8 w-48 bg-muted rounded mb-4"></div>
        <div className="grid grid-cols-1 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-card/90 backdrop-blur-sm rounded-lg border p-4 animate-pulse">
              <div className="flex items-center justify-between mb-4">
                <div className="h-6 w-20 bg-muted rounded"></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="h-6 w-8 bg-muted rounded mb-2"></div>
                  <div className="h-4 w-16 bg-muted rounded"></div>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 bg-muted rounded-full"></div>
                  <div className="h-4 w-20 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
