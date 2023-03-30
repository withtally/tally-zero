import { useEffect, useState } from "react";
import { ethers, Contract } from "ethers";
import OZGovernor_ABI from "../utils/abis/OzGovernor_ABI.json";
import { ContractAddress } from "../components/search";
import { filter } from "@chakra-ui/react";

type Proposal = {
  id: number;
  proposer: string;
  targets: string[];
  values: ethers.BigNumber[];
  signatures: string[];
  calldatas: string[];
  startBlock: ethers.BigNumber;
  endBlock: ethers.BigNumber;
  description: string;
};

type UseSearchProposals = (
  provider: ethers.providers.Provider | undefined,
  contractAddress: ContractAddress | undefined,
  startingBlock: number | null,
  enabled: boolean
) => { proposals: Proposal[]; percentage: number };

export const useSearchProposals: UseSearchProposals = (
  provider,
  contractAddress,
  startingBlock,
  enabled
) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (!enabled || !provider || !contractAddress || !startingBlock) return;

    const contract = new Contract(contractAddress, OZGovernor_ABI, provider);

    const fetchProposals = async () => {
      const currentBlock = await provider.getBlockNumber();
      const proposalCreatedFilter = contract.filters.ProposalCreated();
      const events = await contract.queryFilter(
        proposalCreatedFilter,
        startingBlock,
        currentBlock
      );

      const newProposals = events.map((event) => {
        const {
          proposalId,
          proposer,
          targets,
          values,
          signatures,
          calldatas,
          startBlock,
          endBlock,
          description,
        } = event.args as any;
        return {
          id: proposalId,
          proposer,
          targets,
          values: values || [],
          signatures,
          calldatas,
          startBlock,
          endBlock,
          description,
        };
      });

      setProposals(newProposals);
      setPercentage(100);
    };

    fetchProposals();

    const listener = (blockNumber: number) => {
      if (percentage !== 100) {
        setPercentage(
          ((blockNumber - startingBlock) / (blockNumber - startingBlock)) * 100
        );
      }

      contract
        .queryFilter(contract.filters.ProposalCreated(), blockNumber)
        .then((events) => {
          console.log("🚀 ~ file: useSearchProposals.tsx:90 ~ .then ~ events:", events)
          if (events.length === 0) return;

          const newProposals = events.map((event) => {
            const args = event.args as unknown as Proposal;
            return args;
          });

          setProposals((currentProposals) => [
            ...currentProposals,
            ...newProposals,
          ]);
        });
    };

    provider.on("block", listener);

    return () => {
      provider.off("block", listener);
    };
  }, [provider, contractAddress, startingBlock, enabled]);

  return { proposals, percentage };
};
