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

export default function ContractCard({}: {}) {
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
          sheet={
            <div>
              <OrderbookSheet />
            </div>
          }
          combobox={
            <div>
              <ChainCombobox />
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}
