import React from "react";
import { Text, VStack, Box } from "@chakra-ui/react";

export interface TextType {
  label: string;
  text: string;
}

export const TextCard: React.FC<TextType> = ({ label, text }) => {
  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      bg="purple.500"
      color="white"
    >
      <VStack m={4} alignItems="flex-start">
        <Text fontSize={"lg"} fontWeight="bold">
          {label}
        </Text>
        <Text fontSize={"sm"} textAlign="left">
          {text}
        </Text>
      </VStack>
    </Box>
  );
};
