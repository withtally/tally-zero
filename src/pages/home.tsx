import React from "react";
import { Search } from "../components/search";
import {
  Grid,
  Text,
  useColorModeValue,
  VStack,
  SimpleGrid,
  HStack,
  Link,
  Icon,
} from "@chakra-ui/react";
import { Header } from "../components/header";
import { TextType, TextCard } from "../components/textCard";
import { FaChevronCircleRight } from "react-icons/fa";

const TextData: TextType[] = [
  {
    label: "Enter Governor Address",
    text: "Enter the desired Governor contract address, network id, and ensure your wallet is connected to the right network.",
  },
  {
    label: "Connect to contract",
    text: 'The app will search for created proposals. This may take some time depending on your wallets RPC provider.',
  },
  {
    label: "Vote",
    text: "If there are any active proposals, they will appear at the top where they can be selected and voted upon.",
  },
];

export const Home: React.FC = () => {
  const color = useColorModeValue("gray.50", "gray.800");
  return (
    <Grid minH="100vh" p={3} alignItems={"start"} bg={color}>
      <Header />
      <VStack width={"100%"} pt={12}>
        <VStack maxW={"80%"} spacing="8">
          <VStack alignItems={"flex-start"}>
            <Text fontSize={"2xl"} fontWeight="bold">
              What is this?
            </Text>
            <Text textAlign={"left"}>
              Tally Zero is a simplified, open-source, zero-dependency
              governance front end served via IPFS. Vote on Governor proposals
              directly onchain without the possiblity of censorship or downtime.{" "}
            </Text>
            <Text pt={4} color="gray.500" fontSize={"xs"}>
              Learn more
            </Text>
            <HStack>
              <Icon as={FaChevronCircleRight} color="purple.500" />
              <Link color="gray.500" href="https://www.tally.xyz/" isExternal>
                Tally.xyz
              </Link>
              <Icon as={FaChevronCircleRight} color="purple.500" />
              <Link
                color="gray.500"
                href="https://github.com/withtally/tally-zero"
                isExternal
              >
                Github
              </Link>
            </HStack>
          </VStack>
          <SimpleGrid columns={3} spacing={6} minW="100%">
            {TextData.map((text) => (
              <TextCard label={text.label} text={text.text} />
            ))}
          </SimpleGrid>
          <Search />
        </VStack>
      </VStack>
    </Grid>
  );
};
