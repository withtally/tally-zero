import { useEffect, useState } from 'react';
import { BigNumber, ethers, Contract } from 'ethers';
import ERC20_ABI from './ERC20_ABI.json';

type TransferHandler = (from: string, to: string, value: BigNumber) => void;

const useERC20TransferListener = (
  provider: ethers.providers.Provider | undefined,
  contractAddress: string,
  subscribe: boolean
): void => {
  const [contract, setContract] = useState<Contract | null>(null);

  // Get the ethers contract object
  useEffect(() => {
    if (provider && contractAddress) {
      setContract(new ethers.Contract(contractAddress, ERC20_ABI, provider));
    }
  }, [provider, contractAddress]);

  // Subscribe to Transfer event
  const handleTransfer: TransferHandler = (from, to, value) => {
    const formattedValue = ethers.utils.formatEther(value);
    // console.log(`From: ${from}\nTo: ${to}\nAmount: ${formattedValue} ETH`);
  };

  useEffect(() => {
    if (subscribe && contract) {
      const transferListener = contract.filters.Transfer(null, null, null);

      contract.on(transferListener, handleTransfer);

      return () => {
        contract.off(transferListener, handleTransfer);
      };
    }
  }, [subscribe, contract]);
};

export default useERC20TransferListener;
