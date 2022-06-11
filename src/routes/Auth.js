import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "firebs";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import Animation from "components/animation";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);

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
    }
    console.log(data);
  };

  const toggleAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name == "google") {
      provider = new GoogleAuthProvider();
    } else if (name == "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(auth, provider);
  };
  return (
    <>
      <div className=" max-w-3xl w-full my-auto mx-auto flex flex-col  items-center py-10">
        <div className=" mx-auto w-12  mb-10">
          <Animation />

          <img src="images/twitter.svg" alt="React" />
        </div>
        <div className=" font-bold text-3xl mb-8">
          {newAccount ? "트위터 계정 만들기" : "트위터에 로그인하기"}{" "}
        </div>

        <div className="w-1/2">
          <div className="flex justify-center my-4 py-2 border-[1.5px] border-gray-200  rounded-3xl cursor-pointer hover:delay-100  hover:bg-slate-100">
            <img className="w-5 mx-2 " src="images/google.svg" alt="React" />
            <button onClick={onSocialClick} name="google">
              Google 계정으로 로그인
            </button>
          </div>

          <div className="flex justify-center  my-4 py-2 border-[1.5px] border-gray-200  rounded-3xl cursor-pointer hover:delay-100  hover:bg-gray-200">
            <div className="w-4 flex justify-center items-center mx-2">
              <img
                className="w-full aspect-auto"
                src="images/github.svg"
                alt="React"
              />
            </div>
            <button
              onClick={onSocialClick}
              name="github"
              className=" font-semibold"
            >
              Github로 로그인하기
            </button>
          </div>

          <div></div>

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
          <div>
            <div className="flex items-start mt-7 ">
              <span className="mr-2">
                {newAccount
                  ? " 이미 계정이 있으신가요? "
                  : "계정이 없으신가요?"}
              </span>
              <span
                className="text-blue-400 cursor-pointer hover:underline hover:border-blue-400"
                onClick={toggleAccount}
              >
                {newAccount ? "로그인" : "가입하기"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Auth;
