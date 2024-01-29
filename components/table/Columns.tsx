"use client";

import { ColumnDef } from "@tanstack/react-table";

import { proposalSchema } from "@data/table/schema";

import { DataTableColumnHeader } from "@components/table/ColumnHeader";
import { DataTableRowActions } from "@components/table/RowActions";
import { Badge } from "@components/ui/Badge";

import { states } from "@data/table/data";

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
    accessorKey: "startblock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("startblock")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "endblock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("endblock")}
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
        <div className="flex items-center">
          <Badge className="">
            <stateValue.icon /> {stateValue.label}
          </Badge>
        </div>
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
