import React from "react";
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
} from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  const { isLoggedIn, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
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

  function signInWithEmail(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  }
  
  //   const BasicUsage = () => {
  //     return (
  //       <>
  //         <Button onClick={onOpen}>Open Modal</Button>

  // <Modal isOpen={isOpen} onClose={onClose}>
  //   <ModalOverlay />
  //   <ModalContent>
  //     <ModalHeader>Modal Title</ModalHeader>
  //     <ModalCloseButton />
  //     <ModalBody>
  //       <Lorem count={2} />
  //     </ModalBody>

  //     <ModalFooter>
  //       <Button colorScheme='blue' mr={3} onClick={onClose}>
  //         Close
  //       </Button>
  //       <Button variant='ghost'>Secondary Action</Button>
  //     </ModalFooter>
  //   </ModalContent>
  // </Modal>
  //       </>
  //     )
  //   }

  return (
    <Box position={"fixed"} top="5%" right="5%">
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
        <div style={{ display: "inline-list-item" }}>
          <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
            Login with Google
          </Button>
          <Button onClick={onOpen}>Login</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Login</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Email" type="email" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input placeholder="Password" type="password" />
                  </FormControl>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button  mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue" onClick={signInWithEmail()}>Login</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      )}
    </Box>
  );
};
export default Auth;
