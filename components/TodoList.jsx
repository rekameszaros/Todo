import {
  Badge,
  Box,
  Heading,
  SimpleGrid,
  Text,
  useToast,
  Select,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { FaToggleOff, FaToggleOn, FaTrash } from 'react-icons/fa';
import { deleteTodo, toggleTodoStatus } from '../api/todo';
import react from 'react';

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth();
  const [selectValue, setSelectValue] = React.useState('all'); // #1
  //callback method
  const toast = useToast();

  const refreshData = () => {
    console.log(selectValue);
    if (!user) {
      setTodos([]);
      return;
    }

    let q = {};

    if (!selectValue || selectValue === 'all') {
      console.log('getting all');
      q = query(collection(db, 'todo'), where('user', '==', user.uid));
    } else if (selectValue === 'pending') {
      console.log('getting pending');

      // q = query(collection(db, "todo"), where("user", "==", user.uid), where("status", "==", selectValue));
      q = query(
        collection(db, 'todo'),
        where('user', '==', user.uid),
        where('status', '==', 'pending')
      );
    } else if (selectValue === 'completed') {
      console.log('getting completed');

      q = query(
        collection(db, 'todo'),
        where('user', '==', user.uid),
        where('status', '==', 'completed')
      );
    }

    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  //UseEffect triggers when user object changes. So when the user logged in the data is gotten.
  useEffect(() => {
    refreshData();
  }, [user, selectValue]);

  const handleTodoDelete = async (id) => {
    if (confirm('Are you sure you wanna delete this todo?')) {
      deleteTodo(id);
      toast({ title: 'Todo deleted successfully', status: 'success' });
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status == 'completed' ? 'pending' : 'completed';
    await toggleTodoStatus({ docId: id, status: newStatus }).then(() =>
      refreshData()
    );
    toast({
      title: `Todo marked ${newStatus}`,
      status: newStatus == 'completed' ? 'success' : 'warning',
    });
  };

  return (
    <Box mt={5}>
      {user && todos && (
        <Select
          value={selectValue}
          onChange={(event) => setSelectValue(event.target.value)}
          marginBottom={6}
          maxWidth={'sm'}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </Select>
      )}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={8}
        data-testId="simpleGridTest"
      >
        {todos &&
          todos.map((todo) => (
            <Box
              p={3}
              boxShadow="2xl"
              shadow={'dark-lg'}
              transition="0.2s"
              _hover={{ boxShadow: 'sm' }}
              data-testid={todo.id}
              id={todo.id}
            >
              <Heading as="h3" fontSize={'xl'}>
                {todo.title}{' '}
                <Badge
                  color="red.500"
                  bg="inherit"
                  transition={'0.2s'}
                  _hover={{
                    bg: 'inherit',
                    transform: 'scale(1.2)',
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleTodoDelete(todo.id)}
                  data-testId="test-delete-task"
                >
                  <FaTrash />
                </Badge>
                <Badge
                  color={todo.status == 'pending' ? 'gray.500' : 'green.500'}
                  bg="inherit"
                  transition={'0.2s'}
                  _hover={{
                    bg: 'inherit',
                    transform: 'scale(1.2)',
                  }}
                  float="right"
                  size="xs"
                  onClick={() => handleToggle(todo.id, todo.status)}
                  data-testId="testToggle"
                >
                  {todo.status == 'pending' ? <FaToggleOff /> : <FaToggleOn />}
                </Badge>
                <Badge
                  float="right"
                  opacity="0.8"
                  bg={todo.status == 'pending' ? 'yellow.500' : 'green.500'}
                >
                  {todo.status}
                </Badge>
              </Heading>
              <Text>{todo.description}</Text>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};
export default TodoList;