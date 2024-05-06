import Link from "next/link";

import { siteConfig } from "@config/site";
import { cn } from "@lib/utils";

import { ModeToggle } from "@/components/ModeToggel";
import { Icons } from "@components/Icons";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo />
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <Link
              href={siteConfig.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tally
            </Link>
            . Hosted on{" "}
            <Link
              href="https://docs-ipfs-tech.ipns.dweb.link/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              IPFS
            </Link>
            . The source code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
        <ModeToggle />
      </div>
    </footer>
  );
}
