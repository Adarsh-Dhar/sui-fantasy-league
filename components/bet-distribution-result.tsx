"use client";

import { useState, useEffect } from "react";
import { calculateMatchDistribution } from "@/utils/bet-distribution";
import { useWallet } from "@suiet/wallet-kit";

interface BetDistributionResultProps {
  match: any; // Replace with your Match type
  potAmount?: number; // Default is 2 SUI (1 SUI from each player)
}

export const BetDistributionResult = ({ 
  match, 
  potAmount = 2 
}: BetDistributionResultProps) => {
  const { address } = useWallet();
  const [distribution, setDistribution] = useState<any>(null);
  const [userIsWinner, setUserIsWinner] = useState<boolean | null>(null);
  const [userShare, setUserShare] = useState<number | null>(null);

  useEffect(() => {
    if (match && match.status === 'COMPLETED') {
      const result = calculateMatchDistribution(match, potAmount);
      setDistribution(result);
      
      // Determine if current user is winner or loser
      if (result && address) {
        const isWinner = result.winnerAddress === address;
        const isLoser = result.loserAddress === address;
        
        setUserIsWinner(isWinner);
        setUserShare(isWinner ? result.winnerShare : (isLoser ? result.loserShare : null));
      }
    }
  }, [match, potAmount, address]);

  if (!distribution || match.status !== 'COMPLETED') {
    return null;
  }

  return (
    <div className="space-y-4 p-4 bg-background rounded-lg border shadow-sm">
      <h3 className="text-lg font-semibold">Bet Distribution Results</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-lg ${userIsWinner === true ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'} border`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Winner</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              +{distribution.winnerGain.toFixed(2)}%
            </span>
          </div>
          <div className="text-lg font-bold">{distribution.winnerShare.toFixed(4)} SUI</div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground truncate">
              {distribution.winnerAddress}
            </span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              +{(distribution.winnerShare - 1).toFixed(4)} SUI profit
            </span>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg ${userIsWinner === false ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-200'} border`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Loser</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
              +{distribution.loserGain.toFixed(2)}%
            </span>
          </div>
          <div className="text-lg font-bold">{distribution.loserShare.toFixed(4)} SUI</div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-muted-foreground truncate">
              {distribution.loserAddress}
            </span>
            <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
              -{(1 - distribution.loserShare).toFixed(4)} SUI loss
            </span>
          </div>
        </div>
      </div>
      
      {userShare !== null && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">Your Results</div>
            {userIsWinner ? (
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                WINNER
              </span>
            ) : (
              <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                BETTER LUCK NEXT TIME
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div>
              <div className="text-sm text-muted-foreground">Your share:</div>
              <div className="text-xl font-bold">{userShare.toFixed(4)} SUI</div>
            </div>
            
            <div className={`px-4 py-2 rounded-lg ${userIsWinner ? 'bg-emerald-100' : 'bg-red-100'}`}>
              <div className="text-sm text-muted-foreground">{userIsWinner ? 'Profit' : 'Loss'}:</div>
              <div className="text-xl font-bold flex items-center">
                {userIsWinner ? (
                  <>
                    <span className="text-emerald-600 mr-1">+</span>
                    <span className="text-emerald-600">{(userShare - 1).toFixed(4)} SUI</span>
                  </>
                ) : (
                  <>
                    <span className="text-red-600 mr-1">-</span>
                    <span className="text-red-600">{(1 - userShare).toFixed(4)} SUI</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-sm mt-4 p-2 bg-white/50 rounded border border-primary/10">
            {userIsWinner 
              ? `Congratulations! You've won this match with a performance of +${distribution.winnerGain.toFixed(2)}%.`
              : `You've lost this match with a performance of +${distribution.loserGain.toFixed(2)}%.`}
          </div>
        </div>
      )}
    </div>
  );
};
