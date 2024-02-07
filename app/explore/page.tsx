import { z } from "zod";

import StatCard from "@/components/container/StatCard";
import Search from "@/components/container/Search";
import ContractCard from "@/components/container/ContractCard";

import { Icons } from "@components/Icons";

import { ContractAddress } from "@/types/search";
import { proposalSchema, statsSchema } from "@config/schema";
import { proposals, stats } from "@config/data";

export const metadata = {
  title: "Explore",
};

async function getProposals() {
  return z.array(proposalSchema).parse(proposals);
}

async function getStats() {
  return statsSchema.parse(stats);
}

export default async function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const address = searchParams.address;
  const networkId = searchParams.networkId;

  const proposals = await getProposals();
  const stats = await getStats();

  return (
    <div className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-20">
      <div className="container flex flex-col gap-4 ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:grid md:grid-cols-3">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              unit={stat.unit}
              description={stat.description}
            >
              <Icons.arrowRight className="h-4 w-4 text-muted-foreground" />
            </StatCard>
          ))}
        </div>

        <ContractCard
          address={address as string}
          networkId={networkId as string}
        />

        <Search
          fakeProposals={proposals}
          contractAddress={address as ContractAddress}
          networkId={networkId as string}
        />
      </div>
    </div>
  );
}
