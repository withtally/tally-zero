import React from "react";
import { Search } from "../components/search";
import { Container, Grid, useColorModeValue } from "@chakra-ui/react";
import { Header } from "../components/header";

export const Home: React.FC = () => {
  const color = useColorModeValue("gray.50", "gray.800");
  console.log("🚀 ~ file: App.tsx:49 ~ App ~ color:", color);
  return (
    <Grid minH="100vh" p={3} alignItems={"start"} bg={color}>
      <Header />
      <Container>
        <Search />
      </Container>
    </Grid>
  );
};
