"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@components/ui/Button";
import { proposalSchema } from "@data/table/schema";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const proposal = proposalSchema.parse(row.original);
  // @FIXME: This is a hack to get the dropdown to close when clicking outside

  return (
    <Button
      variant="ghost"
      className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    >
      View proposal
    </Button>
  );
}
