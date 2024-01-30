"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@components/table/ColumnHeader";
import { DataTableRowActions } from "@components/table/RowActions";
import { Badge } from "@components/ui/Badge";

import { cn } from "@lib/utils";
import { states } from "@data/table/data";
import { proposalSchema } from "@data/table/schema";

export const columns: ColumnDef<typeof proposalSchema>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposal ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "proposer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("proposer")}
          </span>
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
            "text-xs font-semibold inline-flex items-center",
            stateValue.bgColor
          )}
        >
          <stateValue.icon className="mr-1" style={{ strokeWidth: "2" }} />
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
