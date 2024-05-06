"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import VoteModel from "@/components/container/VoteModel";
import { Button } from "@components/ui/Button";
import { Dialog, DialogTrigger } from "@components/ui/Dialog";
import { Drawer, DrawerTrigger } from "@components/ui/Drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";

import { proposalSchema } from "@config/schema";
import { states } from "@data/table/data";

import { useMediaQuery } from "@hooks/use-media-query";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const proposal = proposalSchema.parse(row.original);
  const stateValue = states.find(
    (state) => state.value === row.getValue("state")
  );

  if (!stateValue) {
    return null;
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="w-4 h-4 " />
              <span className="sr-only" data-state={proposal.state}>
                View proposal
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <span>
                  View Proposal <span className="sr-only">{proposal.id}</span>
                </span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(proposal.id.toString());
              }}
            >
              Copy Proposal ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <VoteModel
          proposal={proposal}
          stateValue={stateValue}
          isDesktop={isDesktop}
        />
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="w-4 h-4 " />
            <span className="sr-only" data-state={proposal.state}>
              View proposal
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          <DrawerTrigger asChild>
            <DropdownMenuItem>
              <span>
                View Proposal <span className="sr-only">{proposal.id}</span>
              </span>
            </DropdownMenuItem>
          </DrawerTrigger>
          <DropdownMenuItem
            onClick={() => {
              navigator.clipboard.writeText(proposal.proposer);
            }}
          >
            Copy Proposer Address
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <VoteModel
        proposal={proposal}
        stateValue={stateValue}
        isDesktop={isDesktop}
      />
    </Drawer>
  );
}
