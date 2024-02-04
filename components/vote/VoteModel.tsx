import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/Dialog";
import { Badge } from "@components/ui/Badge";
import VoteForm from "@components/vote/VoteForm";

import { cn } from "@lib/utils";
import { proposalSchema } from "@config/schema";

import ReactMarkdown from "react-markdown";

export default function VoteModel({
  proposal,
  stateValue,
}: {
  proposal: ReturnType<typeof proposalSchema.parse>;
  stateValue: any;
}) {
  return (
    <>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center justify-between py-4">
              <span>Proposal #{proposal.id} </span>
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
          <DialogDescription className="max-h-[400px] overflow-y-auto">
            <h3 className="text-sm font-semibold">Description</h3>
            <div className="text-sm px-[2px]">
              <ReactMarkdown>{proposal.description}</ReactMarkdown>
            </div>
          </DialogDescription>
        </DialogHeader>
        <VoteForm proposal={proposal}/>
      </DialogContent>
    </>
  );
}
