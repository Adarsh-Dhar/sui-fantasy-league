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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNetworkVariable } from "./config";
import { useState } from "react";

export function Withdraw({ id }: { id: string }) {
  const [amount, setAmount] = useState<string>("");
  const vaultPackageId = useNetworkVariable("vaultPackageId");
  const suiClient = useSuiClient();
  const currentAccount = useCurrentAccount();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();
  
  // Get the vault data
  const { data: vaultData, isPending: isVaultPending, error: vaultError, refetch: refetchVault } = useSuiClientQuery("getObject", {
    id,
    options: {
      showContent: true,
      showOwner: true,
    },
  });

  // Get the user's owned objects to find the VaultOwnerCap
  const { data: ownedObjects, isPending: isCapPending, error: capError } = useSuiClientQuery("getOwnedObjects", {
    owner: currentAccount?.address || "",
    options: {
      showContent: true,
    },
    filter: {
      StructType: `${vaultPackageId}::simple_vault::VaultOwnerCap`,
    },
  }, {
    enabled: !!currentAccount,
  });

  const executeWithdraw = async () => {
    if (!amount || !currentAccount || !ownedObjects?.data) return;
    
    // Find the owner cap for this vault
    const ownerCap = ownedObjects.data.find(obj => {
      if (obj.data?.content?.dataType !== "moveObject") return false;
      const fields = obj.data.content.fields as any;
      return fields.vault_id === id;
    });
    
    if (!ownerCap?.data?.objectId) {
      console.error("You don't have the owner capability for this vault");
      return;
    }
    
    const tx = new Transaction();
    
    // Call the withdraw function from the vault contract
    tx.moveCall({
      arguments: [tx.object(id), tx.object(ownerCap.data.objectId), tx.pure.u64(Number(amount))],
      target: `${vaultPackageId}::simple_vault::withdraw`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async () => {
          await refetchVault();
          setAmount("");
        },
      },
    );
  };

  if (isVaultPending || isCapPending) return <p className="text-sm">Loading...</p>;

  if (vaultError) return <p className="text-sm text-destructive">Error: {vaultError.message}</p>;
  if (capError) return <p className="text-sm text-destructive">Error: {capError.message}</p>;

  if (!vaultData?.data) return <p className="text-sm">Vault not found</p>;

  const vault = getVaultFields(vaultData.data);
  const isVaultOwner = vault?.owner === currentAccount?.address;
  const hasOwnerCap = ownedObjects?.data?.some(obj => {
    if (obj.data?.content?.dataType !== "moveObject") return false;
    const fields = obj.data.content.fields as any;
    return fields.vault_id === id;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw from Vault {id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">Balance: {vault?.balance ?? 0}</p>
        <div className="flex flex-row gap-2 items-center">
          <Input 
            placeholder="Amount to withdraw" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full"
            disabled={!hasOwnerCap}
          />
          <Button 
            onClick={executeWithdraw}
            disabled={!hasOwnerCap}
          >
            Withdraw
          </Button>
        </div>
        {isVaultOwner && !hasOwnerCap && (
          <p className="text-xs text-destructive">You are the vault owner but don't have the owner capability</p>
        )}
        {!isVaultOwner && (
          <p className="text-xs text-muted-foreground">Only the vault owner can withdraw funds</p>
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