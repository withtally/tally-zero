"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@lib/utils";
import { siteConfig } from "@config/site";

import { buttonVariants } from "@components/ui/Button";
import { Icons } from "@components/Icons";

export function ButtonNav() {
  const pathname = usePathname();
  const isExplore = pathname === "/explore";

  return (
    <nav>
      {isExplore ? (
        <Link
          href={siteConfig.links.github}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
          )}
        >
          <Icons.gitHub className="w-4 h-4 mr-2" />
          Github
        </Link>
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
