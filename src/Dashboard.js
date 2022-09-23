import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import db from "./FirebaseConfig";
import { doc, collection, getDoc, querySnapshot } from "firebase/firestore";

const Dashboard = () => {
  const [userDetail, setUserDetail] = useState({});

  // 下のuserStateとuseEffectはセット ログインかどうか判定する
  const [user, setUser] = useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); //setUserで取得したユーザーを入れている
    });
  }, []);

  // useEffect(() => {
  //   const usersCollectionRef = collection(db, "users");
  //   getDoc(usersCollectionRef).then((querySnapshot) => {
  //     setUserDetail(querySnapshot.docs.map((doc) => doc.data()));
  //     console.log(querySnapshot.docs);
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid); // 単一のユーザーを取得したい(setUserでユーザーを入れているのでuidが取得できる)
      const docSnap = await getDoc(docRef);
      setUserDetail(docSnap.data());
      console.log(userDetail);
    })();
  }, []);

  return (
    <>
      <h2>{userDetail.displayName}さんようこそ！</h2>
      <h1>ユーザー一覧</h1>
      <p>{user && user.email}</p>
      <button>ログアウト</button>
    </>
  );
};

export default Dashboard;
