import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { Button } from '@/components/ui/button';
import { VAULT_PACKAGE_ID } from './constants';

export function CreateVault(props: { onCreated: (id: string) => void }) {
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

  return (
    <div>
      <Button
        onClick={() => {
          create();
        }}
      >
        Create Vault
      </Button>
    </div>
  );

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
            props.onCreated(objectId);
          }
        },
        onError: (error) => {
          console.error('Error creating vault:', error);
        },
      },
      
    );
  }
}