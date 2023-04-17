import React from "react";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useColorModeValue,
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
  const color = useColorModeValue("white", "gray.800")
  return (
    <StatGroup
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={5}
      height="135px"
      bg={color}
    >
      <Stat>
        <StatLabel>{header}</StatLabel>
        <StatNumber fontSize={"4xl"} pt={4} pb={4}>
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
