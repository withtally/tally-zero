// import { useState, useEffect, useRef } from "react";
// import { providers } from "ethers";

// export type UseDeploymentBlockResult = {
//   blockNumber: number | null;
//   success: boolean;
//   error: string | null;
//   currentSearchBlock: number | null;
//   percentageComplete: number;
//   cancelSearch: () => void;
// };

// export const useDeploymentBlock = (
//   provider: providers.Provider,
//   contractAddress: string
// ): UseDeploymentBlockResult => {
//   const [blockNumber, setBlockNumber] = useState<number | null>(null);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [currentSearchBlock, setCurrentSearchBlock] = useState<number | null>(
//     null
//   );
//   const [percentageComplete, setPercentageComplete] = useState(0);
//   const cancelSearchRef = useRef(false);

//   const cancelSearch = () => {
//     cancelSearchRef.current = true;
//   };

//   useEffect(() => {
//     cancelSearchRef.current = false;

//     const findDeploymentBlock = async () => {
//       try {
//         const currentBlockNumber = await provider.getBlockNumber();
//         const currentCode = await provider.getCode(
//           contractAddress,
//           currentBlockNumber
//         );

//         if (currentCode === "0x") {
//           setError("Contract not currently deployed");
//           setSuccess(false);
//           return;
//         }

//         let lowerBound = 0;
//         let upperBound = currentBlockNumber;
//         let deployedBlockNumber: number | null = null;

//         const updateProgress = (mid: number) => {
//           setCurrentSearchBlock(mid);
//           setPercentageComplete(
//             ((mid - lowerBound) / (upperBound - lowerBound)) * 100
//           );
//         };

//         while (lowerBound <= upperBound && !cancelSearchRef.current) {
//           const mid = Math.floor((lowerBound + upperBound) / 2);
//           updateProgress(mid);
//           const code = await provider.getCode(contractAddress, mid);

//           if (code === "0x") {
//             lowerBound = mid + 1;
//           } else {
//             deployedBlockNumber = mid;
//             if (
//               mid === 0 ||
//               (await provider.getCode(contractAddress, mid - 1)) === "0x"
//             ) {
//               break;
//             } else {
//               upperBound = mid - 1;
//             }
//           }
//         }

//         if (cancelSearchRef.current) {
//           setError("Search canceled");
//           setSuccess(false);
//           setBlockNumber(null);
//         } else if (deployedBlockNumber !== null) {
//           setBlockNumber(deployedBlockNumber);
//           setSuccess(true);
//           setError(null);
//         } else {
//           setBlockNumber(null);
//           setSuccess(false);
//           setError("Unable to find deployment block");
//         }
//       } catch (err) {
//         setBlockNumber(null);
//         setSuccess(false);
//         setError(JSON.stringify(err));
//       }
//     };

//     findDeploymentBlock();

//     return () => {
//       cancelSearch();
//     };
//   }, [provider, contractAddress]);

//   return {
//     blockNumber,
//     success,
//     error,
//     currentSearchBlock,
//     percentageComplete,
//     cancelSearch,
//   };
// };

import { useState, useEffect, useRef } from "react";
import { providers } from "ethers";

export type UseDeploymentBlockResult = {
  blockNumber: number | null;
  success: boolean;
  error: string | null;
  currentSearchBlock: number | null;
  percentageComplete: number;
  cancelSearch: () => void;
};

export const useDeploymentBlock = (
  provider: providers.Provider,
  contractAddress: string
): UseDeploymentBlockResult => {
  const [blockNumber, setBlockNumber] = useState<number | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchBlock, setCurrentSearchBlock] = useState<number | null>(
    null
  );
  const [percentageComplete, setPercentageComplete] = useState(0);
  const cancelSearchRef = useRef(false);

  const cancelSearch = () => {
    cancelSearchRef.current = true;
  };

  useEffect(() => {
    cancelSearchRef.current = false;

    const findDeploymentBlock = async () => {
      try {
        const currentBlockNumber = await provider.getBlockNumber();
        const currentCode = await provider.getCode(
          contractAddress,
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

        while (lowerBound <= upperBound && !cancelSearchRef.current) {
          const mid = Math.floor((lowerBound + upperBound) / 2);
          setCurrentSearchBlock(mid);

          const progressPercentage =
            ((mid - lowerBound) / (upperBound - lowerBound + 1)) * 100;
          setPercentageComplete(progressPercentage);

          const code = await provider.getCode(contractAddress, mid);

          if (code === "0x") {
            lowerBound = mid + 1;
          } else {
            deployedBlockNumber = mid;
            if (
              mid === 0 ||
              (await provider.getCode(contractAddress, mid - 1)) === "0x"
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
          setBlockNumber(null);
        } else if (deployedBlockNumber !== null) {
          setBlockNumber(deployedBlockNumber);
          setSuccess(true);
          setError(null);
        } else {
          setBlockNumber(null);
          setSuccess(false);
          setError("Unable to find deployment block");
        }
      } catch (err) {
        setBlockNumber(null);
        setSuccess(false);
        setError(JSON.stringify(err));
      }
    };

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
    cancelSearch,
  };
};
