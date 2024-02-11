"use client";

import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { useEffect, useState } from "react";

import { useDeploymentBlock } from "@hooks/use-deployment-block";
import { useSearchProposals } from "@hooks/use-search-proposals";
import { useParseProposals } from "@hooks/use-parse-proposals";

import { State, ContractParams } from "@/types/search";
import { initialState } from "@config/intial-state";
import GovernorABI from "@data/OzGovernor_ABI.json";

import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/ColumnsProposals";
import { Progress } from "@/components/ui/Progress";

export default function Search({ contractAddress, networkId }: ContractParams) {
  const [state, setState] = useState<State>(initialState);
  const provider = useProvider({ chainId: parseInt(networkId as string) });

  // Search for the Deployment block of Governor
  const {
    blockNumber,
    success,
    error,
    currentSearchBlock,
    percentageComplete,
    isSearching,
    cancelSearch,
  } = useDeploymentBlock(provider, contractAddress);

  // When governor is found, create a contract instance and set it to state
  useEffect(() => {
    if (!state.governor.contract && success && blockNumber) {
      const governorContract = new ethers.Contract(
        contractAddress as string,
        GovernorABI,
        provider
      );

      console.log(currentSearchBlock);

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
  }, [
    success,
    blockNumber,
    currentSearchBlock,
    contractAddress,
    provider,
    state,
  ]);

  // When governor contract is found, find Proposals
  const { proposals } = useSearchProposals(
    provider,
    contractAddress,
    state.governor.deploymentBlock,
    true
  );

  // When Proposals, parse them into a more readable format
  const parsedProposals = useParseProposals(
    provider,
    contractAddress,
    proposals,
    true
  );

  // #TODO: In the production version, we should go with the 'parsedProposals' instead of 'fakeProposals'

  const [percentageFake, setPercentageFake] = useState(0);
  useEffect(() => {
    if (contractAddress && networkId && percentageFake < 100) {
      const timer = setTimeout(() => {
        setPercentageFake((prevState) => prevState + 2.5);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [percentageFake, contractAddress, networkId]);

  return (
    <section id="proposals-table">
      {contractAddress &&
        networkId &&
        percentageFake > 0 &&
        percentageFake < 100 && (
          <Progress className="mb-8" value={percentageFake} />
        )}

      {contractAddress && networkId && percentageFake === 100 && (
        <DataTable
          isPaginated={true}
          columns={columns}
          data={parsedProposals as any[]}
        />
      )}
    </section>
  );
}
