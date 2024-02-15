import ReactMarkdown from "react-markdown";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/Dialog";
import {
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/Drawer";
import { Badge } from "@components/ui/Badge";
import VoteForm from "@components/form/VoteForm";

import { cn } from "@lib/utils";
import { ParsedProposal } from "@/types/proposal";

export default function VoteModel({
  proposal,
  stateValue,
  isDesktop,
}: {
  proposal: ParsedProposal;
  stateValue: any;
  isDesktop: boolean;
}) {
  if (isDesktop) {
    return (
      <DialogContent className="sm:max-w-[700px] max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between pb-4">
              <span>Proposal</span>
              <Badge
                className={cn(
                  "text-xs font-semibold inline-flex items-center",
                  stateValue.bgColor
                )}
              >
                <stateValue.icon
                  className="mr-1"
                  style={{ strokeWidth: "2" }}
                />
                {stateValue.label}
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="max-h-[400px] max-w-[650px] overflow-x-auto overflow-y-auto text-left bg-slate-50 dark:bg-slate-900 rounded-lg">
            <h3 className="text-sm font-semibold">Description</h3>
            <div className="text-sm px-[2px] break-words">
              <ReactMarkdown className="w-screen sm:w-full ">
                {proposal.description}
              </ReactMarkdown>
            </div>
          </DialogDescription>
        </DialogHeader>
        <VoteForm proposal={proposal} />
      </DialogContent>
    );
  }

  return (
    <>
      <DrawerContent className="sm:max-w-[700px] px-2 py-4">
        <DrawerHeader>
          <DrawerTitle>
            <div className="flex items-center justify-between py-4">
              <span>Proposal</span>
              <Badge
                className={cn(
                  "text-xs font-semibold inline-flex items-center",
                  stateValue.bgColor
                )}
              >
                <stateValue.icon
                  className="mr-1"
                  style={{ strokeWidth: "2" }}
                />
                {stateValue.label}
              </Badge>
            </div>
          </DrawerTitle>
          <DrawerDescription className="max-h-[400px] overflow-y-auto text-left">
            <h3 className="text-sm font-semibold">Description</h3>
            <div className="text-sm px-[2px] break-words">
              <ReactMarkdown className="w-screen sm:w-full">
                {proposal.description}
              </ReactMarkdown>
            </div>
          </DrawerDescription>
        </DrawerHeader>
        <VoteForm proposal={proposal} />
      </DrawerContent>
    </>
  );
}
