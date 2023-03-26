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
} from "@chakra-ui/react";
import { ParsedProposal } from "../hooks/useParseProposals";

type ProposalTableProps = {
  proposals: ParsedProposal[];
};

export const ProposalTable = ({ proposals }: ProposalTableProps) => {
  console.log(
    "🚀 ~ file: proposalTable.tsx:20 ~ ProposalTable ~ proposals:",
    proposals
  );
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th>Proposal ID</Th>
            <Th>Proposer</Th>
            <Th>Start Block</Th>
            <Th>End Block</Th>
            <Th>State</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal, index) => (
            <Tr key={index}>
              <Td>{proposal.id.toString()}</Td>
              <Td>{proposal.proposer}</Td>
              <Td>{proposal.startBlock.toString()}</Td>
              <Td>{proposal.endBlock.toString()}</Td>
              <Td>{proposal.state}</Td>
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
