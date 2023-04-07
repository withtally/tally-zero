import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { useProvider } from "wagmi";
import { useDeploymentBlock } from "../hooks/useDeploymentBlock";

import GovernorABI from "../utils/abis/OzGovernor_ABI.json";
import TokenABI from "../utils/abis/ERC20Votes_ABI.json";
import { useSearchProposals } from "../hooks/useSearchProposals";
import { useParseProposals } from "../hooks/useParseProposals";
import { ProposalTable } from "./proposalTable";
import { HStack, VStack, Text } from "@chakra-ui/react";
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

  console.log("state: ", state?.governor.name);
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

  // When governor is found, get state info
  // useEffect(() => {
  //   const getTokenAddress = async () => {
  //     let tokenAddress: any | undefined;

  //     try {
  //       tokenAddress = await state.governor.contract.token();
  //     } catch (error) {
  //       console.log(
  //         "Get Token Address Error: ",
  //         JSON.stringify(error, null, 2)
  //       );
  //     }

  //     let governorName: any | undefined;
  //     try {
  //       governorName = await state.governor.contract.name();
  //     } catch (error) {
  //       console.log(
  //         "Get Governor Name Error: ",
  //         JSON.stringify(error, null, 2)
  //       );
  //     }
  //     setState((prevState) => ({
  //       ...prevState,
  //       governor: { ...prevState.governor, name: governorName },
  //       // token: {
  //       //   address: tokenAddress,
  //       //   contract: new ethers.Contract(tokenAddress, TokenABI, provider),
  //       //   deploymentBlock: null,
  //       // },
  //     }));
  //   };

  //   if (state.governor.address && state.governor.contract) {
  //     getTokenAddress();
  //   }
  // }, [state]);

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
    <VStack alignItems={"flex-start"} spacing={5} pt={55}>
      <HStack width={"full"}>
        <SearchStatus
          header="Governor Search Results"
          percentageComplete={percentageComplete}
          currentBlock={currentSearchBlock}
        />
        <ConnectForm setState={setFormContractParams} />
      </HStack>
      {/* <HStack
        textAlign={"justify"}
        border="1px"
        borderColor="gray.200"
        borderRadius="lg"
        p={5}
        bg="white"
        minWidth={"100%"}
        justifyContent={"space-between"}
      >
        <HStack>
          <Text>Governor Name: </Text>
          {state.governor.name && <Text>{state.governor.name}</Text>}
        </HStack>
        <HStack>
          <Text>Proposal Count:</Text>{" "}
          <Text>{state.governor.name ? parsedProposals.length : "unknown"}</Text>
        </HStack>
      </HStack> */}
      <ProposalTable
        header={"Active Proposals"}
        proposals={activeProposals}
        percentageComplete={state.system.currentDeployBlock}
        governorAddress={state?.governor?.address}
      />
      <ProposalTable
        header={"Proposals"}
        proposals={notActive}
        percentageComplete={state.system.currentDeployBlock}
        governorAddress={state?.governor?.address}
      />
    </VStack>
  );
};
