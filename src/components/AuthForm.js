import React, { useState } from "react";
import { auth } from "firebs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const AuthForm = ({ newAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    console.log(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        data = await createUserWithEmailAndPassword(auth, email, password);

        // 계정 생성
      } else {
        data = await signInWithEmailAndPassword(auth, email, password);

        //로그인
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    console.log(data);
  };
  return (
    <>
      <form className="flex flex-col gap-y-3" onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          className="px-3 py-2 rounded-sm border border-gray-200 text-lg text-gray-700 focus:outline-none focus:border-gray-600 transition-colors delay-100"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          className="px-3 py-2 rounded-sm border border-gray-200 text-lg text-gray-700 focus:outline-none focus:border-gray-600 transition-colors delay-100"
        />

        <input
          className="bg-black text-white rounded-2xl py-1.5 flex justify-center mt-1.5"
          type="submit"
          value={newAccount ? "계정 만들기" : "다음"}
        />
      </form>
    </>
  );
};

export default AuthForm;
