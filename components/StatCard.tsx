import { Stat } from "@/types/index";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/Card";

export default function StatCard(stat: Stat & { children?: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
        {stat.children}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {stat.value}
          <span className="text-sm pl-1 font-normal text-muted-foreground">
            {stat.unit}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{stat.description}</p>
      </CardContent>
    </Card>
  );
}
