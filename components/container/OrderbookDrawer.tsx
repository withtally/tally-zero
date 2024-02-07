import { z } from "zod";

import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerContent,
} from "@/components/ui/Drawer";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/ColumnsDOAs";

import { daoSchema } from "@/config/schema";
import { daos } from "@/config/data";

async function getDAOs() {
  return z.array(daoSchema).parse(daos);
}

export default async function OrderbookDrawer() {
  const fakeDAOs = await getDAOs();

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Explore DAOs</DrawerTitle>
        <DrawerDescription>
          Explore the top DAOs on the platform and their current status.
        </DrawerDescription>
      </DrawerHeader>
      <div className="px-4 py-2 overflow-auto max-h-[700px]">
        <DataTable
          isPaginated={false}
          columns={columns}
          data={fakeDAOs as any[]}
        />
      </div>
    </DrawerContent>
  );
}
