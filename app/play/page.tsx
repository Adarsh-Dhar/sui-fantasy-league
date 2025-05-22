"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trophy, Users, Zap, Clock, Coins } from "lucide-react";
import { Team } from "@/lib/types";
import { CreateVault } from "@/lib/createVault";
import { VAULT_PACKAGE_ID } from '@/lib/constants';
import { Transaction } from '@mysten/sui/transactions';


export default function PlayPage() {
  const router = useRouter();
  const account = useCurrentAccount();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string>("");
  const [matchType, setMatchType] = useState<"RANDOM" | "FRIEND">("RANDOM");
  const [matchDuration, setMatchDuration] = useState<string>("1m");
  const [matchPrice, setMatchPrice] = useState<string>("1");
  const [isLoading, setIsLoading] = useState(false);
  const [vaultId, setVaultId] = useState<string | null>(null);
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      await suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          // Raw effects are required so the effects can be reported back to the wallet
          showRawEffects: true,
          showEffects: true,
        },
      }),
  });

  function create() {
      const tx = new Transaction();
  
      tx.moveCall({
        target: `${VAULT_PACKAGE_ID}::simple_vault::create`,
        typeArguments: ['0x2::sui::SUI'],
        arguments: []
      });
  
      signAndExecute(
        {
          transaction: tx,
          chain: 'sui:devnet',
        },
        {
          onSuccess: (result) => {
            const objectId = result.effects?.created?.[0]?.reference?.objectId;
            console.log('Created object ID:', objectId);
            if (objectId) {
              console.log('Object created successfully:', objectId);
              setVaultId(objectId);
              return objectId;
            }
          },
          onError: (error) => {
            console.error('Error creating vault:', error);
          },
        },
        
      );
    }

  useEffect(() => {
    const fetchTeams = async () => {
      if (!account?.address) return;
      
      try {
        const response = await fetch(`/api/game/teams?address=${account.address}`);
        if (response.ok) {
          const data = await response.json();
          setTeams(data.teams);
          
          // Auto-select the first team if available
          if (data.teams.length > 0 && !selectedTeamId) {
            setSelectedTeamId(data.teams[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchTeams();
  }, [account?.address, selectedTeamId]);

  const handleCreateMatch = async () => {
    if (!selectedTeamId) return;
    
    setIsLoading(true);
    
    try {
      // First, ensure we have a vault ID
      let currentVaultId = vaultId;
      
      if (!currentVaultId) {
        console.log('No vault ID found, creating a new vault...');
        const tx = new Transaction();
        
        tx.moveCall({
          target: `${VAULT_PACKAGE_ID}::simple_vault::create`,
          typeArguments: ['0x2::sui::SUI'],
          arguments: []
        });
        
        try {
          // Use a more direct approach with async/await
          const txResult = await new Promise<any>((resolve, reject) => {
            signAndExecute(
              {
                transaction: tx,
                chain: 'sui:devnet',
              },
              {
                onSuccess: (result) => resolve(result),
                onError: (error) => reject(error),
              }
            );
          });
          
          // Extract the object ID from the transaction result
          const newVaultId = txResult.effects?.created?.[0]?.reference?.objectId;
          console.log('Created vault ID:', newVaultId);
          
          if (!newVaultId) {
            throw new Error('No vault ID returned from transaction');
          }
          
          // Set the vault ID in state
          setVaultId(newVaultId);
          currentVaultId = newVaultId;
          
          // Wait a moment for the blockchain transaction to settle
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error('Error creating vault:', error);
          // Type assertion to handle the error message safely
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          throw new Error(`Failed to create vault: ${errorMessage}`);
        }
      }
      
      // Double-check that we have a vault ID before proceeding
      if (!currentVaultId) {
        throw new Error('Failed to create vault: No vault ID available');
      }
      
      console.log('Using vault ID for match creation:', currentVaultId);
      
      const response = await fetch("/api/game/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamId: selectedTeamId,
          type: matchType,
          address: account?.address,
          duration: matchDuration,
          price: matchPrice, 
          vaultId: currentVaultId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to the match page
        router.push(`/matches/${data.match.id}`);
      } else {
        const errorData = await response.json();
        console.error("Error creating match:", errorData);
        // Log more detailed error information if available
        if (errorData.details) {
          console.error("Error details:", errorData.details);
        }
      }
    } catch (error) {
      console.error("Error creating match:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!account?.address) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your SUI wallet to play the fantasy league game.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Play Fantasy League</h1>
      
      <div className="max-w-3xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Select Your Team
            </CardTitle>
            <CardDescription>
              Choose the team you want to play with
            </CardDescription>
          </CardHeader>
          <CardContent>
            {teams.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground mb-4">
                  You don't have any teams yet. Create a team to start playing.
                </p>
                <Button
                  onClick={() => router.push("/teams/create")}
                  className="gap-2"
                >
                  <Trophy className="h-4 w-4" />
                  Create Team
                </Button>
              </div>
            ) : (
              <Select
                value={selectedTeamId}
                onValueChange={(value) => setSelectedTeamId(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a team" />
                </SelectTrigger>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Choose Match Type
            </CardTitle>
            <CardDescription>
              Play with a random opponent or challenge a friend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={matchType}
              onValueChange={(value) => setMatchType(value as "RANDOM" | "FRIEND")}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`border rounded-lg p-4 ${matchType === "RANDOM" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="RANDOM" id="random" className="mt-1" />
                  <div>
                    <Label htmlFor="random" className="text-base font-medium">
                      Random Opponent
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Match with a random player from the community
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${matchType === "FRIEND" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="FRIEND" id="friend" className="mt-1" />
                  <div>
                    <Label htmlFor="friend" className="text-base font-medium">
                      Challenge a Friend
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create a private match and share the link with a friend
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Match Duration
            </CardTitle>
            <CardDescription>
              Select how long the match will last
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={matchDuration}
              onValueChange={(value) => setMatchDuration(value)}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className={`border rounded-lg p-4 ${matchDuration === "1m" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="1m" id="1m" className="mt-1" />
                  <div>
                    <Label htmlFor="1m" className="text-base font-medium">
                      1 Minute
                    </Label>
                  </div>
                </div>
              </div>
              
              <div className={`border rounded-lg p-4 ${matchDuration === "5m" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="5m" id="5m" className="mt-1" />
                  <div>
                    <Label htmlFor="5m" className="text-base font-medium">
                      5 Minutes
                    </Label>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-4 ${matchDuration === "1h" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="1h" id="1h" className="mt-1" />
                  <div>
                    <Label htmlFor="1h" className="text-base font-medium">
                      1 Hour
                    </Label>
                  </div>
                </div>
              </div>

              <div className={`border rounded-lg p-4 ${matchDuration === "12h" ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="12h" id="12h" className="mt-1" />
                  <div>
                    <Label htmlFor="12h" className="text-base font-medium">
                      12 Hours
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              Match Price
            </CardTitle>
            <CardDescription>
              Set the price in SUI tokens (natural numbers only)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Input
                type="number"
                min="1"
                step="1"
                value={matchPrice}
                onChange={(e) => {
                  // Ensure only natural numbers (positive integers)
                  const value = parseInt(e.target.value);
                  if (!isNaN(value) && value > 0) {
                    setMatchPrice(value.toString());
                  } else if (e.target.value === "") {
                    setMatchPrice("");
                  }
                }}
                className="w-full max-w-xs"
                placeholder="Enter SUI amount"
              />
              <span className="font-medium">SUI</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardFooter className="flex justify-center pt-6">
            <Button
              onClick={handleCreateMatch}
              disabled={!selectedTeamId || isLoading}
              size="lg"
              className="gap-2 w-full md:w-auto"
            >
              <Zap className="h-5 w-5" />
              {isLoading ? "Creating Game..." : "Start Playing"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}