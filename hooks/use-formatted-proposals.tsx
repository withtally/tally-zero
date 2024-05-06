import { ParsedProposal, Proposal } from "@/types/proposal"
import { ProposalState } from "@config/intial-state"
import { useMemo } from "react"

export function useFormattedProposals(
  proposals: Proposal[],
  networkId: string
): ParsedProposal[] {
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
      networkId: networkId,
      state: (ProposalState[proposal.state] as string).toLowerCase(),
      /*       state:
        networkId === "10"
          ? (ProposalOptimismState[proposal.state] as string).toLowerCase()
          : (ProposalState[proposal.state] as string).toLowerCase(), */
    }))

    return formattedProposals.sort((a, b) => {
      if (a.state === "active" && b.state !== "active") {
        return -1
      } else if (a.state !== "active" && b.state === "active") {
        return 1
      }

      if (a.startBlock !== b.startBlock) {
        return parseInt(b.startBlock) - parseInt(a.startBlock)
      }

      return parseInt(b.id) - parseInt(a.id)
    })
  }, [networkId, proposals])
}
