import * as React from "react";
import { Web3Button } from "@web3modal/react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { HStack, Text } from "@chakra-ui/react";
import { Web3NetworkSwitch } from "@web3modal/react";
export const Header = () => {
  return (
    <HStack w="full" justifyContent={"space-between"}>
      <Text>Tally Lite</Text>
      <HStack>
        {/* <Listener /> */}
        <Web3NetworkSwitch />
        <Web3Button />
        <ColorModeSwitcher justifySelf="flex-end" />
      </HStack>
    </HStack>
  );
};
