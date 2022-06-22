import React, { useEffect } from "react";
import { useState } from "react";
import { auth } from "firebs";
import {
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import AuthForm from "components/AuthForm";
import { faDiagramPredecessor } from "@fortawesome/free-solid-svg-icons";

const Auth = () => {
  const [newAccount, setNewAccount] = useState(true);

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
          <img
            src={process.env.PUBLIC_URL + "/images/twitter.svg"}
            alt="React"
          />
          {/*  public 폴더 쓰는 법.
         https://create-react-app.dev/docs/using-the-public-folder/ */}
        </div>
        <div className=" font-bold text-3xl mb-8">
          {newAccount ? "트위터 계정 만들기" : "트위터에 로그인하기"}{" "}
        </div>

        <div className="w-1/2">
          <div className="flex justify-center my-4 py-2 border-[1.5px] border-gray-200  rounded-3xl cursor-pointer hover:delay-100  hover:bg-slate-100">
            <img
              className="w-5 mx-2 "
              src={process.env.PUBLIC_URL + "/images/google.svg"}
              alt="React"
            />
            <button onClick={onSocialClick} name="google">
              Google 계정으로 로그인
            </button>
          </div>

          <div className="flex justify-center  my-4 py-2 border-[1.5px] border-gray-200  rounded-3xl cursor-pointer hover:delay-100  hover:bg-gray-200">
            <div className="w-4 flex justify-center items-center mx-2">
              <img
                className="w-full aspect-auto"
                src={process.env.PUBLIC_URL + "/images/github.svg"}
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

          <AuthForm newAccount={newAccount} />

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
