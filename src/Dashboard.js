import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDocs, querySnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState();

  useEffect(() => {
    const userData = collection(db, "users");
    getDocs(userData).then((querySnapshot) => {
      setName(querySnapshot);
    });
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      <h2>{name}さん</h2>
      <h1>ユーザー一覧</h1>
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
