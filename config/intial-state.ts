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
