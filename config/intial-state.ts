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
  Active = 0,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Pending,
  Executed,
  Expired,
}

export enum ProposalOptimismState {
  Active = 3,
  Pending,
  Closed,
}
