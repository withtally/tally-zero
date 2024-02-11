import { useEffect, useState } from "react";
import { Contract, ethers } from "ethers";
import OzGovernor_ABI from "@data/OzGovernor_ABI.json";
import { ContractAddress } from "@/types/search";
import { Proposal, ParsedProposal } from "@/types/proposal";

export function useParseProposals(
  provider: ethers.providers.Provider,
  contractAddress: ContractAddress | undefined,
  proposals: Proposal[],
  enabled: boolean
): ParsedProposal[] {
  const [parsedProposals, setParsedProposals] = useState<ParsedProposal[]>([]);
  useEffect(() => {
    if (!enabled || !contractAddress) return;
    const parseProposals = async () => {
      const governorContract = new ethers.Contract(
        contractAddress,
        OzGovernor_ABI,
        provider
      ) as Contract;

      proposals.map(async (proposal) => {
        governorContract.state(proposal.id).then((proposalState: number) => {
         setParsedProposals((prev) => [
           ...prev,
           {
             ...proposal,
             values:
               proposal.values.length > 0
                 ? proposal.values.map((value) => value.toString())
                 : [],
             startBlock: proposal.startBlock.toString(),
             endBlock: proposal.endBlock.toString(),
             state: proposalState,
           },
         ]);
        });
      });
    };

    parseProposals();
  }, [proposals, provider, contractAddress, enabled]);

  return parsedProposals;
}
