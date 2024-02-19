"use client";

import { z } from "zod";

import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { daoSchema, formSchema } from "@config/schema";
import { CopyIcon, CheckIcon, ArrowRight } from "lucide-react";

import { SheetClose } from "@components/ui/Sheet";
import { Card, CardContent, CardDescription } from "@components/ui/Card";

interface DaoCardProps {
  dao: z.infer<typeof daoSchema>;
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

export default function DaoCard({ dao, form }: DaoCardProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(dao.ethAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  const updateForm = () => {
    form.setValue("address", dao.ethAddress);
    form.setValue("networkId", dao.networkId);
  };

  return (
    <Card className="rounded-xl my-2">
      <CardContent className="flex items-start space-x-4 py-2">
        <SheetClose onClick={updateForm}>
          <Image
            src={dao.imageUrl}
            alt={dao.name}
            width={64}
            height={64}
            className="rounded-full flex-shrink-0 pt-1 -ml-2"
          />
        </SheetClose>
        <div className="flex flex-col justify-center py-2">
          <div className="flex justify-between items-center w-full">
            <SheetClose
              className="flex items-center space-x-2 cursor-pointer"
              onClick={updateForm}
            >
              <span className="text-lg font-semibold">{dao.name}</span>
              <Card className="rounded-sm">
                <CardDescription
                  onClick={handleCopyClick}
                  className="flex items-center px-1 py-0 space-x-2 text-purple-500 hover:text-purple-800 transition-colors duration-200 ease-in-out cursor-pointer"
                >
                  <span className="text-xs  font-mono truncate">
                    Chain ID: {dao.networkId}
                  </span>
                </CardDescription>
              </Card>
            </SheetClose>
            <SheetClose
              onClick={updateForm}
              className="text-sm text-purple-500 hover:text-purple-600 transition-colors duration-200 ease-in-out flex items-center"
            >
              Connect
              <ArrowRight className="w-4 h-4 ml-2" />
            </SheetClose>
          </div>

          <CardDescription>
            <Card className="rounded-sm">
              <CardDescription
                onClick={handleCopyClick}
                className="flex items-center px-2 py-1 space-x-2 hover:text-purple-800 transition-colors duration-200 ease-in-out cursor-pointer"
              >
                <p className="hidden sm:block text-gray-500 font-mono truncate hover:text-purple-500 transition-colors duration-200 ease-in-out">
                  {dao.ethAddress}
                </p>
                <p className="sm:hidden block text-gray-500 font-mono truncate hover:text-purple-500 transition-colors duration-200 ease-in-out">
                  {`${dao.ethAddress.substring(
                    0,
                    12
                  )}...${dao.ethAddress.substring(dao.ethAddress.length - 8)}`}
                </p>
                {isCopied ? (
                  <CheckIcon className="w-4 h-4 text-purple-500" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </CardDescription>
            </Card>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
