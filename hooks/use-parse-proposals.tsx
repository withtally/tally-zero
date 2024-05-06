import { ethers } from "ethers"
import { useEffect, useState } from "react"

import OzGovernor_ABI from "@data/OzGovernor_ABI.json"

import { ParsedProposal, Proposal } from "@/types/proposal"
import { ContractAddress } from "@/types/search"

export function useParseProposals(
  provider: ethers.providers.Provider,
  contractAddress: ContractAddress | undefined,
  proposals: Proposal[],
  enabled: boolean
): ParsedProposal[] {
  const [parsedProposals, setParsedProposals] = useState<ParsedProposal[]>([])

  useEffect(() => {
    if (!enabled || !contractAddress) return

    const parseProposals = async () => {
      const governorContract = new ethers.Contract(
        contractAddress,
        OzGovernor_ABI,
        provider
      )

      const proposalPromises = proposals.map(async (proposal) => {
        try {
          const proposalState = await governorContract.state(proposal.id)
          return {
            ...proposal,
            values:
              proposal.values.length > 0
                ? proposal.values.map((value) => value.toString())
                : [],
            startBlock: proposal.startBlock.toString(),
            endBlock: proposal.endBlock.toString(),
            state: proposalState,
            contractAddress: contractAddress,
          }
        } catch (error) {
          console.error(
            `Error fetching state for proposal ID ${proposal.id}:`,
            error
          )
          return null
        }
      })

      const resolvedProposals = (await Promise.all(proposalPromises)).filter(
        Boolean
      )
      setParsedProposals(resolvedProposals.filter(Boolean) as ParsedProposal[])
    }

    parseProposals()
  }, [proposals, provider, contractAddress, enabled])

  return parsedProposals
}
