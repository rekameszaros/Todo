import { Container, Stack, Image, Flex } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import gifImage from "../public/listtwo.gif";
import Footer from "@/components/Footer";
//import listImage from "../public/list.png";

export default function Home() {
  return (
    <Flex direction={"column"} height={"100vh"} maxW="7xl" pt={8} px={0}>
      <Container maxW="100vw">
        <Stack direction="row" align="center" flex="1">
          <Image src={gifImage.src} alt="List Image" w="400px" h="auto" />
          <AddTodo />
        </Stack>
        <Auth />
        <Stack direction="column" marginTop={10} marginBottom={10}>
          <TodoList />
        </Stack>
      </Container>
      <Footer />
    </Flex>
  );
}
