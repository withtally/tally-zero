"use client";

import { z } from "zod";

import Image from "next/image";
import { useState } from "react";

import { Card, CardContent, CardDescription } from "@components/ui/Card";
import { daoSchema } from "@config/schema";

import { CopyIcon, CheckIcon, ArrowRight } from "lucide-react";

export default function DaoCard({
  name,
  imageUrl,
  ethAddress,
}: z.infer<typeof daoSchema>) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(ethAddress)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <Card className="rounded-xl my-2">
      <CardContent className="flex items-start space-x-4 py-2">
        <Image
          src={imageUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-full flex-shrink-0 pt-1 -ml-2"
        />
        <div className="flex flex-col justify-center py-2">
          <div className="flex justify-between items-center w-full">
            <span className="text-lg font-semibold">{name}</span>
            <a
              href={`/explore?address=${ethAddress}`}
              className="text-sm text-purple-500 hover:text-purple-600 transition-colors duration-200 ease-in-out flex items-center"
            >
              Connect to DAO
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>

          <CardDescription>
            <Card className="rounded-sm">
              <CardDescription
                onClick={handleCopyClick}
                className="flex items-center px-2 py-1 space-x-2 hover:text-black transition-colors duration-200 ease-in-out cursor-pointer"
              >
                <p className="text-gray-500 font-mono truncate hover:text-purple-500 transition-colors duration-200 ease-in-out">
                  {ethAddress}
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
