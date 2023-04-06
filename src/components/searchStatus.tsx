import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
} from "@chakra-ui/react";

interface SearchProps {
  header: string;
  percentageComplete: number;
  currentBlock: number | undefined;
}

function formatPercent(percent: number): number {
  // Multiply by 100 to get the percentage as a whole number
  const percentAsWholeNumber = percent;
  
  // Round to two decimal places and convert to a string
  const roundedAsString = percentAsWholeNumber.toFixed(2);
  
  // Convert back to a number and return
  return Number(roundedAsString);
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
          {formatPercent(percentageComplete)}%
        </StatNumber>
        <StatHelpText>
          {/* <StatArrow type="increase" /> */}
          Current search block: {currentBlock}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};
