import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { useEffect, useState, useRef } from "react";

import { useParseProposals } from "@hooks/use-parse-proposals";
import { useSearchProposals } from "@hooks/use-search-proposals";
import { useDeploymentBlock } from "@hooks/use-deployment-block";
import { useFormattedProposals } from "@/hooks/use-formatted-proposals";

import { daos } from "@config/data";
import { State } from "@/types/search";
import { daoSchema } from "@config/schema";
import { ContractParams } from "@/types/search";

import { getBlockRange } from "@lib/block-range";
import GovernorABI from "@data/OzGovernor_ABI.json";

export function useGovernorContract({
  values,
  state,
  setState,
}: {
  values: ContractParams;
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
}) {
  const [overallProgress, setOverallProgress] = useState(0);

  const provider = useProvider({
    chainId: parseInt(values.networkId?.toString() as string),
  });

  const dao = daos.find(
    (dao) => dao.ethAddress === values.contractAddress
  ) as unknown as typeof daoSchema;

  // Search for the Deployment block of Governor
  const { blockNumber, success, currentSearchBlock, deploymentProgress } =
    useDeploymentBlock(
      provider,
      values.contractAddress,
      values.deploymentBlock || 0
    );

  // When governor is found, create a contract instance and set it to state
  const governorContractRef = useRef(state.governor.contract);

  useEffect(() => {
    if (!governorContractRef.current && success && blockNumber) {
      const governorContract = new ethers.Contract(
        values.contractAddress?.toString() as string,
        GovernorABI,
        provider
      );

      governorContractRef.current = governorContract;

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
    provider,
    values.contractAddress,
    success,
    blockNumber,
    currentSearchBlock,
    state.governor.contract,
    values.state?.governor.contract,
    setState,
  ]);

  // Update the ref when state.governor.contract changes outside of this useEffect
  useEffect(() => {
    governorContractRef.current = state.governor.contract;
  }, [state.governor.contract]);

  // When governor contract is found, find Proposals
  const blockRange = getBlockRange(dao) as number;
  const { proposals, searchProgress } = useSearchProposals(
    provider,
    values.contractAddress,
    blockRange,
    values.deploymentBlock === 0 && state.governor.deploymentBlock != null
      ? state.governor.deploymentBlock
      : values.deploymentBlock ?? null,
    true
  );

  // When Proposals, parse them into a more readable format
  const parsedProposals = useParseProposals(
    provider,
    values.contractAddress,
    proposals,
    true
  );
  const formattedProposals = useFormattedProposals(parsedProposals);

  useEffect(() => {
    const combinedProgress = deploymentProgress * 0.2 + searchProgress * 0.8;
    setOverallProgress(combinedProgress);
  }, [deploymentProgress, searchProgress]);

  // Reset blockNumber, success, and currentSearchBlock, proposals, and searchProgress

  return {
    overallProgress,
    formattedProposals,
  };
}
