import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/Card";
import ContractForm from "@components/contract/ContractForm";


export default function ContractCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contract form</CardTitle>
        <CardDescription>IDK lols, just a description</CardDescription>
      </CardHeader>
      <CardContent>
        <ContractForm />
      </CardContent>
    </Card>
  );
}
