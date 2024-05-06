"use client";

import React, { useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { SearchIcon } from "lucide-react";

import { DataTableViewOptions } from "@components/table/ViewOptions";
import { Button } from "@components/ui/Button";
import { Input } from "@components/ui/Input";

import { DataTableFacetedFilter } from "@components/table/FacetedFilter";
import { states } from "@data/table/data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    table.getColumn("description")?.setFilterValue(value);
    table.getColumn("name")?.setFilterValue(value);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative">
          <SearchIcon className="absolute top-1/2 left-3 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search ..."
            value={searchValue}
            onChange={handleSearchChange}
            className="pl-12 h-12 w-[150px] lg:w-[450px]"
          />
        </div>

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
            className="h-12 px-2 lg:px-3 hover:bg-red-500"
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
