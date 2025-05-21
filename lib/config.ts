import { getFullnodeUrl } from "@mysten/sui/client";
import {
  DEVNET_VAULT_PACKAGE_ID,
  TESTNET_VAULT_PACKAGE_ID,
  MAINNET_VAULT_PACKAGE_ID,
} from "./constants";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
  	devnet: {
  		url: getFullnodeUrl("devnet"),
  		variables: {
  			vaultPackageId: DEVNET_VAULT_PACKAGE_ID,
  		},
  	},
  	testnet: {
  		url: getFullnodeUrl("testnet"),
  		variables: {
            vaultPackageId: TESTNET_VAULT_PACKAGE_ID,
  		},
  	},
  	mainnet: {
  		url: getFullnodeUrl("mainnet"),
  		variables: {
            vaultPackageId: MAINNET_VAULT_PACKAGE_ID,
  		},
  	},
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };