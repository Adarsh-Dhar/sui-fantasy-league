import { liveMatches, completedMatches } from "@/lib/data";
import { MatchCard } from "@/components/match-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function MatchesPage() {
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
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              </TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="live" className="mt-6">
            <div className="grid grid-cols-1 gap-6">
              {liveMatches.length > 0 ? (
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
              {completedMatches.length > 0 ? (
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