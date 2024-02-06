"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";

import { cn } from "@lib/utils";

import { Icons } from "@components/Icons";
import { buttonVariants } from "@components/ui/Button";
import { Drawer, DrawerTrigger } from "@components/ui/Drawer";
import OrderbookDrawer from "@components/container/OrderbookDrawer";

export function ButtonNav() {
  const pathname = usePathname();
  const isExplore = pathname === "/explore";

  return (
    <nav>
      {isExplore ? (
        <div className="flex items-center gap-4 px-4 py-2">
          <Web3NetworkSwitch
            className={cn(buttonVariants({ variant: "default", size: "sm" }))}
          />
          <Web3Button />

          <Drawer>
            <DrawerTrigger className="flex items-center gap-2 px-4 py-3 text-white rounded-md bg-blue-500">
              <Icons.orderbook className="w-4 h-4" />
            </DrawerTrigger>
            <OrderbookDrawer />
          </Drawer>
        </div>
      ) : (
        <Link
          href="/explore"
          className={cn(
            buttonVariants({ variant: "default", size: "sm" }),
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
