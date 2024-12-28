// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM00oUOAdr9qywr-3efcgVi9mtUWOzFl4",
  authDomain: "fir-9bb34.firebaseapp.com",
  projectId: "fir-9bb34",
  storageBucket: "fir-9bb34.firebasestorage.app",
  messagingSenderId: "549496057195",
  appId: "1:549496057195:web:7269dd8d9b761c5befb02e",
  measurementId: "G-SR9YS14J5B",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
