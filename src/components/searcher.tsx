import { useState } from 'react';
import { ethers } from 'ethers';
import { useDeploymentBlock, UseDeploymentBlockResult } from '../hooks/useDeploymentBlock';

const MyComponent = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<UseDeploymentBlockResult | null>(null);

  const handleSearchClick = async () => {
    if (!contractAddress || !provider) {
      return;
    }

    setSearching(true);
    setSearchResult(null);

    const deploymentBlockResult = await getDeploymentBlock(provider, contractAddress);

    setSearchResult(deploymentBlockResult);
    setSearching(false);
  };

  const handleCancelClick = () => {
    if (searchResult) {
      searchResult.cancelSearch();
    }
  };

  const getDeploymentBlock = async (
    provider: ethers.providers.JsonRpcProvider,
    contractAddress: string
  ): Promise<UseDeploymentBlockResult> => {
    const deploymentBlockResult = await useDeploymentBlock(provider, contractAddress);
    return deploymentBlockResult;
  };

  return (
    <div>
      <label htmlFor="contract-address">Contract Address</label>
      <input id="contract-address" value={contractAddress} onChange={e => setContractAddress(e.target.value)} />
      <br />
      <button onClick={() => setProvider(new ethers.providers.JsonRpcProvider())}>Connect to Provider</button>
      <br />
      <button onClick={handleSearchClick} disabled={!provider || searching}>
        Search
      </button>
      <button onClick={handleCancelClick} disabled={!searchResult || !searching}>
        Cancel Search
      </button>
      {searchResult && (
        <div>
          {searchResult.success ? (
            <p>Contract deployed at block {searchResult.blockNumber}</p>
          ) : (
            <p>Search failed: {searchResult.error}</p>
          )}
          <p>Current search block: {searchResult.currentSearchBlock}</p>
          <p>Search progress: {searchResult.percentageComplete}%</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
