import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { Navigate } from "react-router-dom";
import { getDocs, collection, addDoc } from "firebase/firestore";

import db from "./FirebaseConfig";
import { auth } from "./FirebaseConfig.js";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // firestoreのデータベースにデータを追加する
  const stockUserInfo = (e) => {
    // 画面のリロードを防ぐ
    e.preventDefault();

    addDoc(collection(db, "users"), {
      displayName: registerName,
    });
    console.log("test-firestore");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword,
        console.log("test-auth")
      ) && stockUserInfo(e);
    } catch (error) {
      alert("正しく入力してください");
    }
  };

  useEffect(() => {
    const userData = collection(db, "users");
    getDocs(userData).then((querySnapshot) => {
      setRegisterName(querySnapshot);
      console.log(querySnapshot.docs.map((doc) => doc.data));
    });
    console.log("マウント");
  }, []);

  const [user, setUser] = useState("");

  // ログイン判定のレンダリングは1度だけでいいのでuseEffectを使う
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <>
      {user ? (
        <Navigate to={`/`} />
      ) : (
        <>
          <h1>新規登録画面</h1>
          {registerName}
          <form onSubmit={handleSubmit}>
            <div>
              <label>ユーザー名</label>
              <input
                name="name"
                type="name"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />
            </div>
            <div>
              <label>メールアドレス</label>
              <input
                name="email"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>
            <div>
              <label>パスワード</label>
              <input
                name="password"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
            </div>
            <button>新規登録</button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
