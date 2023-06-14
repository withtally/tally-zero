import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ParsedProposal } from "../hooks/useParseProposals";
import { truncateWithEllipsis } from "../utils/functions/truncateText";
import ProposalBadge from "./proposalStateBadge";
import { ProposalModal } from "./proposalModal";

type ProposalTableProps = {
  proposals: ParsedProposal[];
  percentageComplete: number | undefined;
  governorAddress: `0x${string}` | undefined;
  header: string;
};

export const ProposalTable = ({
  proposals,
  percentageComplete,
  governorAddress,
  header,
}: ProposalTableProps) => {
  const color = useColorModeValue("white", "gray.800");
  return (
    <TableContainer
      textAlign={"justify"}
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={5}
      bg={color}
      minWidth={"100%"}
    >
      <Text>{header}</Text>
      <Table variant="simple">
        {/* <TableCaption>Proposals</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Proposal ID</Th>
            <Th>Start Block</Th>
            <Th>End Block</Th>
            <Th>State</Th>
            <Th>Vote</Th>
          </Tr>
        </Thead>
        <Tbody>
          {proposals.map((proposal) => (
            <Tr key={proposal.id}>
              <Td>{truncateWithEllipsis(proposal.id.toString(), 10)}</Td>
              <Td>{proposal.startBlock.toString()}</Td>
              <Td>{proposal.endBlock.toString()}</Td>
              <Td>
                <ProposalBadge state={proposal.state} />
              </Td>
              <Td>
                <ProposalModal
                  proposal={proposal}
                  contractAddress={governorAddress}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
