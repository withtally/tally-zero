import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import ContractForm from "@/components/form/ContractForm";
import ChainCombobox from "@components/container/ChainCombobox";
import OrderbookSheet from "@components/container/OrderbookDrawer";

export default function ContractCard({
  address,
  networkId,
  deploymentBlock,
  chains,
}: {
  address: string;
  networkId: string;
  deploymentBlock: string;
  chains: any;
}) {
  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>Search for a contract</span>
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
          deploymentBlock={deploymentBlock}
          sheet={
            <div>
              <OrderbookSheet />
            </div>
          }
          combobox={
            <div>
              <ChainCombobox chains={chains} address={address} />
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
