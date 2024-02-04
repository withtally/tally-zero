"use client";

import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@components/Icons";
import { ReloadIcon } from "@radix-ui/react-icons";

import { Button } from "@components/ui/Button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { formSchema } from "@config/schema";

export default function ContractForm({
  address,
  networkId,
}: {
  address: string;
  networkId: string;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: address || "",
      networkId: networkId || "",
    },
  });

  useEffect(() => {
    const getAddress = new URLSearchParams(window.location.search).get(
      "address"
    );
    const getNetworkId = new URLSearchParams(window.location.search).get(
      "networkId"
    );
    if (getAddress && getNetworkId) {
      setLoading(true);
    }
    
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?address=${values.address}&networkId=${values.networkId}`
    );

    const section = document.getElementById("proposals-table");
    if (section) {
      section.scrollIntoView({
        behavior: "auto",
        inline: "center",
      });
    }

    window.location.reload();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Ethereum address</FormLabel>
              <FormControl>
                <Input placeholder="0x00000..." autoComplete="off" {...field} />
              </FormControl>
              <FormDescription>
                The address of the contract you want to explore.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="networkId"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Network ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg 1, 3, 4, 5, 42, 1337, ..."
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The network ID of the contract you want to explore.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {loading ? (
          <Button variant={"secondary"} disabled className="flex-1 gap-2">
            <ReloadIcon className="animate-spin w-5 h-5" />
            <span className="ml-2">Connecting to contract...</span>
          </Button>
        ) : (
          <Button type="submit" className="flex-1 gap-2">
            <Icons.search /> Connect to contract
          </Button>
        )}
      </form>
    </Form>
  );
}
