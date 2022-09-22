import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcPyklyUY4AFO6h_6gpb2y1OK80lHQYpc",
  authDomain: "reacthomework3.firebaseapp.com",
  projectId: "reacthomework3",
  storageBucket: "reacthomework3.appspot.com",
  messagingSenderId: "234516128927",
  appId: "1:234516128927:web:b390592442704c026eeeaa",
  measurementId: "G-DGE1FDTQ33",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export default db;
