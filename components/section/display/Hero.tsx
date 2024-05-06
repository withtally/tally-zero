import { siteConfig } from "@config/site";
import Link from "next/link";

import { Icons } from "@components/Icons";

import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-bold text-3xl text-violet-600 dark:text-violet-400 sm:text-5xl md:text-6xl lg:text-7xl">
          Decentralized Voting Made Simple
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          A robust, open-source platform for onchain voting, Tally Zero ensures
          accessibility and transparency, leveraging React and IPFS for true
          decentralization.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="/explore">
            <Button>
              Start Voting <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Button variant="outline">
              GitHub
              <Icons.gitHub className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
