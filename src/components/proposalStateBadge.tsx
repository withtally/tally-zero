import React from "react";
import { Badge } from "@chakra-ui/react";

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

interface ProposalBadgeProps {
  state?: number;
}

const ProposalBadge: React.FC<ProposalBadgeProps> = ({ state }) => {
  const stateEnum = state !== undefined ? ProposalState[state] : null;

  const getBadgeColor = () => {
    switch (stateEnum) {
      case "Pending":
        return "blue";
      case "Active":
        return "green";
      case "Canceled":
        return "red";
      case "Defeated":
        return "red";
      case "Expired":
        return "red";
      case "Succeeded":
        return "teal";
      case "Executed":
        return "teal";
      case "Queued":
        return "purple";
      default:
        return "gray";
    }
  };

  return stateEnum !== null ? (
    <Badge colorScheme={getBadgeColor()}>{stateEnum}</Badge>
  ) : null;
};

export default ProposalBadge;
