import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  Text,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  VStack,
  useToast,
} from "@chakra-ui/react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreate, setIsCreate] = useState(true);
  const toast = useToast();

  //Google auth

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives a Google Access Token --- access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  //Sign up with email password

  async function signUpWithEmail() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        onClose();
        console.log(user);
        toast({
          title: "Sign up was successful",
          status: "success",
          duration: 9000,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
      toast({
        title: "Signed up failed",
        status: "error",
        duration: 9000,
      });
  }

  //Login with email password

  async function signInWithEmail() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        onClose();
        console.log(user);
        toast({
          title: "Login was successful",
          status: "success",
          duration: 9000,
        });
      })
      .catch((error) => {
        toast({
          title: "Login failed",
          status: "error",
          duration: 9000,
        });
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }

  return (
    // <Box backgroundColor={"yellow"} position={"fixed"} top="5%" right="5%">
    <Box align="center"
    flex="1">
      <VStack color="black">
      <Button onClick={() => toggleColorMode()}>
        {colorMode == "dark" ? <FaSun /> : <FaMoon />}
      </Button>{" "}
      {isLoggedIn && (
        <>
          <Text color="green.500">{user.email}</Text>
          <Link color="red.500" onClick={() => auth.signOut()}>
            Logout
          </Link>
        </>
      )}
      {!isLoggedIn && (
        <VStack>
          <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Google login
          </Button>
          <Button onClick={() => {setIsCreate(false); onOpen()}}>Login</Button>
          <Button onClick={() => {setIsCreate(true); onOpen()}}>Create account</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>{isCreate ? "Create" : "Login"}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder="Email"
                      type="email"
                      onChange={(data) => setEmail(data.target.value)}
                    />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      placeholder="Password"
                      type="password"
                      onChange={(data) => setPassword(data.target.value)}
                      />
                  </FormControl>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button mr={3} onClick={onClose}>
                  Cancel
                </Button>
                {isCreate ? (
                  <Button colorScheme="blue" onClick={signUpWithEmail}>
                    Create
                  </Button>
                ) : (
                  <Button if colorScheme="blue" onClick={signInWithEmail}>
                    Login
                  </Button>
                )}
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      )}
      </VStack>
    </Box>
  );
};

export default Auth;
