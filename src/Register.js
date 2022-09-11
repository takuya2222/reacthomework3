import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
import { Navigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import db from "./FirebaseConfig";

const Register = () => {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const sendInfo = (e) => {
    // firestoreのデータベースにデータを追加する
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
      );
    } catch (error) {
      alert("正しく入力してください");
    }
  };

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
            <button
             onClick={sendInfo}
            >
              新規登録
            </button>
          </form>
        </>
      )}
    </>
  );
};

export default Register;
