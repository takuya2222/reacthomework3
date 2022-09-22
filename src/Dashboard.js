import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { collection, getDoc, querySnapshot } from "firebase/firestore";

const Dashboard = (props) => {
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
    getDoc(usersCollectionRef).then((querySnapshot) => {
      setUserDetail(querySnapshot.docs.map((doc) => doc.data()));
      console.log(querySnapshot.docs);
    });
  }, []);

  console.log("setUserDetail", setUserDetail);
  return (
    <>
      <h2>{userDetail[0].displayName}さんようこそ！</h2>
      <h1>ユーザー一覧</h1>
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
