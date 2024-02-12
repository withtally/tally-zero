import StatCards from "@/components/container/StatCard";
import Search from "@/components/container/Search";
import ContractCard from "@/components/container/ContractCard";

import { Icons } from "@components/Icons";

import { ContractAddress } from "@/types/search";

export const metadata = {
  title: "Explore",
};

async function fetchChains() {
  const res = await fetch("https://chainid.network/chains.json");
  return res.json();
}

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const address = searchParams.address;
  const networkId = searchParams.networkId;
  const chains = await fetchChains();

  return (
    <div className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
      <div className="container flex flex-col gap-4 ">
        <StatCards />

        <ContractCard
          address={address as string}
          networkId={networkId as string}
          chains={chains}
        />

        <Search
          contractAddress={address as ContractAddress}
          networkId={networkId as string}
        />
      </div>
    </div>
  );
}
