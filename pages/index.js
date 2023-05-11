import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { Container, color } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
export default function Home() {
  return (
    <Container height={"100vh"} maxW="7xl">

        <Auth />
        <AddTodo />
        <TodoList />
    
    </Container>
  );
}
