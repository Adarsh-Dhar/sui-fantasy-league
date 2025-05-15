"use client";

import { TeamCard } from "@/components/team-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Team } from "@/lib/types";



export default function TeamsPage() {
  const account = useCurrentAccount();
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserTeams = async () => {
      if (!account?.address) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // First check if the player exists
        const playerResponse = await fetch(`/api/game/player?address=${account.address}`);
        
        if (!playerResponse.ok) {
          if (playerResponse.status === 404) {
            // Player not found is not an error, just means they have no teams yet
            setTeams([]);
            setIsLoading(false);
            return;
          }
          throw new Error(`Failed to fetch player: ${playerResponse.status}`);
        }
        
        const playerData = await playerResponse.json();
        
        // Fetch teams for this player
        const teamsResponse = await fetch(`/api/game/teams?address=${account.address}`);
        
        if (!teamsResponse.ok) {
          throw new Error(`Failed to fetch teams: ${teamsResponse.status}`);
        }
        
        const teamsData = await teamsResponse.json();
        setTeams(teamsData.teams || []);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err instanceof Error ? err.message : 'Failed to load teams');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserTeams();
  }, [account?.address]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Teams</h1>
            <p className="text-muted-foreground">
              Manage your crypto fantasy teams and create new ones
            </p>
          </div>
          <Link href="/teams/create">
            <Button className="mt-4 sm:mt-0 gap-2">
              <Plus className="h-4 w-4" />
              Create New Team
            </Button>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading your teams...</span>
          </div>
        ) : error ? (
          <div className="col-span-2 text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
            <p className="text-muted-foreground mb-4">Error: {error}</p>
            <Button variant="outline" onClick={() => window.location.reload()} className="gap-2">
              Try Again
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teams.length > 0 ? (
              teams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))
            ) : !account?.address ? (
              <div className="col-span-2 text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                <p className="text-muted-foreground mb-4">Connect your wallet to view your teams</p>
              </div>
            ) : (
              <div className="col-span-2 text-center py-12 bg-card/50 backdrop-blur-sm rounded-lg border">
                <p className="text-muted-foreground mb-4">You don't have any teams yet</p>
                <Link href="/teams/create">
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create Your First Team
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}