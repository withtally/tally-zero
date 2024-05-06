"use client";

import { useEffect, useState } from "react";
import * as z from "zod";

import { Form } from "@/components/ui/Form";
import { ContractParams } from "@/types/search";
import { formSchema } from "@config/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ContractCard from "@/components/container/ContractCard";
import { columns } from "@/components/table/ColumnsProposals";
import { DataTable } from "@/components/table/DataTable";
import { Progress } from "@/components/ui/Progress";

import { State } from "@/types/search";
import { initialState } from "@config/intial-state";
import { useGovernorContract } from "@hooks/use-governor-contract";

export default function Search() {
  const [state, setState] = useState<State>(initialState);
  const [formContractParams, setFormContractParams] = useState<ContractParams>(
    {}
  );

  useEffect(() => {
    if (formContractParams.contractAddress && formContractParams.networkId) {
      setState((prevState) => ({
        ...prevState,
        governor: {
          ...prevState.governor,
          address: formContractParams.contractAddress,
        },
      }));
    }
  }, [formContractParams, setState]);

  const { overallProgress, formattedProposals } = useGovernorContract({
    values: formContractParams,
    state,
    setState,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setState(initialState);

    setFormContractParams({
      contractAddress: `0x${values.address.slice(2)}`,
      networkId: parseInt(values.networkId),
      deploymentBlock: values.deploymentBlock || 0,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <ContractCard form={form} progress={overallProgress} />

        <section id="proposals-table">
          {overallProgress > 0 && overallProgress < 100 && (
            <Progress className="mb-8" value={overallProgress} />
          )}

          {overallProgress === 100 && (
            <DataTable
              isPaginated={true}
              columns={columns}
              data={formattedProposals as any[]}
            />
          )}
        </section>
      </form>
    </Form>
  );
}
