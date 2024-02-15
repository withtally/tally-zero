"use client";

import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { useEffect, useState } from "react";
import { getBlockRange } from "@lib/block-range";

import { useDeploymentBlock } from "@hooks/use-deployment-block";
import { useSearchProposals } from "@hooks/use-search-proposals";
import { useParseProposals } from "@hooks/use-parse-proposals";
import { useFormattedProposals } from "@/hooks/use-formatted-proposals";

import { State, ContractParams } from "@/types/search";
import { initialState } from "@config/intial-state";
import GovernorABI from "@data/OzGovernor_ABI.json";
import { daos } from "@config/data";
import { daoSchema } from "@config/schema";

import { Progress } from "@/components/ui/Progress";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/ColumnsProposals";

export default function Search({
  contractAddress,
  networkId,
  deploymentBlock,
}: ContractParams) {
  const [state, setState] = useState<State>(initialState);
  const [overallProgress, setOverallProgress] = useState(0);
  const provider = useProvider({ chainId: parseInt(networkId as string) });
  const dao = daos.find(
    (dao) => dao.ethAddress === contractAddress
  ) as unknown as typeof daoSchema;

  // Search for the Deployment block of Governor
  const { blockNumber, success, currentSearchBlock, deploymentProgress } =
    useDeploymentBlock(provider, contractAddress, deploymentBlock || 0);

  // When governor is found, create a contract instance and set it to state
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

  // When governor contract is found, find Proposals
  const blockRange = getBlockRange(dao) as number;
  const { proposals, searchProgress } = useSearchProposals(
    provider,
    contractAddress,
    blockRange,
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

  useEffect(() => {
    const combinedProgress = deploymentProgress * 0.2 + searchProgress * 0.8;
    setOverallProgress(combinedProgress);
  }, [deploymentProgress, searchProgress]);

  return (
    <section id="proposals-table">
      {contractAddress &&
        networkId &&
        overallProgress > 0 &&
        overallProgress < 100 && (
          <Progress className="mb-8" value={overallProgress} />
        )}

      {contractAddress &&
        networkId &&
        overallProgress === 100 &&
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
