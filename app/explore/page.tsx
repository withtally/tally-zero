import ContractForm from "@components/contract/ContractCard";

export default async function IndexPage() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex flex-col gap-4 ">
        <h1 className="text-4xl font-bold">Search for a contract</h1>
        <ContractForm />
      </div>
    </section>
  );
}
