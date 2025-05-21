"use client";

import { Transaction } from "@mysten/sui/transactions";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "@/lib/config";
import { useState } from "react";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export function CreateVault({
  onCreated,
  disabled,
  buttonText = "Create Vault",
}: {
  onCreated: (vaultId: string, ownerCapId: string) => void;
  disabled?: boolean;
  buttonText?: string;
}) {
  const vaultPackageId = useNetworkVariable("vaultPackageId");
  // Fallback to the devnet package ID if the network variable is not available
  const packageId = vaultPackageId || "0x2d7188ff8c7441f8fcd8cf9b366c510ce7d26adf05d31715de10d710cfb3821b";
  const suiClient = useSuiClient();
  const [showDialog, setShowDialog] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [transactionError, setTransactionError] = useState<string | null>(null);
  const [transactionDigest, setTransactionDigest] = useState<string | null>(null);

  const {
    mutate: signAndExecute,
    isPending,
  } = useSignAndExecuteTransaction();

  function createVault() {
    // Check if we have a valid package ID
    if (!packageId) {
      setShowDialog(true);
      setTransactionStatus("error");
      setTransactionError("Invalid vault package ID. Please check your network configuration.");
      return;
    }
    
    setShowDialog(true);
    setTransactionStatus("pending");
    setTransactionError(null);
    setTransactionDigest(null);

    const tx = new Transaction();

    console.log("Using vault package ID:", packageId);
    
    // Call the create function from the vault module
    tx.moveCall({
      arguments: [],
      target: `${packageId}::simple_vault::create`,
      typeArguments: ["0x2::sui::SUI"], // Using SUI as the coin type
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          setTransactionDigest(digest);
          try {
            // Wait for transaction to complete
            const { effects } = await suiClient.waitForTransaction({
              digest: digest,
              options: {
                showEffects: true,
                showEvents: true,
              },
            });

            // Find the created objects
            const createdObjects = effects?.created || [];
            
            // Find the shared object (Vault) and the owned object (VaultOwnerCap)
            let vaultId: string | null = null;
            let ownerCapId: string | null = null;
            
            for (const obj of createdObjects) {
              const ownerType = typeof obj.owner === 'string' ? obj.owner : Object.keys(obj.owner || {})[0];
              
              // Check for shared object (Vault)
              if (ownerType === 'Shared') {
                // This is the Vault (shared object)
                vaultId = obj.reference.objectId;
              } 
              // Check for owned object (VaultOwnerCap)
              else if (ownerType === 'AddressOwner') {
                // This is the VaultOwnerCap (owned by the user)
                ownerCapId = obj.reference.objectId;
              }
            }

            if (vaultId && ownerCapId) {
              setTransactionStatus("success");
              onCreated(vaultId, ownerCapId);
            } else {
              setTransactionStatus("error");
              setTransactionError("Failed to identify created objects");
            }
          } catch (error) {
            console.error("Error processing transaction:", error);
            setTransactionStatus("error");
            setTransactionError(error instanceof Error ? error.message : String(error));
          }
        },
        onError: (error) => {
          console.error("Transaction error:", error);
          setTransactionStatus("error");
          setTransactionError(error instanceof Error ? error.message : String(error));
        },
      }
    );
  }

  return (
    <>
      <Button
        onClick={createVault}
        disabled={disabled || isPending}
        className="gap-2 w-full md:w-auto"
        size="lg"
      >
        {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {buttonText}
      </Button>

      {showDialog && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-medium mb-4">Creating Vault</h3>
              
              {transactionStatus === "pending" && (
                <div className="flex flex-col items-center justify-center py-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                  <p>Processing transaction...</p>
                  {transactionDigest && (
                    <p className="text-sm text-gray-500 mt-2 break-all">
                      Transaction ID: {transactionDigest}
                    </p>
                  )}
                </div>
              )}

              {transactionStatus === "success" && (
                <div className="flex flex-col items-center justify-center py-4">
                  <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
                  <p>Vault created successfully!</p>
                  {transactionDigest && (
                    <p className="text-sm text-gray-500 mt-2 break-all">
                      Transaction ID: {transactionDigest}
                    </p>
                  )}
                </div>
              )}

              {transactionStatus === "error" && (
                <div className="flex flex-col items-center justify-center py-4">
                  <XCircle className="h-8 w-8 text-red-500 mb-2" />
                  <p>Error creating vault</p>
                  {transactionError && (
                    <p className="text-sm text-red-500 mt-2 break-all">
                      {transactionError}
                    </p>
                  )}
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => {
                    if (transactionStatus === "success") {
                      setShowDialog(false);
                    } else if (transactionStatus === "error") {
                      setTransactionStatus("idle");
                      setShowDialog(false);
                    }
                  }}
                  disabled={transactionStatus === "pending"}
                >
                  {transactionStatus === "success" ? "Continue" : "Close"}
                </Button>
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
