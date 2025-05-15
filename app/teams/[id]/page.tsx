"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dummyTeams, tokens } from "@/lib/data";
import { generatePriceHistory } from "@/lib/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Pencil, Trophy, TrendingUp } from "lucide-react";
import { Team, TokenWithHistory } from "@/lib/types";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format, parseISO } from "date-fns";

export default function TeamDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [tokensWithHistory, setTokensWithHistory] = useState<TokenWithHistory[]>([]);

  useEffect(() => {
    const teamId = params.id as string;
    const foundTeam = dummyTeams.find((t) => t.id === teamId);

    if (foundTeam) {
      setTeam(foundTeam);

      // Generate price history for each token
      const enrichedTokens = foundTeam.tokens.map((token) => ({
        ...token,
        priceHistory: generatePriceHistory(20, 2, 0),
      }));

      setTokensWithHistory(enrichedTokens);
    }
  }, [params.id]);

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Team not found</h2>
        <p className="mt-2 text-muted-foreground">
          The team you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/teams" className="mt-4 inline-block">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Teams
          </Button>
        </Link>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border p-3 rounded-md shadow-md">
          <p className="text-sm font-medium">{format(parseISO(label), "MMM d, HH:mm")}</p>
          <p className="text-xs mt-1">
            Price: ${payload[0].value.toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link href="/teams">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{team.name}</h1>
              <p className="text-muted-foreground">
                Created {new Date(team.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex items-center mt-4 md:mt-0 space-x-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Pencil className="h-4 w-4" />
                Edit Team
              </Button>
              <Button size="sm" className="gap-2">
                <Trophy className="h-4 w-4" />
                Find Match
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="stats-card">
              <div className="relative z-10">
                <h3 className="text-lg font-medium mb-4">Team Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total Value:</span>
                    <span className="font-bold">
                      ${team.totalValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tokens:</span>
                    <span>{team.tokens.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Matches Won:</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Matches Lost:</span>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stats-card">
              <div className="relative z-10">
                <h3 className="text-lg font-medium mb-4">Performance</h3>
                <div className="h-[160px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={tokensWithHistory[0]?.priceHistory || []}
                      margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorValue"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="hsl(var(--primary))"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="hsl(var(--muted))"
                      />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(tick) => format(parseISO(tick), "HH:mm")}
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <YAxis
                        tickFormatter={(tick) => `$${tick}`}
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6">
          <h2 className="text-xl font-bold mb-4">Team Tokens</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {team.tokens.map((token) => (
              <div
                key={token.id}
                className="p-4 rounded-lg bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:shadow-md"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden bg-background">
                    <img
                      src={token.logo}
                      alt={token.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <p className="text-xs text-muted-foreground">{token.symbol}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-background/50 p-2 rounded">
                    <p className="text-muted-foreground text-xs mb-1">Price</p>
                    
                  </div>
                  <div className="bg-background/50 p-2 rounded">
                    <p className="text-muted-foreground text-xs mb-1">24h</p>
                   
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border/30">
                  <div className="h-[60px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={tokensWithHistory.find(t => t.id === token.id)?.priceHistory || []}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id={`gradient-${token.id}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >

                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="price"
                          fillOpacity={1}
                          fill={`url(#gradient-${token.id})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}