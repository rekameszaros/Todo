// This custom hook is responsible for managing the authentication state and providing the current user and isLoggedIn boolean value.


import { useEffect, useState } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  // No user is currently authenticated -- null.
  const [user, setUser] = useState(null);
  // No user is logged in -- false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // This method sets up a listener for authentication state changes.
    auth.onAuthStateChanged((user) => {
      // If both user and user.uid are truthy, then condition is true.
      setIsLoggedIn(user && user.uid ? true : false);
      setUser(user);
    });
  });
  return { user, isLoggedIn };
};

export default useAuth;
