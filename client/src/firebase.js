// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2d41a.firebaseapp.com",
  projectId: "mern-estate-2d41a",
  storageBucket: "mern-estate-2d41a.appspot.com",
  messagingSenderId: "21908494868",
  appId: "1:21908494868:web:dfcb5fc275f5cd423c2501"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);