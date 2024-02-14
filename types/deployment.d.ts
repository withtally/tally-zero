export type UseDeploymentBlockResult = {
  blockNumber: number | undefined;
  success: boolean;
  error: string | undefined;
  currentSearchBlock: number | undefined;
  deploymentPercentageComplete: number;
  cancelSearch: () => void;
  isSearching: boolean;
};
