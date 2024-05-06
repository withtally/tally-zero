"use client";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, configureChains, createClient } from "wagmi";
import { env } from "../env";

import { chains } from "@config/chains";

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  const projectId = env.NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID;
  if (projectId === undefined) {
    throw new Error("NEXT_PUBLIC_WEB3STORAGE_PROJECT_ID is undefined");
  }

  const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    provider,
  });

  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>{children}</WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
