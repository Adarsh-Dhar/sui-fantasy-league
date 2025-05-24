"use client";

import { useState, useEffect } from "react";
import { TokenCard } from "@/components/token-card";
import { Button } from "@/components/ui/button";
import { Check, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";

import { TokenData } from "@/lib/types";

export const CreateTeamForm = () => {
  const router = useRouter();
  const account = useCurrentAccount();
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]);
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
        console.log('tokens data', data);
        
        // Ensure the data is in the correct format
        if (Array.isArray(data)) {
          // Make sure each token has the required fields
          const validTokens = data.filter(token => 
            token && typeof token === 'object' && 
            'id' in token && 'name' in token && 'symbol' in token
          );
          setTokens(validTokens);
        } else {
          console.error('Invalid token data format:', data);
          setTokens([]);
        }
      } catch (error) {
        console.error('Error fetching tokens:', error);
        setTokens([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTokens();
  }, []);
  
  // Check if wallet is connected and log the address
  useEffect(() => {
    console.log('Wallet connected:', account);
    console.log('Wallet address:', account?.address);
  }, [account]);

  // Function to handle sign-in with wallet address
  const handleSignIn = async () => {
    if (!account?.address) return;
    
    setIsSigningUp(true);
    const address = account?.address;
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
    if (!account?.address || selectedTokens.length === 0) return;

    setIsCreating(true);
    
    try {
      // Use the user-provided team name or generate a default one if empty
      const finalTeamName = teamName.trim() || `Team ${account.address.slice(0, 6)}`;
      
      // Call the team API to create a team with the player address directly
      const response = await fetch('/api/game/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: finalTeamName,
          address: account.address,
          tokens: selectedTokens
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed with status ${response.status}`);
      }
      
      // Show success message and redirect
      console.log('Team created successfully!');
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
          {step === 1 ? "Sign in with your wallet" : step === 2 ? "Select 1-5 tokens for your team" : "Name your team"}
        </p>
      </div>

      <div className="relative">
        {/* Progress indicator */}
        <div className="absolute top-0 left-0 w-full flex mb-6">
          <div className="w-1/3 h-1 rounded-l-full bg-primary"></div>
          <div
            className={`w-1/3 h-1 ${
              step > 1 ? "bg-primary" : "bg-muted"
            }`}
          ></div>
          <div
            className={`w-1/3 h-1 rounded-r-full ${
              step > 2 ? "bg-primary" : "bg-muted"
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
                      {account?.address?.slice(0, 8)}...{account?.address?.slice(-6)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      { account ? 
                        `Connected wallet: ${account?.address?.slice(0, 8)}...${account?.address?.slice(-6)}` : 
                        "No wallet connected. Please connect your wallet in the navigation bar first."}
                    </p>
                    <Button 
                      onClick={handleSignIn}
                      disabled={! account || isSigningUp}
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
                      .sort((a, b) => {
                        // If search term is empty, maintain original order
                        if (!searchTerm) return 0;
                        
                        const searchLower = searchTerm.toLowerCase();
                        const aNameLower = a.name.toLowerCase();
                        const bNameLower = b.name.toLowerCase();
                        const aSymbolLower = a.symbol.toLowerCase();
                        const bSymbolLower = b.symbol.toLowerCase();
                        
                        // Check for exact matches in name or symbol (case insensitive)
                        const aExactNameMatch = aNameLower === searchLower;
                        const bExactNameMatch = bNameLower === searchLower;
                        const aExactSymbolMatch = aSymbolLower === searchLower;
                        const bExactSymbolMatch = bSymbolLower === searchLower;
                        
                        // Check for starts with matches
                        const aStartsWithName = aNameLower.startsWith(searchLower);
                        const bStartsWithName = bNameLower.startsWith(searchLower);
                        const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                        const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                        
                        // Prioritize exact matches, then starts with matches, then includes matches
                        if (aExactNameMatch && !bExactNameMatch) return -1;
                        if (!aExactNameMatch && bExactNameMatch) return 1;
                        if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                        if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                        
                        // Next priority: starts with matches
                        if (aStartsWithName && !bStartsWithName) return -1;
                        if (!aStartsWithName && bStartsWithName) return 1;
                        if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                        if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                        
                        // If both have the same match type, sort alphabetically
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
                  
                  {/* Pagination */}
                  {tokens.filter(token => {
                    const searchLower = searchTerm.toLowerCase();
                    return token.name.toLowerCase().includes(searchLower) || 
                           token.symbol.toLowerCase().includes(searchLower);
                  }).sort((a, b) => {
                    // If search term is empty, maintain original order
                    if (!searchTerm) return 0;
                    
                    const searchLower = searchTerm.toLowerCase();
                    const aNameLower = a.name.toLowerCase();
                    const bNameLower = b.name.toLowerCase();
                    const aSymbolLower = a.symbol.toLowerCase();
                    const bSymbolLower = b.symbol.toLowerCase();
                    
                    // Check for exact matches in name or symbol (case insensitive)
                    const aExactNameMatch = aNameLower === searchLower;
                    const bExactNameMatch = bNameLower === searchLower;
                    const aExactSymbolMatch = aSymbolLower === searchLower;
                    const bExactSymbolMatch = bSymbolLower === searchLower;
                    
                    // Check for starts with matches
                    const aStartsWithName = aNameLower.startsWith(searchLower);
                    const bStartsWithName = bNameLower.startsWith(searchLower);
                    const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                    const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                    
                    // Prioritize exact matches, then starts with matches, then includes matches
                    if (aExactNameMatch && !bExactNameMatch) return -1;
                    if (!aExactNameMatch && bExactNameMatch) return 1;
                    if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                    if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                    
                    // Next priority: starts with matches
                    if (aStartsWithName && !bStartsWithName) return -1;
                    if (!aStartsWithName && bStartsWithName) return 1;
                    if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                    if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                    
                    // If both have the same match type, sort alphabetically
                    return aNameLower.localeCompare(bNameLower);
                  }).length > tokensPerPage && (
                    <div className="flex justify-center mt-4 space-x-1 items-center">
                      {/* Previous button */}
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 rounded-md flex items-center justify-center ${
                          currentPage === 1
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-card hover:bg-accent"
                        }`}
                      >
                        Prev
                      </button>
                      
                      {/* Page numbers with ellipsis */}
                      {(() => {
                        const filteredTokens = tokens.filter(token => {
                          const searchLower = searchTerm.toLowerCase();
                          return token.name.toLowerCase().includes(searchLower) || 
                                token.symbol.toLowerCase().includes(searchLower);
                        }).sort((a, b) => {
                          // If search term is empty, maintain original order
                          if (!searchTerm) return 0;
                          
                          const searchLower = searchTerm.toLowerCase();
                          const aNameLower = a.name.toLowerCase();
                          const bNameLower = b.name.toLowerCase();
                          const aSymbolLower = a.symbol.toLowerCase();
                          const bSymbolLower = b.symbol.toLowerCase();
                          
                          // Check for exact matches in name or symbol (case insensitive)
                          const aExactNameMatch = aNameLower === searchLower;
                          const bExactNameMatch = bNameLower === searchLower;
                          const aExactSymbolMatch = aSymbolLower === searchLower;
                          const bExactSymbolMatch = bSymbolLower === searchLower;
                          
                          // Check for starts with matches
                          const aStartsWithName = aNameLower.startsWith(searchLower);
                          const bStartsWithName = bNameLower.startsWith(searchLower);
                          const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                          const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                          
                          // Prioritize exact matches, then starts with matches, then includes matches
                          if (aExactNameMatch && !bExactNameMatch) return -1;
                          if (!aExactNameMatch && bExactNameMatch) return 1;
                          if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                          if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                          
                          // Next priority: starts with matches
                          if (aStartsWithName && !bStartsWithName) return -1;
                          if (!aStartsWithName && bStartsWithName) return 1;
                          if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                          if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                          
                          // If both have the same match type, sort alphabetically
                          return aNameLower.localeCompare(bNameLower);
                        });
                        
                        const totalPages = Math.ceil(filteredTokens.length / tokensPerPage);
                        const maxVisiblePages = 5; // Maximum number of page buttons to show
                        
                        let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
                        let endPage = startPage + maxVisiblePages - 1;
                        
                        if (endPage > totalPages) {
                          endPage = totalPages;
                          startPage = Math.max(endPage - maxVisiblePages + 1, 1);
                        }
                        
                        const pages = [];
                        
                        // Always show first page
                        if (startPage > 1) {
                          pages.push(
                            <button
                              key={1}
                              onClick={() => setCurrentPage(1)}
                              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                currentPage === 1
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card hover:bg-accent"
                              }`}
                            >
                              1
                            </button>
                          );
                          
                          // Show ellipsis if there's a gap
                          if (startPage > 2) {
                            pages.push(
                              <span key="ellipsis1" className="px-1">...</span>
                            );
                          }
                        }
                        
                        // Show page numbers
                        for (let i = startPage; i <= endPage; i++) {
                          if (i !== 1 && i !== totalPages) { // Skip first and last page as they're handled separately
                            pages.push(
                              <button
                                key={i}
                                onClick={() => setCurrentPage(i)}
                                className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                  currentPage === i
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-card hover:bg-accent"
                                }`}
                              >
                                {i}
                              </button>
                            );
                          }
                        }
                        
                        // Always show last page
                        if (endPage < totalPages) {
                          // Show ellipsis if there's a gap
                          if (endPage < totalPages - 1) {
                            pages.push(
                              <span key="ellipsis2" className="px-1">...</span>
                            );
                          }
                          
                          pages.push(
                            <button
                              key={totalPages}
                              onClick={() => setCurrentPage(totalPages)}
                              className={`w-8 h-8 rounded-md flex items-center justify-center ${
                                currentPage === totalPages
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card hover:bg-accent"
                              }`}
                            >
                              {totalPages}
                            </button>
                          );
                        }
                        
                        return pages;
                      })()}
                      
                      {/* Next button */}
                      <button
                        onClick={() => {
                          const filteredTokens = tokens.filter(token => {
                            const searchLower = searchTerm.toLowerCase();
                            return token.name.toLowerCase().includes(searchLower) || 
                                  token.symbol.toLowerCase().includes(searchLower);
                          }).sort((a, b) => {
                            // If search term is empty, maintain original order
                            if (!searchTerm) return 0;
                            
                            const searchLower = searchTerm.toLowerCase();
                            const aNameLower = a.name.toLowerCase();
                            const bNameLower = b.name.toLowerCase();
                            const aSymbolLower = a.symbol.toLowerCase();
                            const bSymbolLower = b.symbol.toLowerCase();
                            
                            // Check for exact matches in name or symbol (case insensitive)
                            const aExactNameMatch = aNameLower === searchLower;
                            const bExactNameMatch = bNameLower === searchLower;
                            const aExactSymbolMatch = aSymbolLower === searchLower;
                            const bExactSymbolMatch = bSymbolLower === searchLower;
                            
                            // Check for starts with matches
                            const aStartsWithName = aNameLower.startsWith(searchLower);
                            const bStartsWithName = bNameLower.startsWith(searchLower);
                            const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                            const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                            
                            // Prioritize exact matches, then starts with matches, then includes matches
                            if (aExactNameMatch && !bExactNameMatch) return -1;
                            if (!aExactNameMatch && bExactNameMatch) return 1;
                            if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                            if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                            
                            // Next priority: starts with matches
                            if (aStartsWithName && !bStartsWithName) return -1;
                            if (!aStartsWithName && bStartsWithName) return 1;
                            if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                            if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                            
                            // If both have the same match type, sort alphabetically
                            return aNameLower.localeCompare(bNameLower);
                          });
                          const totalPages = Math.ceil(filteredTokens.length / tokensPerPage);
                          setCurrentPage(prev => Math.min(prev + 1, totalPages));
                        }}
                        disabled={currentPage === Math.ceil(tokens.filter(token => {
                          const searchLower = searchTerm.toLowerCase();
                          return token.name.toLowerCase().includes(searchLower) || 
                                token.symbol.toLowerCase().includes(searchLower);
                        }).sort((a, b) => {
                          // If search term is empty, maintain original order
                          if (!searchTerm) return 0;
                          
                          const searchLower = searchTerm.toLowerCase();
                          const aNameLower = a.name.toLowerCase();
                          const bNameLower = b.name.toLowerCase();
                          const aSymbolLower = a.symbol.toLowerCase();
                          const bSymbolLower = b.symbol.toLowerCase();
                          
                          // Check for exact matches in name or symbol (case insensitive)
                          const aExactNameMatch = aNameLower === searchLower;
                          const bExactNameMatch = bNameLower === searchLower;
                          const aExactSymbolMatch = aSymbolLower === searchLower;
                          const bExactSymbolMatch = bSymbolLower === searchLower;
                          
                          // Check for starts with matches
                          const aStartsWithName = aNameLower.startsWith(searchLower);
                          const bStartsWithName = bNameLower.startsWith(searchLower);
                          const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                          const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                          
                          // Prioritize exact matches, then starts with matches, then includes matches
                          if (aExactNameMatch && !bExactNameMatch) return -1;
                          if (!aExactNameMatch && bExactNameMatch) return 1;
                          if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                          if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                          
                          // Next priority: starts with matches
                          if (aStartsWithName && !bStartsWithName) return -1;
                          if (!aStartsWithName && bStartsWithName) return 1;
                          if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                          if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                          
                          // If both have the same match type, sort alphabetically
                          return aNameLower.localeCompare(bNameLower);
                        }).length / tokensPerPage)}
                        className={`px-2 py-1 rounded-md flex items-center justify-center ${
                          currentPage === Math.ceil(tokens.filter(token => {
                            const searchLower = searchTerm.toLowerCase();
                            return token.name.toLowerCase().includes(searchLower) || 
                                  token.symbol.toLowerCase().includes(searchLower);
                          }).sort((a, b) => {
                            // If search term is empty, maintain original order
                            if (!searchTerm) return 0;
                            
                            const searchLower = searchTerm.toLowerCase();
                            const aNameLower = a.name.toLowerCase();
                            const bNameLower = b.name.toLowerCase();
                            const aSymbolLower = a.symbol.toLowerCase();
                            const bSymbolLower = b.symbol.toLowerCase();
                            
                            // Check for exact matches in name or symbol (case insensitive)
                            const aExactNameMatch = aNameLower === searchLower;
                            const bExactNameMatch = bNameLower === searchLower;
                            const aExactSymbolMatch = aSymbolLower === searchLower;
                            const bExactSymbolMatch = bSymbolLower === searchLower;
                            
                            // Check for starts with matches
                            const aStartsWithName = aNameLower.startsWith(searchLower);
                            const bStartsWithName = bNameLower.startsWith(searchLower);
                            const aStartsWithSymbol = aSymbolLower.startsWith(searchLower);
                            const bStartsWithSymbol = bSymbolLower.startsWith(searchLower);
                            
                            // Prioritize exact matches, then starts with matches, then includes matches
                            if (aExactNameMatch && !bExactNameMatch) return -1;
                            if (!aExactNameMatch && bExactNameMatch) return 1;
                            if (aExactSymbolMatch && !bExactSymbolMatch) return -1;
                            if (!aExactSymbolMatch && bExactSymbolMatch) return 1;
                            
                            // Next priority: starts with matches
                            if (aStartsWithName && !bStartsWithName) return -1;
                            if (!aStartsWithName && bStartsWithName) return 1;
                            if (aStartsWithSymbol && !bStartsWithSymbol) return -1;
                            if (!aStartsWithSymbol && bStartsWithSymbol) return 1;
                            
                            // If both have the same match type, sort alphabetically
                            return aNameLower.localeCompare(bNameLower);
                          }).length / tokensPerPage)
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-card hover:bg-accent"
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {step === 2 && (
        <div className="mt-6 flex justify-between">
          <Button
            onClick={() => setStep(1)}
            variant="outline"
            className="px-6 py-2"
          >
            Back
          </Button>
          <Button
            onClick={() => selectedTokens.length > 0 ? setStep(3) : null}
            disabled={selectedTokens.length === 0}
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-6 py-2 font-medium shadow-md transition-all duration-200 hover:shadow-lg flex items-center gap-2"
          >
            Next
          </Button>
        </div>
      )}
      
      {step === 3 && (
        <div className="mt-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Name Your Team</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Give your team a unique name to stand out in the leaderboard
              </p>
              <input
                type="text"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full p-3 rounded-md border bg-background focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Selected Tokens</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTokens.map((tokenId) => {
                    const token = tokens.find(t => t.id === tokenId);
                    return token ? (
                      <div key={token.id} className="bg-accent/50 rounded-full px-3 py-1 text-xs flex items-center">
                        {token.symbol}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-6">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                className="px-6 py-2"
              >
                Back
              </Button>
              <Button
                onClick={handleCreateTeam}
                disabled={isCreating}
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
          </div>
        </div>
      )}
    </div>
  );
};
