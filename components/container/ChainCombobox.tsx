import * as React from "react";
import Image from "next/image";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/Command";
import { Icons } from "@components/Icons";
import { PopoverContent } from "@components/ui/Popover";
import { ChainCard } from "@components/container/Chain";

import { Chain } from "@/types/chain";

/* async function getImageUrl(icon: string) {
  const url = `https://raw.githubusercontent.com/ethereum-lists/chains/master/_data/icons/${icon}.json`;
  console.log(url);
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch icon: ${res.statusText}`);
  }

  const data = await res.json();
  return data[0].url;
} */

export default async function ChainCombobox({
  chains,
  address,
}: {
  chains: Chain[];
  address: string;
}) {
  if (address === undefined) {
    address = "";
  }

  return (
    <PopoverContent className="w-[250px] p-0">
      <Command>
        <CommandInput placeholder="Search chain..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup className="max-h-[200px] overflow-y-auto">
          {chains.map(async (chain) => (
            <a
              key={chain.chainId}
              href={`/explore?address=${address}&networkId=${chain.chainId}`}
            >
              <CommandItem
                value={chain.name}
                className="flex items-center cursor-pointer text-sm transition-colors duration-200 ease-in-out"
              >
                {/*                 {chain.icon && (
                  <img
                    src={await getImageUrl(chain.icon as string)}
                    alt={chain.name}
                    className="rounded-md"
                  />
                )} */}
                <Icons.link className="w-4 h-4 pr-1" />
                {chain.name}
                <Icons.chevronRight className="w-4 h-4 ml-auto text-purple-500" />
              </CommandItem>
            </a>
          ))}
        </CommandGroup>
      </Command>
    </PopoverContent>
  );
}
