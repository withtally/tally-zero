import { useMemo } from "react";
import { ProposalState } from "@config/intial-state";
import { Proposal, ParsedProposal } from "@/types/proposal";

export function useFormattedProposals(proposals: Proposal[]): ParsedProposal[] {
  proposals.sort((a, b) => parseInt(a.id) - parseInt(b.id));
  proposals.sort((a, b) => a.state - b.state);

  return useMemo(() => {
    return proposals.map((proposal) => ({
      id: proposal.id,
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
