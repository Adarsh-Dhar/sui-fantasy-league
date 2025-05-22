import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import type { SuiObjectData } from "@mysten/sui/client";
import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useNetworkVariable } from "./config";
import { useState } from "react";

export function Deposit({ id }: { id: string }) {
  const [amount, setAmount] = useState<string>("");
  const vaultPackageId = useNetworkVariable("vaultPackageId");
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  const { data, isPending, error, refetch } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
      showOwner: true,
    },
  }); 

  const executeDeposit = async () => {
    if (!amount || !currentAccount) return;
    
    const tx = new Transaction();
    
    // Split coins from the gas object
    const coinToDeposit = tx.splitCoins(tx.gas, [tx.pure.u64(Number(amount))]);
    
    // Call the deposit function from the vault contract
    tx.moveCall({
      arguments: [tx.object(id), coinToDeposit],
      target: `${vaultPackageId}::simple_vault::deposit`,
      typeArguments: ['0x2::sui::SUI'],
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async () => {
          await refetch();
          setAmount("");
        },
      },
    );
  };

  if (isPending) return <p className="text-sm">Loading...</p>;

  if (error) return <p className="text-sm text-destructive">Error: {error.message}</p>;

  if (!data.data) return <p className="text-sm">Not found</p>;

  const vaultData = getVaultFields(data.data);
  const isVaultOwner = vaultData?.owner === currentAccount?.address;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vault {id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">Balance: {vaultData?.balance ?? 0}</p>
        <div className="flex flex-row gap-2 items-center">
          <Input 
            placeholder="Amount to deposit" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full"
          />
          <Button onClick={executeDeposit}>
            Deposit
          </Button>
        </div>
        {isVaultOwner && (
          <p className="text-xs text-muted-foreground">You are the vault owner</p>
        )}
      </CardContent>
    </Card>
  );
}

function getVaultFields(data: SuiObjectData) {
  if (data.content?.dataType !== "moveObject") {
    return null;
  }

  const fields = data.content.fields as any;
  
  // The vault's balance field structure might be nested based on the Move representation
  return {
    balance: typeof fields.balance === 'object' ? 
      (fields.balance.fields?.value || 0) : 
      fields.balance,
    owner: fields.owner,
  };
}
