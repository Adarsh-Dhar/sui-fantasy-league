"use client";

import { useState } from "react";
import { tokens } from "@/lib/data";
import { TokenCard } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const CreateTeamForm = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const handleTokenSelect = (tokenId: string) => {
    setSelectedTokens((prev) => {
      if (prev.includes(tokenId)) {
        return prev.filter((id) => id !== tokenId);
      } else {
        if (prev.length < 5) {
          return [...prev, tokenId];
        } else {
          // Maybe show a toast here saying max tokens reached
          return prev;
        }
      }
    });
  };

  const handleNextStep = () => {
    if (step === 1 && teamName.trim()) {
      setStep(2);
    } else if (step === 2 && selectedTokens.length > 0) {
      handleCreateTeam();
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName || selectedTokens.length === 0) return;

    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      router.push("/teams");
    }, 1500);
  };

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Create Your Crypto Team</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 1
            ? "Give your team a catchy name"
            : "Select 1-5 tokens for your team"}
        </p>
      </div>

      <div className="relative">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full flex mb-6">
          <div className="w-1/2 h-1 rounded-l-full bg-primary"></div>
          <div
            className={`w-1/2 h-1 rounded-r-full ${
              step > 1 ? "bg-primary" : "bg-muted"
            }`}
          ></div>
        </div>

        <div className="mt-8">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="teamName"
                  className="block text-sm font-medium mb-1"
                >
                  Team Name
                </label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Select Tokens</h3>
                <span className="text-sm text-muted-foreground">
                  {selectedTokens.length}/5 selected
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
                {tokens.map((token) => (
                  <TokenCard
                    key={token.id}
                    token={token}
                    selected={selectedTokens.includes(token.id)}
                    onClick={() => handleTokenSelect(token.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex space-x-3 justify-end">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
            )}
            <Button
              onClick={handleNextStep}
              disabled={
                (step === 1 && !teamName.trim()) ||
                (step === 2 && selectedTokens.length === 0) ||
                isCreating
              }
              className="gap-2"
            >
              {isCreating ? (
                "Creating..."
              ) : step === 1 ? (
                <>
                  Next <Plus className="h-4 w-4" />
                </>
              ) : (
                <>
                  Create Team <Check className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};