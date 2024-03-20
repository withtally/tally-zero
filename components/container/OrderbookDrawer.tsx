import * as z from "zod";

import { daos } from "@config/data";
import { formSchema } from "@config/schema";
import { UseFormReturn } from "react-hook-form";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@components/ui/Sheet";
import DaoCard from "@components/container/DaoCard";

interface OrderbookSheetProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function OrderbookSheet({ form }: OrderbookSheetProps) {
  return (
    <SheetContent side="left" className="w-full sm:max-w-[550px]">
      <SheetHeader>
        <SheetTitle>Explore DAOs</SheetTitle>
        <SheetDescription>
          Explore the top DAOs on the platform and their current status.
        </SheetDescription>
        <div className="py-8 text-left overflow-auto h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {daos.map((dao, index) => (
            <DaoCard key={index} dao={dao} form={form} />
          ))}
        </div>
      </SheetHeader>
    </SheetContent>
  );
}
