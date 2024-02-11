import { useState, useEffect, useRef } from "react";
import { UseDeploymentBlockResult } from "@/types/deployment";
import { ContractAddress } from "@/types/search";

export const useDeploymentBlock = (
  provider: any,
  contractAddress: ContractAddress | undefined
): UseDeploymentBlockResult => {
  const [blockNumber, setBlockNumber] = useState<number | undefined>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [currentSearchBlock, setCurrentSearchBlock] = useState<
    number | undefined
  >();
  const [percentageComplete, setPercentageComplete] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const cancelSearchRef = useRef(false);

  const cancelSearch = () => {
    cancelSearchRef.current = true;
  };

  useEffect(() => {
    const findDeploymentBlock = async () => {
      if (!contractAddress || !provider) return;

      cancelSearchRef.current = false;
      setIsSearching(true);

      try {
        const currentBlockNumber = await provider.getBlockNumber();
        const currentCode = await provider.getCode(contractAddress);

        if (currentCode === "0x") {
          throw new Error("Contract not currently deployed");
        }

        let [lowerBound, upperBound] = [0, currentBlockNumber];
        let deployedBlockNumber = currentBlockNumber - 2000000;
        const maxIterations = Math.ceil(Math.log2(currentBlockNumber));

        /*   for (let i = 0; i < maxIterations && !cancelSearchRef.current; i++) {
          const mid = Math.floor((lowerBound + upperBound) / 2);
          setCurrentSearchBlock(mid);
          setPercentageComplete((i / maxIterations) * 100);

          const code = await provider.getCode(contractAddress, mid);
          const isDeployed = code !== "0x";

          if (isDeployed) {
            deployedBlockNumber = mid;
            const prevCode = await provider.getCode(contractAddress, mid - 1);

            if (mid === 0 || prevCode === "0x") break;
            upperBound = mid - 1;
          } else {
            lowerBound = mid + 1;
          }
        } */

        if (cancelSearchRef.current) {
          setError("Search canceled");
        } else if (deployedBlockNumber !== null) {
          setBlockNumber(deployedBlockNumber);
          setSuccess(true);
          setPercentageComplete(100);
        } else {

          throw new Error("Unable to find deployment block");
        }
      } catch (err) {
        console.log(err);

        setError((err as Error).message || JSON.stringify(err));
        setSuccess(false);
      } finally {
        setIsSearching(false);
      }
    };

    findDeploymentBlock();

    return cancelSearch;
  }, [contractAddress, provider]);

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
