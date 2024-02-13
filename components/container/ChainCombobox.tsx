import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@components/ui/Command";
import { Icons } from "@components/Icons";
import { PopoverContent } from "@components/ui/Popover";

import { Chain } from "@/types/chain";

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
              href={`/explore?address=${address}&networkId=${chain.chainId as number}`}
            >
              <CommandItem
                value={chain.name}
                className="flex items-center cursor-pointer text-sm transition-colors duration-200 ease-in-out"
              >
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
