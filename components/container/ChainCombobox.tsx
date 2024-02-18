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

async function getChains() {
  const response = await fetch("https://chainid.network/chains.json");
  const chains = await response.json();
  return chains;
}

export default async function ChainCombobox({
  address,
  networkId,
}: {
  address?: string;
  networkId?: string;
}) {
  const data = await getChains();

  return (
    <PopoverContent className="w-[250px] p-0">
      <Command>
        <CommandInput placeholder="Search chain..." />
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup className="max-h-[200px] overflow-y-auto">
          {data.map(async (chain: Chain) => (
            <a
              key={chain.chainId}
              href={`/explore?address=${address}&networkId=${
                chain.chainId as number
              }`}
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
