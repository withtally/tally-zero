import { UseDeploymentBlockResult } from "@/types/deployment";
import { ContractAddress } from "@/types/search";
import { providers } from "ethers";
import { useEffect, useRef, useState } from "react";

const MAX_BLOCK_DIFF = 128;

export const useDeploymentBlock = (
  provider: providers.Provider,
  contractAddress: ContractAddress | undefined,
  deploymentBlock: number
): UseDeploymentBlockResult => {
  const cancelSearchRef = useRef(false);
  const [success, setSuccess] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [blockNumber, setBlockNumber] = useState<number | undefined>();
  const [currentSearchBlock, setCurrentSearchBlock] = useState<
    number | undefined
  >();

  const cancelSearch = () => {
    cancelSearchRef.current = true;
    setSuccess(false);
    setDeploymentProgress(0);
    setCurrentSearchBlock(undefined);
    setBlockNumber(undefined);
  };

  useEffect(() => {
    const findDeploymentBlock = async () => {
      if (!contractAddress || !provider) return;

      cancelSearchRef.current = false;

      const currentCode = await provider.getCode(contractAddress);
      if (currentCode === "0x") {
        throw new Error("Contract not currently deployed");
      }

      const currentBlockNumber =
        deploymentBlock || (await provider.getBlockNumber());

      let [lowerBound, upperBound] = [0, currentBlockNumber];
      let deployedBlockNumber: number | null = null;
      const maxIterations = Math.ceil(Math.log2(currentBlockNumber));

      if (currentBlockNumber - deploymentBlock > MAX_BLOCK_DIFF) {
        const lastBlock = currentBlockNumber - MAX_BLOCK_DIFF;
        lowerBound = lastBlock;
      }

      try {
        for (let i = 0; i < maxIterations && !cancelSearchRef.current; i++) {
          const mid = Math.floor((lowerBound + upperBound) / 2);
          setCurrentSearchBlock(mid);
          setDeploymentProgress((i / maxIterations) * 100);

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
        }
      } catch (err: any) {
        console.warn(err);
        setSuccess(false);
      }

      if (cancelSearchRef.current) {
        setSuccess(false);
      } else if (deployedBlockNumber !== null) {
        setBlockNumber(deployedBlockNumber);
        setSuccess(true);
        setDeploymentProgress(100);

        //  reset blockNumber, success and currentSearchBlock from useDeploymentBlock when a new search is started
        return () => {
          setBlockNumber(undefined);
          setSuccess(false);
          setCurrentSearchBlock(undefined);
        };
      }
    };

    findDeploymentBlock();

    return cancelSearch;
  }, [contractAddress, provider, deploymentBlock]);

  return {
    blockNumber,
    success,
    currentSearchBlock,
    deploymentProgress,
  };
};
