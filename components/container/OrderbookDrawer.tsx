import { z } from "zod";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/Sheet";

import DaoCard from "@components/container/DaoCard";

import { daoSchema } from "@config/schema";
import { daos } from "@config/data";

async function getDAOs() {
  return z.array(daoSchema).parse(daos);
}

export default async function OrderbookSheet() {
  const daoList = await getDAOs();

  return (
    <SheetContent side="left" className="w-full sm:max-w-[550px]">
      <SheetHeader>
        <SheetTitle>Explore DAOs</SheetTitle>
        <SheetDescription>
          Explore the top DAOs on the platform and their current status.
        </SheetDescription>
      </SheetHeader>
      <div className="py-8 text-left overflow-auto h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {daoList.map((dao, index) => (
          <DaoCard key={index} {...dao} />
        ))}
      </div>
    </SheetContent>
  );
}
