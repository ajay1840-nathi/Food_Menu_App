// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import {getAuth} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyDJdU9BCQSZB8R-VCkPIFYC3VftkEk9fq4",
  authDomain: "recipe-management-2e47b.firebaseapp.com",
  projectId: "recipe-management-2e47b",
  storageBucket: "recipe-management-2e47b.appspot.com",
  messagingSenderId: "753334646924",
  appId: "1:753334646924:web:558d941cfb101d182d63a9",
  measurementId: "G-9NVN8W80FK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}
export const auth = getAuth()
