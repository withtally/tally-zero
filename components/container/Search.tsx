"use client";

import * as z from "zod";
import { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import { formSchema } from "@config/schema";
import { Form } from "@/components/ui/Form";
import { ContractParams } from "@/types/search";
import { zodResolver } from "@hookform/resolvers/zod";

import { Progress } from "@/components/ui/Progress";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/ColumnsProposals";
import ContractCard from "@/components/container/ContractCard";

import { State } from "@/types/search";
import { initialState } from "@config/intial-state";
import { useGovernorContract } from "@hooks/use-governor-contract";

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<State>(initialState);
  const [formContractParams, setFormContractParams] = useState<ContractParams>(
    {}
  );

  useEffect(() => {
    if (formContractParams.contractAddress && formContractParams.networkId) {
      setState(initialState);
      setState((prevState) => ({
        ...prevState,
        governor: {
          ...prevState.governor,
          address: formContractParams.contractAddress,
        },
      }));
    }
  }, [formContractParams]);

  const { overallProgress, formattedProposals } = useGovernorContract({
    values: formContractParams,
    state,
    setState,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormContractParams({
      contractAddress: `0x${values.address.slice(2)}`,
      networkId: values.networkId,
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
