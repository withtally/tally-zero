import React, { useState, useEffect } from "react";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, optimism, polygon } from "wagmi/chains";
import { Logo } from "./Logo";
import { Header } from "./components/header";
import { Search } from "./components/search";
import { Home } from "./pages/home";

interface ContractParams {
  contractAddress?: string;
  networkId?: string;
}

const chains = [arbitrum, mainnet, polygon, optimism];
const projectId = "5f53b0299462693daec37a2c802d477a";

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export const App = () => {

  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <Header />
            <VStack spacing={8}>
              <Logo h="40vmin" pointerEvents="none" />
              <Text>
                Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
              </Text>
              <Link
                color="teal.500"
                href="https://chakra-ui.com"
                fontSize="2xl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn Chakra
              </Link>
              <Home />
              <Search />
            </VStack>
          </Grid>
        </Box>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </ChakraProvider>
  );
};
