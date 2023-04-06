import React from "react";
import { Search } from "../components/search";
import { VStack } from "@chakra-ui/react";

export const Home: React.FC = () => {
  return (
    <VStack spacing={8} minWidth="90%" minH={"100%"}>
      <Search />
    </VStack>
  );
};
