import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDocs, querySnapshot } from "firebase/firestore";

const Dashboard = (props) => {
  const [displayName, setDisplayName] = useState("");
  const [userDetail, setUserDetail] = useState({});

  // 下のuserStateとuseEffectはセット
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUserDetail(querySnapshot.docs.map((doc) => doc.data()));
      console.log(querySnapshot.docs);
    });
  }, []);

  console.log("UserDetail", userDetail);
  return (
    <>
      <h2>{setUserDetail.displayName}さんようこそ！</h2>
      <h1>ユーザー一覧</h1>
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
