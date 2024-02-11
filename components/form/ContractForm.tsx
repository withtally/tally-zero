"use client";

import * as z from "zod";
import React, { useEffect, useState, cloneElement } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "@components/Icons";
import { ReloadIcon } from "@radix-ui/react-icons";

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
import { Button } from "@components/ui/Button";
import { Sheet, SheetTrigger } from "@components/ui/Sheet";
import { Popover, PopoverTrigger } from "@components/ui/Popover";

import { formSchema } from "@config/schema";

export default function ContractForm({
  address,
  networkId,
  sheet,
  combobox,
}: {
  address: string;
  networkId: string;
  sheet: React.ReactNode;
  combobox: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
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
                <div className="relative flex items-center">
                  <Input
                    placeholder="0x00000..."
                    autoComplete="off"
                    {...field}
                    className="pl-12 pr-10 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Sheet>
                    <SheetTrigger className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out">
                      <Icons.orderbook className="w-4 h-4" />
                    </SheetTrigger>
                    {/** @ts-ignore */}
                    {React.cloneElement(sheet)}
                  </Sheet>
                </div>
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
                <div className="relative flex items-center">
                  <Input
                    placeholder="Eg 1, 3, 4, 5, 42, 1337, ..."
                    autoComplete="off"
                    {...field}
                    className="pl-12 pr-10 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      asChild
                      className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out"
                    >
                      <Icons.link className="w-10 h-auto" />
                    </PopoverTrigger>
                    {/** @ts-ignore */}
                    {React.cloneElement(combobox, {
                      address: form.getValues("address"),
                      networkId: form.getValues("networkId"),
                    })}
                  </Popover>
                </div>
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
