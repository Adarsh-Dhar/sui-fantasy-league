import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Trophy, TrendingUp, Users, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center py-12 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.3)]">
            <Trophy className="h-10 w-10 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl mb-4 glow-text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          SUI Fantasy League
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8">
          Create your dream crypto team and compete with others to see who gains the most profit in this exciting fantasy league.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link href="/teams/create">
            <Button size="lg" variant="glowing" className="gap-2">
              <Users className="h-5 w-5" />
              Create Your Team
            </Button>
          </Link>
          <Link href="/matches">
            <Button size="lg" variant="outline" className="gap-2">
              <TrendingUp className="h-5 w-5" />
              Live Matches
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mt-8">
        <div className="stats-card">
          <div className="relative z-10">
            <div className="p-2 w-12 h-12 bg-primary/20 rounded-lg mb-4 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Create Your Team</h3>
            <p className="text-muted-foreground">
              Select your favorite crypto tokens to build your dream team and compete against others.
            </p>
          </div>
        </div>
        
        <div className="stats-card">
          <div className="relative z-10">
            <div className="p-2 w-12 h-12 bg-secondary/20 rounded-lg mb-4 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Compete Live</h3>
            <p className="text-muted-foreground">
              Challenge others to matches and watch in real-time as your team performance unfolds.
            </p>
          </div>
        </div>
        
        <div className="stats-card lg:col-span-1 md:col-span-2">
          <div className="relative z-10">
            <div className="p-2 w-12 h-12 bg-primary/20 rounded-lg mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold mb-1">Climb the Leaderboard</h3>
            <p className="text-muted-foreground">
              Win matches, earn points, and rise through the ranks to become the ultimate crypto fantasy champion.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-16 w-full max-w-6xl arena-border">
        <div className="bg-card/70 backdrop-blur-sm p-8 rounded-lg text-center">
          <Layers className="h-10 w-10 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Create teams of crypto tokens, challenge other players, and see whose portfolio performs better in real-time matches.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <span className="font-bold">1</span>
              </div>
              <h3 className="font-medium mb-1">Create a Team</h3>
              <p className="text-sm text-muted-foreground">
                Select from popular crypto tokens to build your fantasy team.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <span className="font-bold">2</span>
              </div>
              <h3 className="font-medium mb-1">Join Matches</h3>
              <p className="text-sm text-muted-foreground">
                Compete against other players in head-to-head matches.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-muted/30">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                <span className="font-bold">3</span>
              </div>
              <h3 className="font-medium mb-1">Win & Earn</h3>
              <p className="text-sm text-muted-foreground">
                Get rewarded for your teams performance and climb the leaderboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}