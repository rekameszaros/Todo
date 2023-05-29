//Pasted the firebase config, I additionally created two variables auth and db which are the firebase auth module and firestore module.

// Functions from the SDKs.
// Basic functionality for initialize and set up the Firebase application.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyA_PIkGcG2s1MIprkd1tP6cYlt5E9tE6zQ",
  authDomain: "next-firebase-todo-2.firebaseapp.com",
  projectId: "next-firebase-todo-2",
  storageBucket: "next-firebase-todo-2.appspot.com",
  messagingSenderId: "593109907882",
  appId: "1:593109907882:web:0e79683bb1085c2e7193d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
