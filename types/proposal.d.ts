import { daoSchema } from "@config/schema";
import { ContractAddress } from "@/types/search";

export type Proposal = {
  id: string;
  proposer: string;
  targets: string[];
  values: ethers.BigNumber[];
  signatures: string[];
  calldatas: string[];
  startBlock: ethers.BigNumber;
  endBlock: ethers.BigNumber;
  description: string;
  state: number;
};

export type UseSearchProposals = (
  provider: ethers.providers.Provider | undefined,
  contract: ContractAddress | undefined,
  blockRange: number,
  startingBlock: number | null,
  enabled: boolean
) => {
  proposals: Proposal[];
  searchProgress: number;
};

export type ParsedProposal = {
  id: string;
  proposer: string;
  targets: string[];
  values: string[];
  signatures: string[];
  calldatas: string[];
  startBlock: string;
  endBlock: string;
  description: string;
  state: ProposalState | undefined;
};

export type UseTotalProposalsReturn = {
  totalProposals: number | null;
  isLoadingTotal: boolean;
  error: Error | null;
};
