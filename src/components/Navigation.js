import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ userObj }) => {
  console.log(userObj);
  return (
    <nav>
      <ul className="flex justify-center mb-10 font-bold text-xl">
        <li className="h-full m-0 text-center">
          <Link to="/">
            <div className="p-3 border-[1px] border-slate-50 hover:bg-sky-50">
              <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </div>
          </Link>{" "}
        </li>
        <li className="m-0 text-center ">
          <Link to="/profile">
            <div className="p-3 border-[1px] border-slate-50 hover:bg-sky-50">
              <div>
                <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
              </div>
              {userObj.displayName}의 프로필
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
