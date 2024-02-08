"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

import { cn } from "@lib/utils";
import { Web3NetworkSwitch, Web3Button } from "@web3modal/react";

import { Icons } from "@components/Icons";
import { buttonVariants } from "@components/ui/Button";
import { Sheet, SheetTrigger } from "@components/ui/Sheet";

const Skeleton = ({ className }: { className?: string }) => (
  <div aria-live="polite" aria-busy="true" className={className}>
    <span className="inline-flex w-full h-[38px] animate-pulse select-none rounded-md bg-gray-300 leading-none">
      ‌
    </span>
    <br />
  </div>
);

const LoadingSkeleton = () => (
  <>
    <div className="inline-flex items-center justify-center transition-colors h-10 px-4 py-2">
      <Skeleton className="w-[158px]  max-w-full" />
    </div>
  </>
);

export function ButtonNav({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isExplore = pathname === "/explore";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <nav>
      {isExplore ? (
        <div className="flex items-center gap-2 px-4 py-2">
          {loading ? (
            <div className="px-0">
              <LoadingSkeleton />
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <Web3NetworkSwitch />
              <Web3Button />
            </>
          )}

          <Sheet>
            <SheetTrigger className="flex items-center gap-2 px-4 py-3 text-white rounded-md bg-blue-500">
              <Icons.orderbook className="w-4 h-4" />
            </SheetTrigger>

            {children}
          </Sheet>
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
