"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Icons } from "@components/Icons";

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
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: address || "",
      networkId: networkId || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    window.history.pushState(
      {},
      "",
      `?address=${values.address}&networkId=${values.networkId}`
    );
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

        <Button type="submit" className="flex-1 gap-2">
          <Icons.search /> Connect to contract
        </Button>
      </form>
    </Form>
  );
}
