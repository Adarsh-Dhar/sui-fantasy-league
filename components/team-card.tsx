"use client";

import { Team } from "@/lib/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Users, ChevronDown, ChevronUp } from "lucide-react";

interface TeamCardProps {
  team: Team;
  selectable?: boolean;
  onSelect?: () => void;
  selected?: boolean;
}

export const TeamCard = ({
  team,
  selectable,
  onSelect,
  selected,
}: TeamCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={`team-card ${selected ? "border-primary bg-primary/10" : ""}`}>
      <div className="relative z-10">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">{team.name}</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-8 w-8 p-0"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center mt-2 text-muted-foreground text-sm">
          <Users className="h-4 w-4 mr-2" />
          <span>{team.tokens.length} tokens</span>
          <span className="mx-2">•</span>
          <span>Value: ${team.totalValue.toLocaleString()}</span>
        </div>

        {expanded && (
          <div className="mt-4 space-y-3">
            <h4 className="text-sm font-medium">Team Tokens:</h4>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
              {team.tokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center p-2 bg-muted/50 rounded-md"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden mr-2 bg-background flex items-center justify-center">
                    {token.logo ? (
                      <img
                        src={token.logo}
                        alt={token.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs font-bold">{token.symbol[0]}</span>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-medium">{token.symbol}</div>
                    <div className="text-xs text-muted-foreground">
                      ${token.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {selectable ? (
            <Button
              variant={selected ? "secondary" : "outline"}
              size="sm"
              onClick={onSelect}
              className={selected ? "border-primary" : ""}
            >
              {selected ? "Selected" : "Select Team"}
            </Button>
          ) : (
            <Link href={`/teams/${team.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};