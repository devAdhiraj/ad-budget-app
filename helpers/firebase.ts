// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, inMemoryPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "budget-app-56f7b.firebaseapp.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: "budget-app-56f7b.appspot.com",
  messagingSenderId: "50123071262",
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
