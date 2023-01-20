import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXthr_6mZ9yIzc72IsC22RwZ5ytD232eQ",
  authDomain: "ics4u-59c87.firebaseapp.com",
  projectId: "ics4u-59c87",
  storageBucket: "ics4u-59c87.appspot.com",
  messagingSenderId: "19297149834",
  appId: "1:19297149834:web:0db87b8d6ac1f697cf1e73"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export { auth, firestore, storage }