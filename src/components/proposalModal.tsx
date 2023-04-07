import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Radio,
  Spinner,
  RadioGroup,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useProvider } from "wagmi";
import ReactMarkdown from "react-markdown";
import OZ_Governor_ABI from "../utils/abis/OzGovernor_ABI.json";
import { ContractAddress } from "./search";
import ProposalBadge from "./proposalStateBadge";
import { ParsedProposal } from "../hooks/useParseProposals";
import { ProposalState } from "../components/proposalStateBadge";

interface Props {
  proposal: ParsedProposal;
  contractAddress: ContractAddress | undefined;
}

export const ProposalModal: React.FC<Props> = ({
  proposal,
  contractAddress,
}) => {
  const [voteValue, setVoteValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTransactionMined, setIsTransactionMined] = useState(false);

  const voteArgs = [proposal.id, parseInt(voteValue)];

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    abi: OZ_Governor_ABI,
    address: contractAddress as `0x${string}`,
    functionName: "castVote",
    args: voteArgs,
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const handleOpenProposalModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const stateEnum =
    proposal.state !== undefined ? ProposalState[proposal.state] : null;

  return (
    <>
      <Button onClick={handleOpenProposalModal}>View Proposal</Button>
      <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent minWidth="90%">
          <ModalHeader>Proposal</ModalHeader>
          <ModalBody>
            <VStack alignItems={"flex-start"}>
              <HStack>
                <ProposalBadge state={proposal.state} />
                {stateEnum !== "Active" && <Text>Voting is Closed.</Text>}
              </HStack>

              <HStack>
                <Text fontSize={"2xs"} color="gray.400">
                  ID:
                </Text>
                <Text
                  fontSize={"2xs"}
                  color="gray.400"
                >{`${proposal.id}`}</Text>
              </HStack>
              <Text>Description:</Text>
              <ReactMarkdown>{proposal.description}</ReactMarkdown>
              {stateEnum === "Active" && (
                <RadioGroup
                  onChange={(e) => setVoteValue(e)}
                  value={voteValue}
                  pt={5}
                >
                  <HStack spacing={5}>
                    <Radio value={"1"}>For</Radio>
                    <Radio value={"0"}>Against</Radio>
                    <Radio value={"2"}>Abstain</Radio>
                  </HStack>
                </RadioGroup>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter>
            {stateEnum === "Active" && (
              <Button
                disabled={!write}
                onClick={() => write?.()}
                bg={isTransactionMined ? "green.500" : "blue.500"}
                _hover={{ bg: isTransactionMined ? "green.400" : "blue.400" }}
              >
                {isTransactionMined ? "Transaction Mined" : "Vote"}
                {isTransactionMined && <Spinner size="sm" ml={2} />}
              </Button>
            )}
            <Button onClick={handleCloseModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
