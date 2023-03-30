import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from "@chakra-ui/react";
import "./theme/global/styles.css";
import theme from "./theme";
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
import { ConnectForm } from "./components/form";

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
    <Router>
      <ChakraProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <Box textAlign="center" fontSize="xl" bg={"gray.50"}>
            <Grid minH="100vh" p={3} alignItems={"start"}>
              <Header />
              <Home />
            </Grid>
          </Box>
        </WagmiConfig>
        <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      </ChakraProvider>
    </Router>
  );
};
