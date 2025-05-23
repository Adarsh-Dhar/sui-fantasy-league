"use client";

import { Button } from "@/components/ui/button";
import { useCurrentAccount, useSignAndExecuteTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { toast } from 'sonner';
import { VAULT_PACKAGE_ID } from '@/lib/constants';

interface WithdrawButtonProps {
  vaultId: string;
  amount?: number;
  className?: string;
}

export function WithdrawButton({ vaultId, amount = 0.01, className }: WithdrawButtonProps) {
  const account = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  const handleWithdraw = async () => {
    if (!account?.address) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      const tx = new Transaction();
      
      // Convert amount to MIST (1 SUI = 1_000_000_000 MIST)
      const amountInMist = Math.floor(amount * 1_000_000_000);
      
      // Call the withdraw function from the vault contract
      const coin = tx.moveCall({
        arguments: [
          tx.object(vaultId),
          tx.pure.u64(amountInMist),
        ],
        target: `${VAULT_PACKAGE_ID}::simple_vault::withdraw`,
        typeArguments: ['0x2::sui::SUI'], 
      });

      tx.transferObjects([coin], account.address);

      signAndExecute(
        {
          transaction: tx,
          chain: 'sui:devnet',
        },
        {
          onSuccess: () => {
            toast.success(`Successfully withdrew ${amount} SUI`);
          },
          onError: (error) => {
            console.error('Error withdrawing:', error);
            toast.error('Failed to withdraw SUI');
          },
        },
      );
    } catch (error) {
      console.error('Error creating transaction:', error);
      toast.error('Failed to create withdrawal transaction');
    }
  };

  return (
    <Button 
      onClick={handleWithdraw}
      className={className}
      variant="default"
    >
      Withdraw {amount} SUI
    </Button>
  );
} 