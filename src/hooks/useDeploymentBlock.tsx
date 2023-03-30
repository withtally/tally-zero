import { useState, useEffect, useRef } from "react";
import { providers } from "ethers";
import { ContractAddress } from "../components/search";

export type UseDeploymentBlockResult = {
  blockNumber: number | undefined;
  success: boolean;
  error: string | undefined;
  currentSearchBlock: number | undefined;
  percentageComplete: number;
  cancelSearch: () => void;
  isSearching: boolean;
};

export const useDeploymentBlock = (
  provider: providers.Provider,
  contractAddress: ContractAddress | undefined
): UseDeploymentBlockResult => {
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentSearchBlock, setCurrentSearchBlock] = useState<number | undefined>(
    undefined
  );
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const cancelSearchRef = useRef(false);

  const cancelSearch = () => {
    cancelSearchRef.current = true;
  };

  useEffect(() => {
    cancelSearchRef.current = false;

    const findDeploymentBlock = async () => {
      try {
        setIsSearching(true);
        const currentBlockNumber = await provider.getBlockNumber();

        const currentCode = await provider.getCode(
          contractAddress as string,
          currentBlockNumber
        );

        if (currentCode === "0x") {
          setError("Contract not currently deployed");
          setSuccess(false);
          return;
        }

        let lowerBound = 0;
        let upperBound = currentBlockNumber;
        let deployedBlockNumber: number | null = null;

        const maxIterations = Math.ceil(Math.log2(currentBlockNumber));
        let currentIteration = 0;

        while (lowerBound <= upperBound && !cancelSearchRef.current) {
          const mid = Math.floor((lowerBound + upperBound) / 2);
          setCurrentSearchBlock(mid);

          currentIteration++;
          const progressPercentage = (currentIteration / maxIterations) * 100;
          setPercentageComplete(progressPercentage);

          const code = await provider.getCode(contractAddress as string, mid);

          if (code === "0x") {
            lowerBound = mid + 1;
          } else {
            deployedBlockNumber = mid;
            if (
              mid === 0 ||
              (await provider.getCode(contractAddress as string, mid - 1)) ===
                "0x"
            ) {
              break;
            } else {
              upperBound = mid - 1;
            }
          }
        }

        if (cancelSearchRef.current) {
          setError("Search canceled");
          setSuccess(false);
          setIsSearching(false);
        } else if (deployedBlockNumber !== null) {
          setBlockNumber(deployedBlockNumber);
          setSuccess(true);
          setIsSearching(false);
          setPercentageComplete(100);
        } else {
          setSuccess(false);
          setIsSearching(false);
          setError("Unable to find deployment block");
        }
      } catch (err) {
        setSuccess(false);
        setIsSearching(false);
        setError(JSON.stringify(err));
      }
    };

    if (!contractAddress) return;
    findDeploymentBlock();

    return () => {
      cancelSearch();
    };
  }, [provider, contractAddress]);

  return {
    blockNumber,
    success,
    error,
    currentSearchBlock,
    percentageComplete,
    isSearching,
    cancelSearch,
  };
};
