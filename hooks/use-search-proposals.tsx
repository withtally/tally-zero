import { Contract } from "ethers";
import { useEffect, useState } from "react";
import OZGovernor_ABI from "@data/OzGovernor_ABI.json";
import { Proposal, UseSearchProposals } from "@/types/proposal";

const MAX_BLOCKS_RANGE = 50000;
const MAX_PREVIOUS_BLOCKS = 2000000;

export const useSearchProposals: UseSearchProposals = (
  provider,
  contractAddress,
  startingBlock,
  enabled
) => {
  const [percentage, setPercentage] = useState(30);
  const [loading, setLoading] = useState<boolean>(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    if (!enabled || !provider || !contractAddress || !startingBlock) return;

    const contract = new Contract(contractAddress, OZGovernor_ABI, provider);

    const fetchProposals = async () => {
      setLoading(true);
      try {
        let proposals: Proposal[] = [];
        const currentBlock = await provider.getBlockNumber();
        const proposalCreatedFilter = contract.filters.ProposalCreated();
        const startBlock = Math.max(startingBlock - MAX_PREVIOUS_BLOCKS, 0);

        for (
          let fromBlock = startBlock;
          fromBlock <= currentBlock - MAX_BLOCKS_RANGE * 3;
          fromBlock += MAX_BLOCKS_RANGE
        ) {
          const toBlock = Math.min(
            fromBlock + MAX_BLOCKS_RANGE - 1,
            currentBlock
          );

          setPercentage(
            (toBlock / (currentBlock - MAX_BLOCKS_RANGE * 2)) * 100
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

          proposals = [...proposals, ...newProposals];
        }

        setProposals(proposals);
      } catch (error) {
        console.warn("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals().catch(console.log);

  }, [provider, contractAddress, startingBlock, enabled]);

  return { proposals, loading, percentage };
};
