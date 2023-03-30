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
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { usePrepareContractWrite, useContractWrite, useProvider } from "wagmi";
import ReactMarkdown from "react-markdown";
import OZ_Governor_ABI from "../utils/abis/OzGovernor_ABI.json";
import { ContractAddress } from "./search";

interface Proposal {
  id: number;
  proposer: string;
  targets: string[];
  values: any;
  signatures: string[];
  calldatas: string[];
  startBlock: any;
  endBlock: any;
  description: string;
}

interface Props {
  proposal: Proposal;
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

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
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

  return (
    <>
      <Button onClick={handleOpenProposalModal}>View Proposal</Button>
      <Modal isOpen={isModalVisible} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Proposal ${proposal.id}`}</ModalHeader>
          <ModalBody>
            <p>{`Proposer: ${proposal.proposer}`}</p>
            <ReactMarkdown>{proposal.description}</ReactMarkdown>
            <RadioGroup onChange={(e) => setVoteValue(e)} value={voteValue}>
              <Radio value={"1"}>For</Radio>
              <Radio value={"0"}>Against</Radio>
              <Radio value={"2"}>Abstain</Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={!write}
              onClick={() => write?.()}
              bg={isTransactionMined ? "green.500" : "blue.500"}
              _hover={{ bg: isTransactionMined ? "green.400" : "blue.400" }}
            >
              {isTransactionMined ? "Transaction Mined" : "Vote"}
              {isTransactionMined && <Spinner size="sm" ml={2} />}
            </Button>
            <Button onClick={handleCloseModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
