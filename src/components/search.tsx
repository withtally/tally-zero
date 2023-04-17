import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useDeploymentBlock } from "../hooks/useDeploymentBlock";

import GovernorABI from "../utils/abis/OzGovernor_ABI.json";
import { useSearchProposals } from "../hooks/useSearchProposals";
import { useParseProposals } from "../hooks/useParseProposals";
import { ProposalTable } from "./proposalTable";
import { HStack, VStack } from "@chakra-ui/react";
import { SearchStatus } from "./searchStatus";
import { ConnectForm } from "./form";

interface ContractParams {
  contractAddress?: `0x${string}`;
  networkId?: string;
}

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

export const Search: React.FC = () => {
  const provider = useProvider();
  const [state, setState] = useState<State>(initialState);
  const [formContractParams, setFormContractParams] = useState<ContractParams>(
    {}
  );

  useEffect(() => {
    if (formContractParams.contractAddress && formContractParams.networkId) {
      setState((prevState) => ({
        ...prevState,
        governor: {
          ...prevState.governor,
          address: formContractParams.contractAddress,
        },
      }));
    }
  }, [formContractParams]);

  // search for deployment block of governor
  const {
    blockNumber,
    success,
    error,
    currentSearchBlock,
    percentageComplete,
  } = useDeploymentBlock(provider, state?.governor?.address);

  // When governor is found, create a contract instance and set it on state
  useEffect(() => {
    if (!state.governor.contract && success && blockNumber) {
      const governorContract = new ethers.Contract(
        state?.governor?.address as string,
        GovernorABI,
        provider
      );

      setState((prevState) => ({
        ...prevState,
        system: {
          ...prevState.system,
          currentDeployBlock: currentSearchBlock
            ? currentSearchBlock
            : undefined,
        },
        governor: {
          ...prevState.governor,
          contract: governorContract,
          deploymentBlock: blockNumber,
          name: undefined,
        },
      }));
    }
  }, [success, error, percentageComplete, blockNumber, currentSearchBlock]);



  // When Governor, find Proposals
  const { proposals } = useSearchProposals(
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

  const notActive = parsedProposals.filter((proposal) => proposal.state !== 1);

  return (
    <VStack alignItems={"flex-start"} spacing={5} minW="100%">
      <HStack minW="100%">
        <SearchStatus
          header="Governor Search Results"
          percentageComplete={percentageComplete}
          currentBlock={currentSearchBlock}
        />
        <ConnectForm setState={setFormContractParams} />
      </HStack>
      {parsedProposals.length && (
        <ProposalTable
          header={"Active Proposals"}
          proposals={activeProposals}
          percentageComplete={state.system.currentDeployBlock}
          governorAddress={state?.governor?.address}
        />
      )}
      {parsedProposals.length && (
        <ProposalTable
          header={"Proposals"}
          proposals={notActive}
          percentageComplete={state.system.currentDeployBlock}
          governorAddress={state?.governor?.address}
        />
      )}
    </VStack>
  );
};
