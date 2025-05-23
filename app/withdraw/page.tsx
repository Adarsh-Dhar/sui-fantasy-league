"use client";

import { WithdrawButton } from "@/components/withdraw-button";

export default function WithdrawPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <div className="bg-card/80 backdrop-blur-sm border rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Withdraw SUI</h1>
        
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <p className="text-lg mb-4">
              Withdraw 0.01 SUI from the vault
            </p>
            <WithdrawButton 
              vaultId="0x8409df26d3930cccd9872a63ecbff3beb2d54600c25cd99867d572a9297e2527"
              amount={0.01}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 