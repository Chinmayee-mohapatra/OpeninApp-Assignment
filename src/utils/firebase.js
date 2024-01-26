// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxnMwePUTSJ2Ezcn7dDHWYQ9COCUQ9K40",
  authDomain: "openinapp-7882a.firebaseapp.com",
  projectId: "openinapp-7882a",
  storageBucket: "openinapp-7882a.appspot.com",
  messagingSenderId: "334975780366",
  appId: "1:334975780366:web:8e7915a1ba3c734be75e5f",
  measurementId: "G-6TY15VE867",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
