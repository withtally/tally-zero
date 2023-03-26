import React, { useState } from 'react';
import { useProvider } from 'wagmi';
import useERC20TransferListener from '../hooks/useERC20TransferListener';
import { useDeploymentBlock, UseDeploymentBlockResult } from '../hooks/useDeploymentBlock';


const MyComponent: React.FC = () => {
  const provider = useProvider();
  const [subscribe, setSubscribe] = useState<boolean>(false);
  const contractAddress = '0x912CE59144191C1204E64559FE8253a0e49E6548'; // Replace with your ERC20 contract address

  useERC20TransferListener(provider, contractAddress, subscribe);
  const result = useDeploymentBlock(provider, contractAddress);
  console.log("🚀 ~ file: sampleListener.tsx:14 ~ result:", result)


  return (
    <button onClick={() => setSubscribe(!subscribe)}>
      {subscribe ? 'Unsubscribe' : 'Subscribe'}
    </button>
  );
};

export default MyComponent;