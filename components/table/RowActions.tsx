"use client";

import { Row } from "@tanstack/react-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@components/ui/Dialog";
import { Badge } from "@components/ui/Badge";

import { cn } from "@lib/utils";
import { proposalSchema } from "@data/table/schema";
import { states } from "@data/table/data";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const proposal = proposalSchema.parse(row.original);
  const stateValue = states.find(
    (state) => state.value === row.getValue("state")
  );

  if (!stateValue) {
    return null;
  }

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
              navigator.clipboard.writeText(proposal.proposer);
            }}
          >
            Copy Proposer Address
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between py-4">
              <span>Proposal #{proposal.id} </span>
              <Badge
                className={cn(
                  "text-xs font-semibold inline-flex items-center",
                  stateValue.bgColor
                )}
              >
                <stateValue.icon
                  className="mr-1"
                  style={{ strokeWidth: "2" }}
                />
                {stateValue.label}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="max-h-[400px] overflow-y-auto">
            <h3 className="text-sm font-semibold">Description</h3>
            <p className="text-sm px-[2px]">{proposal.description}</p>
          </DialogDescription>

          <span>Working on the form Checkbox lols...</span>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button type="submit">Vote</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
