"use client";

import { useState, useEffect } from "react";
import { TokenCard } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { Check, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWallet } from "@suiet/wallet-kit";

interface Token {
  id: string;
  symbol: string;
  name: string;
}

export const CreateTeamForm = () => {
  const router = useRouter();
  const { address, connected } = useWallet();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const tokensPerPage = 20;

  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/tokens');
        
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        setTokens(data);
      } catch (error) {
        console.error('Error fetching tokens:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTokens();
  }, []);
  
  // Check if wallet is connected and log the address
  useEffect(() => {
    console.log('Wallet connected:', connected);
    console.log('Wallet address:', address);
  }, [connected, address]);

  // Function to handle sign-in with wallet address
  const handleSignIn = async () => {
    if (!address) return;
    
    setIsSigningUp(true);
    try {
      const response = await fetch('/api/game/player', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Player registered:', data);
      
      setIsSignedIn(true);
      
      // Move to next step if registration is successful
      setStep(2);
    } catch (error) {
      console.error('Error registering player:', error);
    } finally {
      setIsSigningUp(false);
    }
  };

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

  const handleCreateTeam = async () => {
    if (!address || selectedTokens.length === 0) return;

    setIsCreating(true);
    
    try {
      // Call the actual API to create a team
      const response = await fetch('/api/game/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerAddress: address,
          tokenIds: selectedTokens
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      router.push("/teams");
    } catch (error) {
      console.error('Error creating team:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="bg-card/90 backdrop-blur-sm rounded-lg border p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Create Your Crypto Team</h2>
        <p className="text-sm text-muted-foreground mt-1">
          {step === 1 ? "Sign in with your wallet" : "Select 1-5 tokens for your team"}
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
              <div className="flex flex-col items-center justify-center py-6">
                {isSignedIn ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center p-2 bg-green-100 text-green-700 rounded-full mb-3">
                      <Check className="h-6 w-6" />
                    </div>
                    <p className="font-medium mb-2">Signed In</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      {address?.slice(0, 8)}...{address?.slice(-6)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      {connected ? 
                        `Connected wallet: ${address?.slice(0, 8)}...${address?.slice(-6)}` : 
                        "No wallet connected. Please connect your wallet in the navigation bar first."}
                    </p>
                    <Button 
                      onClick={handleSignIn}
                      disabled={!connected || !address || isSigningUp}
                      className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-6 py-3 font-medium shadow-md transition-all duration-200 hover:shadow-lg"
                    >
                      {isSigningUp ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Signing In...
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>
                )}
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
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search tokens by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                    className="w-full p-3 pl-10 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center h-[300px]">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="ml-2">Loading tokens...</span>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] overflow-y-auto p-1">
                    {tokens
                      .filter(token => {
                        const searchLower = searchTerm.toLowerCase();
                        return token.name.toLowerCase().includes(searchLower) || 
                               token.symbol.toLowerCase().includes(searchLower);
                      })
                      .slice((currentPage - 1) * tokensPerPage, currentPage * tokensPerPage)
                      .map((token) => (
                        <TokenCard
                          key={token.id}
                          token={token}
                          selected={selectedTokens.includes(token.id)}
                          onClick={() => handleTokenSelect(token.id)}
                        />
                      ))}
                  </div>
                  
                  {/* Pagination */}
                  {tokens.length > tokensPerPage && (
                    <div className="flex justify-center mt-4 space-x-2">
                      {Array.from({ length: Math.ceil(tokens.length / tokensPerPage) }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentPage(idx + 1)}
                          className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            currentPage === idx + 1
                              ? "bg-primary text-primary-foreground"
                              : "bg-card hover:bg-accent"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {step === 2 && (
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleCreateTeam}
            disabled={isCreating || selectedTokens.length === 0}
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Team"
            )}
          </Button>
        </div>
      )}
    </div>
  );
};
