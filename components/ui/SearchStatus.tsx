import { Progress } from "@/components/ui/Progress"
import { formatPercent } from "@lib/utils"

import { SearchProps } from "@/types/search"

export function SearchStatus(props: SearchProps) {
  return (
    <div className="flex flex-col gap-4">
      <Progress value={formatPercent(props.percentageComplete)} />
      <p>
        <span className="font-bold">Current block:</span> {props.currentBlock}
      </p>
    </div>
  )
}

/* 
export const SearchStatuss: React.FC<SearchProps> = ({
  header,
  percentageComplete,
  currentBlock,
}) => {
  const color = useColorModeValue("white", "gray.800");
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
          Current search block: {currentBlock}
        </StatHelpText>
      </Stat>
    </StatGroup>
  );
};
 */
