import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

interface ContractParams {
  contractAddress?: string;
  networkId?: string;
}

export const Home: React.FC = () => {
  const [contractParams, setContractParams] = useState<ContractParams>({});
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const contractAddress = urlParams.get("contractAddress")!; // Use non-null assertion operator

    const networkId = urlParams.get("networkId")!; // Use non-null assertion operator

    // Validate the contract address and network ID
    const isValidContractAddress = ethers.utils.isAddress(contractAddress);
    const isValidNetworkId = /^[1-9][0-9]*$/.test(networkId);

    if (isValidContractAddress && isValidNetworkId) {
      setContractParams({ contractAddress, networkId });
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, []);

  if (!isValid) {
    return <div>Invalid contract address or network ID</div>;
  }

  if (!contractParams.contractAddress || !contractParams.networkId) {
    return <div>Missing contract address or network ID</div>;
  }

  return (
    <div>
      Contract address: {contractParams.contractAddress}
      <br />
      Network ID: {contractParams.networkId}
    </div>
  );
};


