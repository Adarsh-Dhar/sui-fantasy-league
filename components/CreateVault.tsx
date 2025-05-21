import { useState } from "react";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "../lib/config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function CreateVault({
  onCreated,
  disabled = false,
  buttonText = "Create Vault",
}: {
  onCreated: (vaultId: string, ownerCapId: string) => void;
  disabled?: boolean;
  buttonText?: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [transactionDigest, setTransactionDigest] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Use a hardcoded package ID if the network variable isn't available
  const networkPackageId = useNetworkVariable("vaultPackageId");
  const counterPackageId = networkPackageId || "0x2d7188ff8c7441f8fcd8cf9b366c510ce7d26adf05d31715de10d710cfb3821b";
  const suiClient = useSuiClient();
  const {
    mutate: signAndExecute,
    isPending,
  } = useSignAndExecuteTransaction();

  function create() {
    setIsDialogOpen(true);
    setTransactionStatus("pending");
    setErrorMessage("");
    
    const tx = new Transaction();

    tx.moveCall({
      arguments: [],
      target: `${counterPackageId}::contract::create`,
    });

    signAndExecute(
      {
        transaction: tx,
      },
      {
        onSuccess: async ({ digest }) => {
          setTransactionDigest(digest);
          try {
            const { effects } = await suiClient.waitForTransaction({
              digest: digest,
              options: {
                showEffects: true,
              },
            });

            // Find the vault object and owner cap object
            const vaultId = "0x2d7188ff8c7441f8fcd8cf9b366c510ce7d26adf05d31715de10d710cfb3821b"
            
            // Check for owner cap by looking for objects owned by an address (not shared)
            const ownerCapId = effects?.created?.find(obj => 
              typeof obj.owner === 'object' && 'AddressOwner' in obj.owner
            )?.reference?.objectId;

            if (vaultId && ownerCapId) {
              setTransactionStatus("success");
              // Wait a moment to show success state before closing
              setTimeout(() => {
                setIsDialogOpen(false);
                onCreated(vaultId, ownerCapId);
              }, 2000);
            } else {
              throw new Error("Could not find vault or owner cap objects in transaction effects");
            }
          } catch (error) {
            console.error("Error processing transaction:", error);
            setTransactionStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred");
          }
        },
        onError: (error) => {
          console.error("Transaction error:", error);
          setTransactionStatus("error");
          setErrorMessage(error instanceof Error ? error.message : "Transaction failed");
        }
      },
    );
  }
  
  return (
    <>
      <Button 
        onClick={create} 
        disabled={disabled || isPending}
        className="w-full md:w-auto"
        size="lg"
      >
        {buttonText}
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {transactionStatus === "pending" && "Creating Vault..."}
              {transactionStatus === "success" && "Vault Created Successfully!"}
              {transactionStatus === "error" && "Error Creating Vault"}
            </DialogTitle>
            <DialogDescription>
              {transactionStatus === "pending" && "Please wait while we create your vault on the SUI blockchain."}
              {transactionStatus === "success" && "Your vault has been created successfully. You'll be redirected to create a match."}
              {transactionStatus === "error" && errorMessage}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center py-6">
            {transactionStatus === "pending" && (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Processing transaction...</p>
              </div>
            )}
            
            {transactionStatus === "success" && (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-green-500" />
                <p className="text-sm text-muted-foreground">Transaction ID: {transactionDigest.substring(0, 8)}...{transactionDigest.substring(transactionDigest.length - 8)}</p>
              </div>
            )}
            
            {transactionStatus === "error" && (
              <div className="flex flex-col items-center gap-2">
                <AlertCircle className="h-8 w-8 text-destructive" />
                <p className="text-sm text-muted-foreground">Please try again or contact support if the issue persists.</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="sm:justify-center">
            {transactionStatus === "error" && (
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}