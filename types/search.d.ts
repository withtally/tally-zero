export type Contract = {
  address: string;
  networkId: string;
};

export type Address = `0x${string}`;

export interface ContractParams {
  contractAddress?: Address;
  networkId?: number;
  deploymentBlock?: number;
  state?: State;
}

export interface SearchProps {
  header: string;
  percentageComplete: number;
  currentBlock: number | undefined;
}

export interface GovernorState {
  address: Address | undefined;
  contract: ethers.Contract | null;
  deploymentBlock: number | null;
  name: string | undefined;
}

export interface TokenState {
  address: Address | undefined;
  contract: ethers.Contract | null;
  deploymentBlock: number | null;
}

export interface Proposal {
  id: number;
  index: number;
  proposer: string;
  eta: number;
  startBlock: number;
  endBlock: number;
  forVotes: number;
  againstVotes: number;
  canceled: boolean;
  executed: boolean;
  actions: any[];
}

export type ProposalState = Proposal[];

export interface State {
  system: {
    currentDeployBlock: number | undefined;
  };
  governor: GovernorState;
  token: TokenState;
  proposals: ProposalState;
}
