import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Box,
} from "@chakra-ui/react";

interface SearchProps {
  header: string;
  percentageComplete: number;
  currentBlock: number | undefined;
}

export const SearchStatus: React.FC<SearchProps> = ({
  header,
  percentageComplete,
  currentBlock,
}) => {
  return (
    <StatGroup
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={5}
      bg="white"
    >
      <Stat>
        <StatLabel>{header}</StatLabel>
        <StatNumber color={percentageComplete === 100 ? "green.500" : "black"}>
          {percentageComplete}%
        </StatNumber>
        <StatHelpText>
          {/* <StatArrow type="increase" /> */}
          Current search block: {currentBlock}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};
