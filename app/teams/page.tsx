import { dummyTeams } from "@/lib/data";
import { TeamCard } from "@/components/team-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function TeamsPage() {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyTeams.filter(team => team.owner === 'user1').map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
          
          {dummyTeams.filter(team => team.owner === 'user1').length === 0 && (
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
      </div>
    </div>
  );
}