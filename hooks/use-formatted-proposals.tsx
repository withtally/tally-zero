import { useMemo } from "react";
import { Proposal, ParsedProposal } from "@/types/proposal";
import { ProposalState } from "@config/intial-state";

export function useFormattedProposals(proposals: Proposal[]): ParsedProposal[] {
  proposals.sort((a, b) => a.id - b.id);
  return useMemo(() => {
    return proposals.map((proposal) => ({
      id: parseInt(proposal.id.toString()),
      proposer: proposal.proposer,
      targets: proposal.targets,
      values: proposal.values.map((value) => value.toString()),
      signatures: proposal.signatures,
      calldatas: proposal.calldatas,
      startBlock: proposal.startBlock.toString(),
      endBlock: proposal.endBlock.toString(),
      description: proposal.description,
      state: (ProposalState[proposal.state] as string).toLowerCase(),
    }));
  }, [proposals]);
}
