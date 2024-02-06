"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/Badge";
import { DescriptionCell } from "@components/ui/DescriptionCell";
import { DataTableColumnHeader } from "@components/table/ColumnHeader";

import { cn } from "@lib/utils";
import { states } from "@data/table/data";
import { daoSchema } from "@config/schema";

import { DotIcon } from "lucide-react";

export const columns: ColumnDef<typeof daoSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "proposalsSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proposals" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          <DescriptionCell mdxContent={row.getValue("proposalsSum")} />
        </div>
      );
    },
  },
  {
    accessorKey: "holdersSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("holdersSum")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "votersSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="End Block" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("votersSum")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "provider",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provider" />
    ),
    cell: ({ row }) => {
      const stateValue = states.find(
        (state) => state.value === row.getValue("provider")
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
];
