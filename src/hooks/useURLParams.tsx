import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useProvider } from "wagmi";
import { ContractAddress } from "../components/search";

type ContractParams = {
  contractAddress: ContractAddress;
  networkId: string;
};

type HookResponse = {
  contractParams: ContractParams | null;
  isValid: boolean;
};

const useContractParams = (): HookResponse => {
  const provider = useProvider();
  const [contractParams, setContractParams] = useState<ContractParams | null>(
    null
  );
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const contractAddress = urlParams.get("contractAddress")!;
    const networkId = urlParams.get("networkId")!;

    const isValidContractAddress = ethers.utils.isAddress(contractAddress);
    const isValidNetworkId = /^[1-9][0-9]*$/.test(networkId);

    if (isValidContractAddress && isValidNetworkId) {
      setContractParams({ contractAddress, networkId });
      setIsValid(true);
    } else {
      setIsValid(false);
      return;
    }

    const checkContractDeployed = async () => {
      try {
        const code = await provider.getCode(contractAddress);
        setIsValid(code !== "0x");
      } catch (err) {
        setIsValid(false);
      }
    };

    checkContractDeployed();
  }, [provider]);

  return { contractParams, isValid };
};

export default useContractParams;
