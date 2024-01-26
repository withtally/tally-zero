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

const formSchema = z.object({
  // #TODO Ask for address conditions as well as networkid
  address: z.string(),
  networkId: z.string(),
});

export default function ContractForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      networkId: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
                <Input placeholder="0x00000..." {...field} />
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
                <Input placeholder="1" {...field} />
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
