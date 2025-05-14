"use client";

import { useState, useEffect } from "react";
import { TokenCard } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { Check, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Token {
  id: string;
  symbol: string;
  name: string;
}

export const CreateTeamForm = () => {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
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
                      .sort((a, b) => {
                        if (!searchTerm) return 0;
                        
                        const searchLower = searchTerm.toLowerCase();
                        const aNameLower = a.name.toLowerCase();
                        const bNameLower = b.name.toLowerCase();
                        const aSymbolLower = a.symbol.toLowerCase();
                        const bSymbolLower = b.symbol.toLowerCase();
                        
                        // Exact matches first
                        const aExactNameMatch = aNameLower === searchLower;
                        const bExactNameMatch = bNameLower === searchLower;
                        const aExactSymbolMatch = aSymbolLower === searchLower;
                        const bExactSymbolMatch = bSymbolLower === searchLower;
                        
                        if (aExactNameMatch && !bExactNameMatch) return -1;
                        if (!aExactNameMatch && bExactNameMatch) return 1;
                        if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                        if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                        
                        // Starts with matches second
                        const aNameStartsWith = aNameLower.startsWith(searchLower);
                        const bNameStartsWith = bNameLower.startsWith(searchLower);
                        const aSymbolStartsWith = aSymbolLower.startsWith(searchLower);
                        const bSymbolStartsWith = bSymbolLower.startsWith(searchLower);
                        
                        if (aNameStartsWith && !bNameStartsWith) return -1;
                        if (!aNameStartsWith && bNameStartsWith) return 1;
                        if (aSymbolStartsWith && !bSymbolStartsWith) return -1;
                        if (!aSymbolStartsWith && bSymbolStartsWith) return 1;
                        
                        // Word boundary matches third (e.g., "Ethereum Classic" for "Ethereum")
                        const aNameWordMatch = new RegExp(`\\b${searchLower}\\b`).test(aNameLower);
                        const bNameWordMatch = new RegExp(`\\b${searchLower}\\b`).test(bNameLower);
                        
                        if (aNameWordMatch && !bNameWordMatch) return -1;
                        if (!aNameWordMatch && bNameWordMatch) return 1;
                        
                        // Alphabetical order for equal relevance
                        return aNameLower.localeCompare(bNameLower);
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
                  
                  {/* Pagination Controls */}
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing page {currentPage} of tokens
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const searchLower = searchTerm.toLowerCase();
                          const filteredTokens = tokens.filter(token => 
                            token.name.toLowerCase().includes(searchLower) || 
                            token.symbol.toLowerCase().includes(searchLower)
                          );
                          const maxPage = Math.ceil(filteredTokens.length / tokensPerPage);
                          setCurrentPage(prev => Math.min(prev + 1, maxPage));
                        }}
                        disabled={tokens.filter(token => {
                          const searchLower = searchTerm.toLowerCase();
                          return token.name.toLowerCase().includes(searchLower) || 
                                 token.symbol.toLowerCase().includes(searchLower);
                        }).length <= currentPage * tokensPerPage}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </>
              )}
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