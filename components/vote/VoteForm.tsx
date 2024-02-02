"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/Form";
import { Button } from "@components/ui/Button";
import { DialogClose, DialogFooter } from "@components/ui/Dialog";
import { RadioGroup, RadioGroupItem } from "@components/ui/RadioGroup";

import { voteSchema } from "@config/schema";

export default function VoteForm() {
  const form = useForm<z.infer<typeof voteSchema>>({
    resolver: zodResolver(voteSchema),
  });

  function onSubmit(values: z.infer<typeof voteSchema>) {
    // #TODO: Metamask voting logic
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="for" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I&apos;m in favor of this proposal
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="against" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Against the proposal
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="abstrain" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I&apos;m abstaining
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Your vote will be public and cannot be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Vote</Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
