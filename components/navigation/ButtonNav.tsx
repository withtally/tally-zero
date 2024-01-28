"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";

import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";
import { buttonVariants } from "@components/ui/Button";
import { Icons } from "@components/Icons";

export function ButtonNav() {
  const pathname = usePathname();
  const isExplore = pathname === "/explore";

  return (
    <nav>
      {isExplore ? (
        <div className="flex items-center gap-4 px-4 py-2">
          <Web3NetworkSwitch
            className={cn(buttonVariants({ variant: "secondary", size: "sm" }))}
          />
          <Web3Button />
        </div>
      ) : (
        <Link
          href="/explore"
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
          )}
        >
          <Icons.search className="w-4 h-4 mr-2" />
          Start exploring
        </Link>
      )}
    </nav>
  );
}
