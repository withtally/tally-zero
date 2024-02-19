"use client";

import * as z from "zod";
import Image from "next/image";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { Icons } from "@components/Icons";
import { ReloadIcon } from "@radix-ui/react-icons";

import {
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

import OrderbookSheet from "@components/container/OrderbookDrawer";

import { formSchema } from "@config/schema";
import { daos } from "@config/data";

interface ContractFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function ContractForm({ form }: ContractFormProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<z.infer<typeof formSchema> | null>(
    null
  );

  const dao = daos.find((dao) => dao.ethAddress === formData?.address);

  return (
    <div>
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Ethereum address</FormLabel>
            <FormControl>
              <div className="relative flex items-center">
                <Input
                  className="pl-12"
                  placeholder="0x00000..."
                  autoComplete="off"
                  {...field}
                />
                <Sheet>
                  <SheetTrigger className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out">
                    <div className="flex items-center space-x-3 cursor-pointer">
                      <Icons.orderbook className="w-5 h-auto" />
                    </div>
                  </SheetTrigger>
                  <OrderbookSheet form={form} />
                </Sheet>
                {dao && (
                  <>
                    <div className="absolute right-0 flex items-center space-x-2 justify-center h-full px-3 text-black bg-gray-200 hover:text-violet-500 hover:bg-gray-200 rounded-r-md transition-colors duration-200 ease-in-out">
                      <Image
                        src={dao.imageUrl}
                        alt={dao.name}
                        width={50}
                        height={50}
                        className="rounded-md w-6 h-auto"
                        layout="fixed"
                      />
                      <span className="text-sm font-semibold hidden sm:block">
                        {dao.name}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </FormControl>
            <FormDescription>
              The address of the contract you want to explore.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="lg:grid lg:grid-cols-8 gap-4">
        <FormField
          control={form.control}
          name="networkId"
          render={({ field }) => (
            <FormItem className="col-span-5">
              <FormLabel>Network ID</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="Eg 1, 3, 4, 5, 42, 1337, ..."
                    autoComplete="off"
                    {...field}
                    className="pl-12"
                  />
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger
                      asChild
                      className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out"
                    >
                      <Icons.link className="w-10 h-auto" />
                    </PopoverTrigger>
                    {/** @ts-ignore
                     * Add the drawer component inside of the Form component
                    React.cloneElement(combobox, {
                      address: form.getValues("address"),
                      networkId: form.getValues("networkId"),
                    })
                    */}
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

        <FormField
          control={form.control}
          name="deploymentBlock"
          render={({ field }) => (
            <FormItem className="col-span-3 py-4 lg:py-0">
              <FormLabel>Deployment block</FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg 12345678"
                  autoComplete="off"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Hint: This is optional, but can speed up the search.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {loading ? (
        <Button variant={"secondary"} disabled className="mt-6 w-full">
          <ReloadIcon className="animate-spin w-5 h-5" />
          <span className="ml-2">Connecting to contract...</span>
        </Button>
      ) : (
        <Button type="submit" className="mt-6 w-full">
          <Icons.search /> Connect to contract
        </Button>
      )}
    </div>
  );
}
