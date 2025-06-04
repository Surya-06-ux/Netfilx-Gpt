// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2zTFhs3H29gv84Gtleo5TgDWkfZ-ZhQA",
  authDomain: "netflixgpt-86d75.firebaseapp.com",
  projectId: "netflixgpt-86d75",
  storageBucket: "netflixgpt-86d75.firebasestorage.app",
  messagingSenderId: "240510401383",
  appId: "1:240510401383:web:7cf1bf898f396da3278dc2",
  measurementId: "G-414XD3LJQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();