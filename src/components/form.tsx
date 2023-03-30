import React from "react";
import { useFormik } from "formik";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Text,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface FormValues {
  contractAddress: string;
  networkId: string;
}

interface ContractParams {
  contractAddress?: `0x${string}`;
  networkId?: string;
}

interface ConnectFormProps {
  setState: React.Dispatch<React.SetStateAction<ContractParams>>;
}

const isEthereumAddress = (address: string) =>
  /^0x[a-fA-F0-9]{40}$/.test(address);

export const ConnectForm: React.FC<ConnectFormProps> = ({ setState }) => {
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      contractAddress: "",
      networkId: "",
    },
    validate: (values) => {
      const errors: Partial<FormValues> = {};

      if (!isEthereumAddress(values.contractAddress)) {
        errors.contractAddress = "Invalid Ethereum address";
      }
      if (!values.networkId) {
        errors.networkId = "Network ID is required";
      }

      return errors;
    },
    onSubmit: (values) => {
      setState({
        contractAddress: values.contractAddress as `0x${string}`,
        networkId: values.networkId,
      });
      navigate(
        `?contractAddress=${values.contractAddress}&networkId=${values.networkId}`
      );
    },
  });

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
p={5}
      bg="white"
    >
      <form onSubmit={formik.handleSubmit}>
        <HStack alignItems={"start"}>
          <FormControl
            isInvalid={Boolean(
              formik.errors.contractAddress && formik.touched.contractAddress
            )}
          >
            <FormLabel htmlFor="contractAddress">Ethereum Address</FormLabel>
            <Input
              id="contractAddress"
              name="contractAddress"
              placeholder="Enter Ethereum address"
              value={formik.values.contractAddress}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box minHeight="1.5rem">
              <Text color="red.500" fontSize="sm" mt="0.5rem">
                {formik.errors.contractAddress || ""}
              </Text>
            </Box>
          </FormControl>

          <FormControl
            isInvalid={Boolean(
              formik.errors.networkId && formik.touched.networkId
            )}
          >
            <FormLabel htmlFor="networkId">Network ID</FormLabel>
            <Input
              id="networkId"
              name="networkId"
              placeholder="Enter Network ID"
              value={formik.values.networkId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Box minHeight="1.5rem">
              <Text color="red.500" fontSize="sm" mt="0.5rem">
                {formik.errors.networkId || ""}
              </Text>
            </Box>
          </FormControl>
        </HStack>
        <Flex justifyContent={"flex-end"}>
          <Button
            mt={4}
            colorScheme="green"
            type="submit"
            isDisabled={!formik.isValid}
          >
            Connect to contract
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
