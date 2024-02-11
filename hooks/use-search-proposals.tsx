import { Contract } from "ethers";
import { useEffect, useState } from "react";
import OZGovernor_ABI from "@data/OzGovernor_ABI.json";
import { Proposal, UseSearchProposals, ParsedProposal } from "@/types/proposal";

export const useSearchProposals: UseSearchProposals = (
  provider,
  contractAddress,
  startingBlock,
  enabled
) => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!enabled || !provider || !contractAddress || !startingBlock) return;

    const contract = new Contract(contractAddress, OZGovernor_ABI, provider);
    const fetchProposals = async () => {
      setLoading(true);
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
          state: 0,
        };
      });

      setProposals(newProposals);
      setLoading(false);
    };

    fetchProposals();

    const listener = (blockNumber: number) => {
      contract
        .queryFilter(contract.filters.ProposalCreated(), blockNumber)
        .then((events) => {
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

  return { proposals, loading };
};
