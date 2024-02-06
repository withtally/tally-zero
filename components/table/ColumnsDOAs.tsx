"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@components/ui/Badge";
import { DataTableColumnHeader } from "@components/table/ColumnHeader";

import { cn } from "@lib/utils";
import { states } from "@data/table/data";
import { daoSchema } from "@config/schema";

export const columns: ColumnDef<typeof daoSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const stateValue = states.find(
        // @ts-ignore
        (state) => state.value === row.original.state
      );

      if (!stateValue) return null;

      return (
        <div className="flex space-x-2">
          <Image
            //@ts-ignore
            src={row.original.imageUrl}
            alt={row.getValue("name")}
            width={32}
            height={32}
            className="rounded-full h-8 w-8 sm:h-10 sm:w-10"
          />
          <span className="py-2 px-2 text-left text-base font-bold">
            {row.getValue("name")}
          </span>

          {stateValue.label === "Active" && (
            <Badge
              className={cn(
                "hidden md:inline-flex items-center px-4 text-xs font-bold hover:bg-current/10 transition-colors duration-200 ease-in-out",
                stateValue.bgColor
              )}
            >
              {stateValue.label}
            </Badge>
          )}
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
        <span className="max-w-[500px] truncate font-medium">
          {row.getValue("proposalsSum")}
        </span>
      );
    },
  },
  {
    accessorKey: "holdersSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Holders" />
    ),
    cell: ({ row }) => {
      const holdersSum = row.getValue("holdersSum");

      const formatNumber = (num: number) => {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + "K";
        } else {
          return num;
        }
      };

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatNumber(holdersSum as number)}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "votersSum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Voters" />
    ),
    cell: ({ row }) => {
      const voterSum = row.getValue("votersSum");

      const formatNumber = (num: number) => {
        if (num >= 1000000) {
          return (num / 1000000).toFixed(1) + "M";
        } else if (num >= 1000) {
          return (num / 1000).toFixed(1) + "K";
        } else {
          return num;
        }
      };
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatNumber(voterSum as number)}
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
      const provider = row.getValue("provider");

      return (
        <Badge>
          <Image
            //@ts-ignore
            src={provider.imageUrl}
            alt={row.getValue("name")}
            width={250}
            height={250}
            className="rounded-full h-4 w-auto bg-current/20"
          />
          <span className="px-1 text-sm font-bold">
            {/* @ts-ignore */}
            {provider.name}
          </span>
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
