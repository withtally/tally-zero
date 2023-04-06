import React from "react";
import { Formik, Form } from "formik";
import {
  Input,
  Button,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
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

  const validate = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!isEthereumAddress(values.contractAddress)) {
      errors.contractAddress = "Invalid Ethereum address";
    }
    if (!values.networkId) {
      errors.networkId = "Network ID is required";
    }

    return errors;
  };

  const onSubmit = (values: FormValues) => {
    setState({
      contractAddress: values.contractAddress as `0x${string}`,
      networkId: values.networkId,
    });
    navigate(
      `?contractAddress=${values.contractAddress}&networkId=${values.networkId}`
    );
  };

  return (
    <HStack
      border="1px"
      borderColor="gray.200"
      borderRadius="lg"
      p={5}
      bg="white"
      alignItems={"flex-start"}
      width="full"
    >
      <Formik
        initialValues={{
          contractAddress: "",
          networkId: "",
        }}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isValid, handleChange, handleBlur, values }) => (
          <HStack minW={"100%"} justifyContent="space-between">
            <Form>
              <Box>
                <FormControl
                  isInvalid={Boolean(
                    errors.contractAddress && touched.contractAddress
                  )}
                >
                  <FormLabel htmlFor="contractAddress">
                    Ethereum Address
                  </FormLabel>
                  <Input
                    id="contractAddress"
                    name="contractAddress"
                    placeholder="0x....."
                    value={values.contractAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.contractAddress && (
                    <FormErrorMessage fontSize={"2xs"}>
                      Invalid Address
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Box>
            </Form>
            <Box>
              <Form>
                <FormControl
                  isInvalid={Boolean(errors.networkId && touched.networkId)}
                >
                  <FormLabel htmlFor="networkId">Network ID</FormLabel>
                  <Input
                    id="networkId"
                    name="networkId"
                    placeholder="Eg, 1, 3, 4, 5, 42, 1337"
                    value={values.networkId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.networkId && (
                    <FormErrorMessage fontSize={"2xs"}>
                      Invalid Network Id.
                    </FormErrorMessage>
                  )}
                </FormControl>
              </Form>
            </Box>
            <Form>
              <Button
                mt={4}
                colorScheme="green"
                type="submit"
                isDisabled={!isValid}
              >
                Connect to contract
              </Button>
            </Form>
          </HStack>
        )}
      </Formik>
    </HStack>
  );
};
