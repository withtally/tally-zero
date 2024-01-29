"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";
import { DataTableViewOptions } from "@components/table/ViewOptions";

import { states } from "@data/table/data";
import { DataTableFacetedFilter } from "@components/table/FacetedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search proposers..."
          value={
            (table.getColumn("proposer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("proposer")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="State"
            options={states}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}