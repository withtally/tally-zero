import React from "react";
import { Button } from "@chakra-ui/react";

enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

interface VoteButtonProps {
  state?: ProposalState;
}

const VoteButton: React.FC<VoteButtonProps> = ({ state }) => {
  const isButtonDisabled = state !== ProposalState.Active || state === undefined;
  const buttonText = state === ProposalState.Active ? "Vote" : "Unavailable";

  return (
    <Button isDisabled={isButtonDisabled}>
      {buttonText}
    </Button>
  );
};

export default VoteButton;
