import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
} from "@chakra-ui/react";
import { ParsedProposal } from "../hooks/useParseProposals";
import { truncateWithEllipsis } from "../utils/functions/truncateText";
import ProposalBadge from "./proposalStateBadge";
import VoteButton from "./voteButton";

type ProposalTableProps = {
  proposals: ParsedProposal[];
  percentageComplete: number | undefined;
};

export const ProposalTable = ({
  proposals,
  percentageComplete,
}: ProposalTableProps) => {
  console.log(
    "🚀 ~ file: proposalTable.tsx:20 ~ ProposalTable ~ proposals:",
    proposals
  );
  return (
    <TableContainer>
      <Text>Proposals</Text>
      <Text>Percent Complete {percentageComplete}</Text>
      <Table variant="simple">
        {/* <TableCaption>Proposals</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Proposal ID</Th>
            <Th>Proposer</Th>
            <Th>Start Block</Th>
            <Th>End Block</Th>
            <Th>State</Th>
            <Th>Vote</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal, index) => (
            <Tr key={index}>
              <Td>{truncateWithEllipsis(proposal.id.toString(), 10)}</Td>
              <Td>{truncateWithEllipsis(proposal.proposer, 16)}</Td>
              <Td>{proposal.startBlock.toString()}</Td>
              <Td>{proposal.endBlock.toString()}</Td>
              <Td>
                <ProposalBadge state={proposal.state} />
              </Td>
              <Td>
                <VoteButton state={proposal.state} />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Proposal ID</Th>
            <Th>Proposer</Th>
            <Th>Start Block</Th>
            <Th>End Block</Th>
            <Th>State</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};
