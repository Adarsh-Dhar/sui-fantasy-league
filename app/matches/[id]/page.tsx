"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { liveMatches, completedMatches } from "@/lib/data";
import { PerformanceGraph } from "@/components/performance-graph";
import { WinnerCelebration } from "@/components/winner-celebration";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Clock, TrendingUp, ArrowLeft } from "lucide-react";
import { Match } from "@/lib/types";

export default function MatchDetailPage() {
  const params = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [matchEnded, setMatchEnded] = useState(false);

  useEffect(() => {
    const matchId = params.id as string;
    const foundMatch = [...liveMatches, ...completedMatches].find(
      (m) => m.id === matchId
    );

    if (foundMatch) {
      setMatch(foundMatch);
      setMatchEnded(foundMatch.status === "completed");
    }
  }, [params.id]);

  // For demo purposes, we'll simulate a live match ending after 20 seconds
  useEffect(() => {
    if (match && match.status === "live") {
      const timer = setTimeout(() => {
        setMatchEnded(true);
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [match]);

  if (!match) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Match not found</h2>
        <p className="mt-2 text-muted-foreground">
          The match you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/matches" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Matches
          </Button>
        </Link>
      </div>
    );
  }

  if (matchEnded) {
    return <WinnerCelebration match={match} />;
  }

  const timeRemaining = match.status === "live" ? match.duration : "Finished";
  const timeElapsed = match.status === "live" ? "Live" : "Completed";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/matches">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Matches
            </Button>
          </Link>
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div>
              <div
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full mb-2 ${
                  match.status === "live"
                    ? "bg-green-500/20 text-green-500"
                    : "bg-blue-500/20 text-blue-500"
                }`}
              >
                {match.status === "live" ? (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Match
                  </>
                ) : (
                  <>Match Complete</>
                )}
              </div>
              <h1 className="text-2xl font-bold">
                {match.teamA.name} vs {match.teamB.name}
              </h1>
            </div>

            <div className="flex items-center mt-4 md:mt-0">
              <div className="flex items-center gap-2 px-3 py-1 bg-muted/50 rounded-full text-sm">
                <Clock className="h-4 w-4" />
                <span>{timeElapsed}</span>
                <span className="text-muted-foreground">•</span>
                <span>{timeRemaining}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center mb-8">
            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-3">
                <img
                  src={match.teamA.owner.avatar}
                  alt={match.teamA.owner.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{match.teamA.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                by {match.teamA.owner.username}
              </p>
              <div
                className={`text-xl font-bold ${
                  match.teamA.percentageChange >= 0
                    ? "positive-value"
                    : "negative-value"
                }`}
              >
                {match.teamA.percentageChange >= 0 ? "+" : ""}
                {match.teamA.percentageChange.toFixed(2)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ${match.teamA.currentValue.toLocaleString()}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="text-4xl font-bold mb-2">VS</div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Real-time performance</span>
              </div>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-3">
                <img
                  src={match.teamB.owner.avatar}
                  alt={match.teamB.owner.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold">{match.teamB.name}</h3>
              <p className="text-sm text-muted-foreground mb-1">
                by {match.teamB.owner.username}
              </p>
              <div
                className={`text-xl font-bold ${
                  match.teamB.percentageChange >= 0
                    ? "positive-value"
                    : "negative-value"
                }`}
              >
                {match.teamB.percentageChange >= 0 ? "+" : ""}
                {match.teamB.percentageChange.toFixed(2)}%
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                ${match.teamB.currentValue.toLocaleString()}
              </p>
            </div>
          </div>

          <PerformanceGraph match={match} />
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Team Tokens</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">{match.teamA.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {match.teamA.owner.teams
                  .find((t) => t.id === match.teamA.id)
                  ?.tokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-background">
                        <img
                          src={token.logo}
                          alt={token.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div
                          className={`text-xs ${
                            token.change24h >= 0
                              ? "positive-value"
                              : "negative-value"
                          }`}
                        >
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">{match.teamB.name}</h3>
              <div className="grid grid-cols-2 gap-3">
                {match.teamB.owner.teams
                  .find((t) => t.id === match.teamB.id)
                  ?.tokens.map((token) => (
                    <div
                      key={token.id}
                      className="flex items-center p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-background">
                        <img
                          src={token.logo}
                          alt={token.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{token.symbol}</div>
                        <div
                          className={`text-xs ${
                            token.change24h >= 0
                              ? "positive-value"
                              : "negative-value"
                          }`}
                        >
                          {token.change24h >= 0 ? "+" : ""}
                          {token.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}