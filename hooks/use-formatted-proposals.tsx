import { useMemo } from "react";
import { ProposalState } from "@config/intial-state";
import { Proposal, ParsedProposal } from "@/types/proposal";

export function useFormattedProposals(proposals: Proposal[]): ParsedProposal[] {
  return useMemo(() => {
    const formattedProposals = proposals.map((proposal) => ({
      id: proposal.id,
      contractAddress: proposal.contractAddress,
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

    return formattedProposals.sort((a, b) => {
      if (a.state === "active" && b.state !== "active") {
        return -1;
      } else if (a.state !== "active" && b.state === "active") {
        return 1;
      }

      return parseInt(a.id) - parseInt(b.id);
    });
  }, [proposals]);
}
