export type UseDeploymentBlockResult = {
  blockNumber: number | undefined;
  success: boolean;
  error: string | undefined;
  currentSearchBlock: number | undefined;
  percentageComplete: number;
  cancelSearch: () => void;
  isSearching: boolean;
};
