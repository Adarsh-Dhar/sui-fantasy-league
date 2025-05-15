"use client";

import { useEffect, useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { MatchCard } from "@/components/match-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Match } from "@/lib/types";

export default function MatchesPage() {
  const account = useCurrentAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [liveMatches, setLiveMatches] = useState<any[]>([]);
  const [completedMatches, setCompletedMatches] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    
    const fetchMatches = async () => {
      if (!account?.address) {
        if (isMounted) setIsLoading(false);
        return;
      }

      try {
        if (isMounted) setIsLoading(true);
        // Use cache: 'no-store' to ensure we always get fresh data
        const response = await fetch(`/api/game/match?address=${account.address}`, { cache: 'no-store' });
        
        if (response.ok && isMounted) {
          const data = await response.json();
          
          // Split matches into live and completed
          const live = data.matches.filter((match: any) => 
            match.status === "PENDING" || match.status === "IN_PROGRESS"
          );
          
          const completed = data.matches.filter((match: any) => 
            match.status === "COMPLETED"
          );
          
          setLiveMatches(live);
          setCompletedMatches(completed);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    // Fetch matches immediately
    fetchMatches();
    
    // Set up polling to refresh matches every 10 seconds
    const intervalId = setInterval(fetchMatches, 10000);
    
    // Also refresh when the component becomes visible again (user navigates back)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log('Page became visible, refreshing matches');
        fetchMatches();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      isMounted = false;
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [account?.address]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Fantasy Matches</h1>
          <p className="text-muted-foreground">
            Track live and completed crypto team battles
          </p>
        </div>
        
        <Tabs defaultValue="live" className="mb-8">
          <div className="flex justify-center">
            <TabsList>
              <TabsTrigger value="live" className="relative">
                Live
                {liveMatches.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                )}
              </TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="live" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <p className="text-muted-foreground">Loading matches...</p>
                </div>
              ) : liveMatches.length > 0 ? (
                liveMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <p className="text-muted-foreground">No live matches at the moment</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {isLoading ? (
                <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <p className="text-muted-foreground">Loading matches...</p>
                </div>
              ) : completedMatches.length > 0 ? (
                completedMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))
              ) : (
                <div className="text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                  <p className="text-muted-foreground">No completed matches</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}