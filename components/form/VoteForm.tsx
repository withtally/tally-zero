"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePrepareContractWrite, useContractWrite } from "wagmi";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { Card, CardContent } from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { DialogClose, DialogFooter } from "@components/ui/Dialog";
import { RadioGroup, RadioGroupItem } from "@components/ui/RadioGroup";
import { ReloadIcon } from "@radix-ui/react-icons";

import { toast } from "sonner";
import { voteSchema } from "@config/schema";
import { ParsedProposal } from "@/types/proposal";

import OZ_Governor_ABI from "@data/OzGovernor_ABI.json";

export default function VoteForm({ proposal }: { proposal: ParsedProposal }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof voteSchema>>({
    resolver: zodResolver(voteSchema),
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: OZ_Governor_ABI,
    address: new URLSearchParams(window.location.search).get(
      "address"
    ) as `0x${string}`,
    functionName: "castVote",
    args: [proposal.id, form.getValues("vote")],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  async function onSubmit(values: z.infer<typeof voteSchema>) {
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast("Your vote has been submitted.");
      write?.();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-0 -m-4 mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="grid gap-1">
            <FormField
              control={form.control}
              name="vote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What would you like to vote?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="-mx-2 flex items-start space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                        <FormItem className="flex items-center space-x-3 space-y-0 py-2 px-2">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m in favor of this proposal
                          </FormLabel>
                        </FormItem>
                      </div>
                      <div className="-mx-2 flex items-start space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                        <FormItem className="flex items-center space-x-3 space-y-0  py-2 px-2">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Against the proposal
                          </FormLabel>
                        </FormItem>
                      </div>
                      <div className="-mx-2 flex items-start space-x-4 rounded-md transition-all hover:bg-accent hover:text-accent-foreground">
                        <FormItem className="flex items-center space-x-3 space-y-0 py-2 px-2">
                          <FormControl>
                            <RadioGroupItem value="2" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            I&apos;m abstaining
                          </FormLabel>
                        </FormItem>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Your vote will be public and cannot be changed.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>

            {proposal.state === "active" ? (
              loading ? (
                <Button variant="secondary" disabled>
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Voting
                </Button>
              ) : isSuccess ? (
                <Button variant="secondary" disabled>
                  Voted
                </Button>
              ) : (
                <Button type="submit">Vote</Button>
              )
            ) : (
              <Button variant="destructive" disabled>
                Cannot vote
              </Button>
            )}
          </DialogFooter>
        </form>
      </Form>
    </Card>
  );
}
