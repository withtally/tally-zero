import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useContractEvent, useProvider } from "wagmi";
import {
  useDeploymentBlock,
  UseDeploymentBlockResult,
} from "../hooks/useDeploymentBlock";

import GovernorABI from "../utils/abis/OzGovernor_ABI.json";
import TokenABI from "../utils/abis/ERC20Votes_ABI.json";
import { useSearchProposals } from "../hooks/useSearchProposals";
import { useParseProposals } from "../hooks/useParseProposals";
import { ProposalTable } from "./proposalTable";
import { Container, Flex, VStack } from "@chakra-ui/react";
import { SearchStatus } from "./searchStatus";

export type ContractAddress = `0x${string}`;
interface GovernorState {
  address: `0x${string}` | undefined;
  contract: any;
  deploymentBlock: number | null;
  name: string | undefined;
}

interface TokenState {
  address: `0x${string}` | undefined;
  contract: any;
  deploymentBlock: number | null;
}

interface Proposal {
  id: number;
  index: number;
  proposer: string;
  eta: number;
  startBlock: number;
  endBlock: number;
  forVotes: number;
  againstVotes: number;
  canceled: boolean;
  executed: boolean;
  actions: any[];
}

type ProposalState = Proposal[];

interface State {
  system: {
    currentDeployBlock: number | undefined;
  };
  governor: GovernorState;
  token: TokenState;
  proposals: ProposalState;
}

const initialState: State = {
  system: {
    currentDeployBlock: 0,
  },
  governor: {
    address: undefined,
    contract: null,
    deploymentBlock: null,
    name: undefined,
  },
  token: {
    address: undefined,
    contract: null,
    deploymentBlock: null,
  },
  proposals: [],
};

interface SearchProps {
  contractAddress: ContractAddress | undefined;
  network: string | undefined;
}

export const Search: React.FC<SearchProps> = ({ contractAddress, network }) => {
  const provider = useProvider();
  const [subscribe, setSubscribe] = useState<boolean>(false);

  const [state, setState] = useState<State>(initialState);

  // search for deployment block of governor
  const {
    blockNumber,
    success,
    error,
    currentSearchBlock,
    percentageComplete,
    isSearching,
  } = useDeploymentBlock(provider, contractAddress);
  console.log(
    "🚀 ~ file: search.tsx:94 :",
    blockNumber,
    success,
    error,
    currentSearchBlock,
    percentageComplete,
    isSearching
  );

  // When governor is found, create a contract instance and set it on state
  useEffect(() => {
    if (
      !state.governor.address &&
      !state.governor.contract &&
      success &&
      blockNumber
    ) {
      const governorContract = new ethers.Contract(
        contractAddress as string,
        GovernorABI,
        provider
      );

      setState({
        ...state,
        system: {
          ...state.system,
          currentDeployBlock: currentSearchBlock
            ? currentSearchBlock
            : undefined,
        },
        governor: {
          address: contractAddress,
          contract: governorContract,
          deploymentBlock: blockNumber,
          name: undefined,
        },
      });
      //   ....
    }
  }, [success, error, percentageComplete]);

  // When governor is found, get state info
  useEffect(() => {
    const getTokenAddress = async () => {
      let tokenAddress;

      try {
        tokenAddress = await state.governor.contract.token();
      } catch (error) {
        console.log(
          "Get Token Address Error: ",
          JSON.stringify(error, null, 2)
        );
      }

      let governorName;
      try {
        governorName = await state.governor.contract.name();
      } catch (error) {
        console.log(
          "Get Governor Name Error: ",
          JSON.stringify(error, null, 2)
        );
      }

      setState({
        ...state,
        governor: { ...state.governor, name: governorName },
        token: {
          address: tokenAddress,
          contract: new ethers.Contract(tokenAddress, TokenABI, provider),
          deploymentBlock: null,
        },
      });
    };

    if (!state.token.address && state.governor.contract) {
      getTokenAddress();
    }
  }, [state.governor]);

  // When Governor, find Proposals
  const { proposals, percentage } = useSearchProposals(
    provider,
    state.governor.address,
    state.governor.deploymentBlock,
    true
  );

  // When Proposals, parse them into a more readable format
  const parsedProposals = useParseProposals(
    provider,
    state.governor.address,
    proposals,
    true
  );

  const activeProposals = parsedProposals.filter(
    (proposal) => proposal.state === 1
  );

  const pendingProposals = parsedProposals.filter(
    (proposal) => proposal.state === 0
  );

  const notActive = parsedProposals.filter(
    (proposal) => proposal.state !== 1 && proposal.state !== 0
  );

  if (!success && !isSearching && parsedProposals.length === 0)
    return (
      <Container>
        <Flex justifyContent="center" alignItems="center" m={6}>
          <h1>No Proposals Found.</h1>
        </Flex>
      </Container>
    );

  return (
    <VStack alignItems={"flex-start"}>
      <SearchStatus
        header="Governor Search Results"
        percentageComplete={percentageComplete}
        currentBlock={currentSearchBlock}
      />
      <ProposalTable
        header={"Active Proposals"}
        proposals={activeProposals}
        percentageComplete={state.system.currentDeployBlock}
        governorAddress={contractAddress}
      />
      <ProposalTable
        header={"Pending Proposals"}
        proposals={pendingProposals}
        percentageComplete={state.system.currentDeployBlock}
        governorAddress={contractAddress}
      />
      <ProposalTable
        header={"Not Active Proposals"}
        proposals={notActive}
        percentageComplete={state.system.currentDeployBlock}
        governorAddress={contractAddress}
      />
    </VStack>
  );
};
