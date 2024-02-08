"use client";

import { Stat } from "@/types/index";
import { useState } from "react";
import { Skeleton } from "@components/ui/Skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";

import { useTotalVotes } from "@hooks/use-total-votes";
import { useTotalProposals } from "@hooks/use-total-proposals";

import { displayUserAddress } from "@lib/user-address";

function StartSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="w-20 h-4" />
        </CardTitle>
        <Skeleton className="w-6 h-6" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold py-2">
          <Skeleton className="w-32 h-5" />
        </div>

        <div className="text-2xl font-bold">
          <Skeleton className="w-14 h-3" />
        </div>
      </CardContent>
    </Card>
  );
}

function Star(stat: Stat & { children?: React.ReactNode }) {
  if (stat.isLoading) {
    return <StartSkeleton />;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        {stat.children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stat.value}
          <span className="text-sm pl-1 font-normal text-muted-foreground">
            {stat.unit}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
      </CardContent>
    </Card>
  );
}

export default function StatCards({
  address,
  children,
}: {
  children: React.ReactNode;
  address: string;
}) {
  // Get the total number of proposals
  const { totalProposals, isLoadingTotal } = useTotalProposals(
    address as string
  );

  // Get the user address
  const [userAddress, setUserAddress] = useState("0x0" as string);
  displayUserAddress()
    .then((userAddress) => {
      setUserAddress(userAddress as string);
    })
    .catch((error) => {
      console.error("Failed to get user's address:", error);
    });

  // Get the total number of votes
  const { totalVotes, isLoadingVote } = useTotalVotes({
    userAddress: userAddress as string,
    governanceContractAddress: address as string,
  });

  // #TODO: Get 'My Proposition Power' from the contract

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:grid md:grid-cols-3">
      <Star
        title="Total Proposals"
        value={totalProposals || 0}
        unit="proposals"
        contractAddress={address}
        isLoading={isLoadingTotal}
        description="The total number of proposals created on this governance contract"
      >
        {children}
      </Star>
      <Star
        title="My Vote"
        value={totalProposals || 0}
        unit="votes"
        totalVoting={totalVotes || 0}
        isLoading={isLoadingVote}
        description="The total number of votes cast by the current user"
      >
        {children}
      </Star>
      <Star
        title="My Proposition Power"
        value={totalProposals || 0}
        unit="proposition power"
        contractAddress={address}
        isLoading={isLoadingTotal}
        description="The power of your proposals"
      >
        {children}
      </Star>
    </div>
  );
}
