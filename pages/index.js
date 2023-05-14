import { Container, Stack, Image } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import gifImage from "../public/listtwo.gif";
//import listImage from "../public/list.png";

export default function Home() {
  return (
    <Container height={"100vh"} maxW="7xl" padding={"8"}>
      <Stack direction="row" align="center" flex="1">
        <Image src={gifImage.src} alt="List Image" w="400px" h="auto" />
        <AddTodo />
      </Stack>
      <Auth />
      <Stack direction="column" marginTop={10}>
        <TodoList />
      </Stack>
    </Container>
  );
}
