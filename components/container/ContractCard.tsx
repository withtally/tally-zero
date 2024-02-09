import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/Popover";
import { Separator } from "@components/ui/Separator";
import ContractForm from "@/components/form/ContractForm";
import OrderbookSheet from "@components/container/OrderbookDrawer";

import { InfoCircledIcon } from "@radix-ui/react-icons";

export default function ContractCard({
  address,
  networkId,
}: {
  address: string;
  networkId: string;
}) {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>Search for a contract</span>
            <Popover>
              <PopoverTrigger>
                <InfoCircledIcon
                  className="w-6 h-6 cursor-help"
                  aria-label="What is this?"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h3 className="text-lg font-bold">Enter Governor Address</h3>
                <p className="text-sm">
                  Tally Zero is a simplified, open-source, zero-dependency
                  governance front end served via IPFS. Vote on Governor
                  proposals directly onchain without the possiblity of
                  censorship or downtime.
                </p>
                <Separator className="my-4" />
                <h3 className="text-lg font-bold">Connect to contract</h3>
                <p className="text-sm">
                  The app will search for created proposals. This may take some
                  time depending on your wallets RPC provider.
                </p>
                <Separator className="my-4" />
                <h3 className="text-lg font-bold">Vote on proposals</h3>
                <p className="text-sm">
                  If there are any active proposals, they will appear at the top
                  where they can be selected and voted upon.
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </CardTitle>
        <CardDescription>
          Tally Zero is a simplified, open-source, zero-dependency governance
          front end served via IPFS. Vote on Governor proposals directly onchain
          without the possiblity of censorship or downtime.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ContractForm
          address={address}
          networkId={networkId}
          sheet1={
            <div>
              <OrderbookSheet />
            </div>
          }
          sheet2={
            <div>
              {/* #TODO: Update this with the chain sheet */}
              <OrderbookSheet />
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
