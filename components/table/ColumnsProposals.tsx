"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/Badge";
import { DescriptionCell } from "@components/ui/DescriptionCell";
import { ProposerCell } from "@components/container/ProposerCell";
import { DataTableRowActions } from "@components/table/RowActions";
import { DataTableColumnHeader } from "@components/table/ColumnHeader";

import { cn } from "@lib/utils";
import { states } from "@data/table/data";
import { proposalSchema } from "@config/schema";

import { DotIcon } from "lucide-react";

export const columns: ColumnDef<typeof proposalSchema>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposal ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px] truncate">{row.getValue("id")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "proposer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposer" />
    ),
    cell: ({ row }) => <ProposerCell proposer={row.getValue("proposer")} />,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposal" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 w-[450px]">
          <DescriptionCell mdxContent={row.getValue("description")} />
        </div>
      );
    },
  },
  {
    accessorKey: "startBlock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("startBlock")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endBlock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("endBlock")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      const stateValue = states.find(
        (state) => state.value === row.getValue("state")
      );
      if (!stateValue) return null;

      return (
        <Badge
          className={cn(
            "text-xs font-bold inline-flex items-center pr-5 -py-1 hover:bg-current/10 transition-colors duration-200 ease-in-out",
            stateValue.bgColor
          )}
        >
          <DotIcon className="mr-1" style={{ strokeWidth: "3" }} />
          {stateValue.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "vote",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
