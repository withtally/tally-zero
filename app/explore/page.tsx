import ContractCard from "@components/contract/ContractCard";
import Search from "@/components/table/Search";

import { ContractAddress } from "@/types/search";

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const address = searchParams.address;
  const networkId = searchParams.networkId;

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold">Search for a contract</h1>
        <ContractCard
          address={address as string}
          networkId={networkId as string}
        />

        <Search
          contractAddress={address as ContractAddress}
          networkId={networkId as string}
        />
      </div>
    </section>
  );
}
