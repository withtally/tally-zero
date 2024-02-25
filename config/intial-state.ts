import { State } from "@/types/search";

export const initialState: State = {
  system: {
    currentDeployBlock: 0,
  },
  governor: {
    address: undefined,
    contract: null,
    deploymentBlock: null,
    name: undefined,
  },
  token: {
    address: undefined,
    contract: null,
    deploymentBlock: null,
  },
  proposals: [],
};

export enum ProposalState {
  Canceled,
  Active,
  Queued,
  Executed,
  Succeeded,
  Pending,
  Defeated,
  Expired,
}

export enum ProposalOptimismState {
  Active = 3,
  Pending,
  Closed,
}
