import { Contract } from "ethers";
import { useEffect, useState } from "react";
import OZGovernor_ABI from "@data/OzGovernor_ABI.json";
import { Proposal, UseSearchProposals } from "@/types/proposal";

const MAX_CLUSTER_SIZE = 40;

export const useSearchProposals: UseSearchProposals = (
  provider,
  contractAddress,
  blockRange,
  startingBlock,
  enabled
) => {
  const [searchProgress, setSearchProgress] = useState(0);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!enabled || !provider || !contractAddress || !startingBlock) return;

    const contract = new Contract(contractAddress, OZGovernor_ABI, provider);

    const fetchProposals = async () => {
      try {
        let proposals: Proposal[] = [];
        const currentBlock = await provider.getBlockNumber();
        const proposalCreatedFilter = contract.filters.ProposalCreated();
        const startBlock = Math.max(
          startingBlock - blockRange * MAX_CLUSTER_SIZE,
          0
        );

        for (
          let fromBlock = startBlock;
          fromBlock <= currentBlock - blockRange;
          fromBlock += blockRange
        ) {
          const toBlock = Math.min(fromBlock + blockRange - 1, currentBlock);

          setSearchProgress(
            ((fromBlock - startBlock) / (currentBlock - startBlock)) * 100
          );

          let events: any[] = [];
          try {
            events = await contract.queryFilter(
              proposalCreatedFilter,
              fromBlock,
              toBlock
            );
          } catch (error) {
            events = [];
            console.warn("Error parsing proposals:", error);
          }

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
              id: proposalId.toString(),
              proposer,
              targets,
              values: Array.isArray(values)
                ? values.map((value: any) => value.toString())
                : [],
              signatures,
              calldatas,
              startBlock: startBlock.toString(),
              endBlock: endBlock.toString(),
              description,
              state: 0,
            };
          });
          if (newProposals.length > 0) {
            proposals = [...proposals, ...newProposals];
          }
        }

        setProposals(proposals);
        setSearchProgress(100);
      } catch (error) {
        console.warn("Error fetching proposals:", error);
      }
    };

    fetchProposals().catch(console.log);
  }, [provider, contractAddress, startingBlock, enabled, blockRange]);

  return { proposals, searchProgress };
};
