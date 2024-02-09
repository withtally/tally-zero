// chain.d.ts
export interface Chain {
  name: string;
  chain: string;
  icon?: string;
  rpc: string[];
  features: Feature[];
  faucets: string[];
  nativeCurrency: NativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens?: Ens;
  explorers: Explorer[];
  title?: string;
}

interface Feature {
  name: string;
}

interface NativeCurrency {
  name: string;
  symbol: string;
  decimals: number;
}

interface Ens {
  registry: string;
}

interface Explorer {
  name: string;
  url: string;
  icon?: string;
  standard: string;
}
