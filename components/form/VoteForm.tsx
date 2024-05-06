"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useContractWrite, usePrepareContractWrite } from "wagmi";

import { Button } from "@components/ui/Button";
import { Card, CardContent } from "@components/ui/Card";
import { DialogClose, DialogFooter } from "@components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@components/ui/RadioGroup";
import { ReloadIcon } from "@radix-ui/react-icons";

import { proposalSchema, voteSchema } from "@config/schema";
import { toast } from "sonner";

import OZ_Governor_ABI from "@data/OzGovernor_ABI.json";

export default function VoteForm({
  proposal,
}: {
  proposal: z.infer<typeof proposalSchema>;
}) {
  const form = useForm<z.infer<typeof voteSchema>>({
    resolver: zodResolver(voteSchema),
  });

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: OZ_Governor_ABI,
    address: `0x${proposal.contractAddress.slice(2)}`,
    functionName: "castVote",
    args: [proposal.id, form.getValues("vote")],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  if (data) {
    toast("Your vote has been submitted.");
  }

  async function onSubmit(values: z.infer<typeof voteSchema>) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      write?.();
    } catch (error) {
      console.log(error);
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
              isLoading ? (
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
