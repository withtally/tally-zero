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
  governor: GovernorState;
  token: TokenState;
  proposals: ProposalState;
}

const initialState: State = {
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

export const Search = () => {
  const governorAddress = "0x80BAE65E9D56498c7651C34cFB37e2F417C4A703"; // testing address

  const provider = useProvider();
  const [subscribe, setSubscribe] = useState<boolean>(false);

  const [state, setState] = useState<State>(initialState);

  // search for deployment block of governor
  const governorSearchResult = useDeploymentBlock(provider, governorAddress);

  // When governor is found, create a contract instance and set it on state
  useEffect(() => {
    if (
      !state.governor.address &&
      !state.governor.contract &&
      governorSearchResult.success &&
      governorSearchResult.blockNumber
    ) {
      console.log("Found Govenor Contract Deployment Block");
      const governorContract = new ethers.Contract(
        governorAddress,
        GovernorABI,
        provider
      );

      setState({
        ...state,
        governor: {
          address: governorAddress,
          contract: governorContract,
          deploymentBlock: governorSearchResult.blockNumber,
          name: undefined,
        },
      });
      //   ....
    }
  }, [governorSearchResult]);

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
      console.log("Find Token!");
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

  return (
    <div>
      <ProposalTable proposals={parsedProposals} />
    </div>
  );
};
