import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import useURLParams from "../hooks/useURLParams";
import { Search } from "../components/search";
import { ConnectForm } from "../components/form";
import { VStack } from "@chakra-ui/react";
interface ContractParams {
  contractAddress?: `0x${string}`;
  networkId?: string;
}

export const Home: React.FC = () => {
  const [formContractParams, setFormContractParams] = useState<ContractParams>(
    {}
  );

  return (
    <VStack spacing={8}>
      <ConnectForm setState={setFormContractParams} />
      <Search
        contractAddress={formContractParams.contractAddress}
        network={formContractParams.networkId}
      />
    </VStack>
  );
};
