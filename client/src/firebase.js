// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b58e0.firebaseapp.com",
  projectId: "mern-estate-b58e0",
  storageBucket: "mern-estate-b58e0.appspot.com",
  messagingSenderId: "215097525576",
  appId: "1:215097525576:web:b82b6acbca6b834a9f1f7d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);