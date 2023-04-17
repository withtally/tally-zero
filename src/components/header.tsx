import * as React from "react";
import { Web3Button } from "@web3modal/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { HStack, Image, Text } from "@chakra-ui/react";
import { Web3NetworkSwitch } from "@web3modal/react";
export const Header = () => {
  return (
    <HStack w="full" justifyContent={"space-between"}>
      <HStack>
      <Image
        borderRadius="md"
        boxSize="35px"
        src="./tallylogo.png"
        alt="Dan Abramov"
      />
      <Text fontSize={"3xl"} fontWeight="black" >ZERO</Text>
      </HStack>
      <HStack>
        {/* <Listener /> */}
        <Web3NetworkSwitch />
        <Web3Button />
        <ColorModeSwitcher justifySelf="flex-end" />
      </HStack>
    </HStack>
  );
};
