import { z } from "zod";
import { formSchema } from "@config/schema";
import { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import ContractForm from "@/components/form/ContractForm";

interface ContractCardProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  progress: number;
}

export default function ContractCard({ form, progress }: ContractCardProps) {
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
        <ContractForm form={form} progress={progress} />
      </CardContent>
    </Card>
  );
}
