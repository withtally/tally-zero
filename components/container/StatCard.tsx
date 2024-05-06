import { Stat } from "@/types/index";
import { Icons } from "@components/Icons";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";

function Star({ children, stat }: { children?: React.ReactNode; stat: Stat }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        <Icons.arrowRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export default function StatCards() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:grid md:grid-cols-3">
      <Star
        stat={{
          title: "Enter Governor Address",
        }}
      >
        <span className="text-sm pl-1 font-normal text-muted-foreground">
          You can choose one of the DAOs from our list, or enter the governor
          address
          <br />
          <span className="flex items-center space-x-2">
            Click on{" "}
            <Icons.orderbook className="mx-1 w-6 h-6 bg-gray-200 text-black rounded-md p-1" />
            to see the list of DAOs.
          </span>
        </span>
      </Star>
      <Star
        stat={{
          title: "Connect to contract",
        }}
      >
        <span className="text-sm pl-1 font-normal text-muted-foreground">
          You can connect to the contract by clicking on the button below.{" "}
          <br />
          <span className="flex items-center space-x-2">
            Click on{" "}
            <Icons.search className="mx-1 w-6 h-6 bg-gray-200 text-black rounded-md p-1" />
            to connect to the contract.
          </span>
        </span>
      </Star>
      <Star
        stat={{
          title: "Vote on proposals",
        }}
      >
        <span className="text-sm pl-1 font-normal text-muted-foreground">
          You can vote on the proposals by filling the form of the chosen active
          proposal. <br />
          <span className="flex items-center space-x-2">
            Click on{" "}
            <Icons.check className="mx-1 w-6 h-6 bg-gray-200 text-black rounded-md p-1" />
            to vote on the proposals.
          </span>
        </span>
      </Star>
    </div>
  );
}
