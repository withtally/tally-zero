"use client";

import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { useEffect, useState } from "react";

import { useDeploymentBlock } from "@hooks/use-deployment-block";
import { useSearchProposals } from "@hooks/use-search-proposals";
import { useParseProposals } from "@hooks/use-parse-proposals";
import { useFormattedProposals } from "@/hooks/use-formatted-proposals";

import { State, ContractParams } from "@/types/search";
import { initialState } from "@config/intial-state";
import GovernorABI from "@data/OzGovernor_ABI.json";

import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/ColumnsProposals";
import { Progress } from "@/components/ui/Progress";

export default function Search({
  contractAddress,
  networkId,
  deploymentBlock,
}: ContractParams) {
  const [state, setState] = useState<State>(initialState);
  const provider = useProvider({ chainId: parseInt(networkId as string) });

  // Search for the Deployment block of Governor
  const {
    blockNumber,
    success,
    error,
    currentSearchBlock,
    deploymentPercentageComplete,
    isSearching,
    cancelSearch,
  } = useDeploymentBlock(provider, contractAddress, deploymentBlock || 0);

  // When governor is found, create a contract instance and set it to state
  try {
    useEffect(() => {
      if (!state.governor.contract && success && blockNumber) {
        const governorContract = new ethers.Contract(
          contractAddress as string,
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
    }, [
      success,
      blockNumber,
      currentSearchBlock,
      contractAddress,
      provider,
      state,
    ]);
  } catch (error) {
    console.log(error);
  }

  // When governor contract is found, find Proposals
  const { proposals, loading, percentage } = useSearchProposals(
    provider,
    contractAddress,
    Number.isNaN(deploymentBlock) && state.governor.deploymentBlock != null
      ? state.governor.deploymentBlock
      : deploymentBlock,
    true
  );

  // When Proposals, parse them into a more readable format
  const parsedProposals = useParseProposals(
    provider,
    contractAddress,
    proposals,
    true
  );
  const formattedProposals = useFormattedProposals(parsedProposals);

  return (
    <section id="proposals-table">
      {contractAddress &&
        networkId &&
        deploymentPercentageComplete > 0 &&
        deploymentPercentageComplete < 30 && (
          <Progress className="mb-8" value={deploymentPercentageComplete} />
        )}

      {contractAddress &&
        networkId &&
        percentage > 30 &&
        percentage < 100 &&
        deploymentPercentageComplete === 30 && (
          <Progress className="mb-8" value={percentage} />
        )}

      {contractAddress &&
        networkId &&
        percentage > 98 &&
        formattedProposals && (
          <DataTable
            isPaginated={true}
            columns={columns}
            data={formattedProposals as any[]}
          />
        )}
    </section>
  );
}
