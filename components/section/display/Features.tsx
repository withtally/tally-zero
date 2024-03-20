import { Icons } from "@components/Icons";
import SectionHeader from "@components/ui/SectionHeader";

export default function Features() {
  return (
    <section
      id="features"
      className="container space-y-6 py-8 md:py-12 lg:py-24"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <SectionHeader
          sectionTitle="Take a look at the features"
          title="Features of Tally Zero"
          description="Tally Zero is a decentralized governance platform that offers a range of features to enable secure, transparent, and decentralized voting on blockchain proposals."
        />
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.component className="h-12 w-12" />
            <div className="space-y-2">
              <h3 className="font-bold">Decentralized Voting</h3>
              <p className="text-sm text-muted-foreground">
                Secure, transparent voting on blockchain proposals.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.wallet className="h-12 w-12" />

            <div className="space-y-2">
              <h3 className="font-bold">Wallet Integration</h3>
              <p className="text-sm">
                Easy connection with digital wallets for authentication.
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.wifi className="h-12 w-12" />

            <div className="space-y-2">
              <h3 className="font-bold">IPFS Deployment</h3>
              <p className="text-sm text-muted-foreground">
                Hosted on IPFS for enhanced decentralization.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.liststart className="h-12 w-12" />

            <div className="space-y-2">
              <h3 className="font-bold">Proposal Browsing and Voting</h3>
              <p className="text-sm text-muted-foreground">
                Browse and vote on proposals effortlessly.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.blend className="h-12 w-12" />

            <div className="space-y-2">
              <h3 className="font-bold">Cross-Chain Support</h3>
              <p className="text-sm text-muted-foreground">
                Works across multiple blockchains for broad accessibility.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <Icons.packageopen className="h-12 w-12" />

            <div className="space-y-2">
              <h3 className="font-bold">Open Source</h3>
              <p className="text-sm text-muted-foreground">
                Community-driven development and improvement.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto text-center md:max-w-[58rem]">
        <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Tally Zero offers multi-chain support, IPFS deployment, and wallet
          integration.
        </p>
      </div>
    </section>
  );
}
