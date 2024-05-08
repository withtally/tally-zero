import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { useProvider } from "wagmi";

import { useFormattedProposals } from "@/hooks/use-formatted-proposals";
import { useDeploymentBlock } from "@hooks/use-deployment-block";
import { useParseProposals } from "@hooks/use-parse-proposals";
import { useSearchProposals } from "@hooks/use-search-proposals";

import { ContractParams, State } from "@/types/search";

import { getBlockRange, selectDAOByGovernorAddress } from "@/lib/dao";
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

  // reset provider when networkId changes
  const provider = useProvider({
    chainId: parseInt(values.networkId?.toString() as string),
  });

  const dao = selectDAOByGovernorAddress(values.contractAddress);

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
  const formattedProposals = useFormattedProposals(
    parsedProposals,
    values.networkId?.toString() as string
  );

  useEffect(() => {
    const combinedProgress = deploymentProgress * 0.2 + searchProgress * 0.8;
    setOverallProgress(combinedProgress);
  }, [deploymentProgress, searchProgress]);

  return {
    overallProgress,
    formattedProposals,
  };
}
