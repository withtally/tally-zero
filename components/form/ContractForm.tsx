"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

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

import { daos } from "@config/data";
import { DAO, formSchema } from "@config/schema";

interface ContractFormProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  progress: number;
}

export default function ContractForm({ form, progress }: ContractFormProps) {
  const [currDao, setCurrDao] = useState<DAO | undefined>();

  const addressWatched = form.watch("address");

  useEffect(() => {
    const dao = daos.find((dao) =>
      dao.ethAddresses.some(
        (ethAddress) => ethAddress === addressWatched?.toLowerCase()
      )
    );
    setCurrDao(dao);
    // avoid overriding networkId if user has already entered it
    if (dao && !form.getValues("networkId")) {
      form.setValue("networkId", String(dao.networkId));
    }
  }, [addressWatched]);

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
                  disabled={progress === 100 || progress > 0}
                  {...field}
                />
                <div className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out">
                  <div className="flex items-center space-x-3">
                    <Icons.orderbook className="w-5 h-auto" />
                  </div>
                </div>
                {currDao && (
                  <div className="absolute right-0 flex items-center space-x-2 justify-center h-full px-3 text-black bg-gray-200 hover:text-violet-500 hover:bg-gray-200 rounded-r-md transition-colors duration-200 ease-in-out">
                    <Image
                      src={currDao.imageUrl}
                      alt={currDao.name}
                      width={50}
                      height={50}
                      className="rounded-md w-6 h-auto"
                      layout="fixed"
                    />
                    <span className="text-sm font-semibold hidden sm:block">
                      {currDao.name}
                    </span>
                  </div>
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
                    disabled={progress === 100 || progress > 0}
                  />
                  <div className="absolute left-0 flex items-center justify-center h-full px-3 text-black bg-gray-200/45 hover:text-violet-500 hover:bg-gray-200 rounded-l-md transition-colors duration-200 ease-in-out">
                    <Icons.link className="w-5 h-auto" />
                  </div>
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
                  disabled={progress === 100 || progress > 0}
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

      {progress > 0 && progress !== 100 ? (
        <Button variant={"secondary"} disabled className="mt-6 w-full">
          <ReloadIcon className="animate-spin w-5 h-5" />
          <span className="ml-2">Connecting to contract...</span>
        </Button>
      ) : progress === 100 ? (
        <Button
          variant={"secondary"}
          onClick={() => window.location.reload()}
          className="mt-6 w-full"
        >
          <Icons.refresh className="w-5 h-5" />
          <span className="ml-2">Search for another contract</span>
        </Button>
      ) : (
        <Button type="submit" className="mt-6 w-full">
          <Icons.search className="w-5 h-6" /> Connect to contract
        </Button>
      )}
    </div>
  );
}
