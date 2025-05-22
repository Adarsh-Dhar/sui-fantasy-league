import { getFullnodeUrl } from "@mysten/sui/client";
import {
  VAULT_PACKAGE_ID,

} from "./constants";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    devnet: {
      url: getFullnodeUrl("devnet"),
      variables: {
        vaultPackageId: VAULT_PACKAGE_ID,
      },
    }
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };