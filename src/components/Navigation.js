import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ userObj }) => {
  console.log(userObj);
  return (
    <nav>
      <ul className=" grid grid-cols-2 w-full mb-10 font-bold text-xl">
        <li className=" m-0 text-center">
          <Link to="/">
            <div className="py-3 border-[1px] border-slate-50 hover:bg-sky-50">
              Home
            </div>
          </Link>{" "}
        </li>
        <li className="m-0 text-center ">
          <Link to="/profile">
            <div className="py-3 border-[1px] border-slate-50 hover:bg-sky-50">
              {userObj.displayName}의 프로필
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
