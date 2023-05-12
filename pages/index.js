// import Head from "next/head";
// import { Inter } from "next/font/google";
// import styles from "@/styles/Home.module.css";

import source from "../public/list.png";

import { Container, Stack, Image } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
export default function Home() {
  return (
    <Container height={"100vh"} maxW="7xl">
      <Auth />
      <Stack direction={"colum"}>
        <Image src={source} />
        <AddTodo />
        <TodoList />
      </Stack>
    </Container>
  );
}
