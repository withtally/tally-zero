import React, { useState } from "react";
import { CopyIcon, CheckIcon } from "lucide-react";

export function ProposerCell({ proposer }: { proposer: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(proposer)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      })
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <div
      className="flex w-[160px] items-center cursor-pointer rounded-2xl pl-3 py-[2px] bg-black/80 text-white hover:text-violet-400 transition-colors duration-200 ease-in-out"
      onClick={handleCopyClick}
    >
      <p className=" font-mono truncate">
        {`${proposer.substring(0, 5)}...${proposer.substring(
          proposer.length - 6
        )}`}
      </p>
      {isCopied ? (
        <CheckIcon className="ml-3 w-4 h-4" />
      ) : (
        <CopyIcon className="ml-3 w-4 h-4" />
      )}
    </div>
  );
}
