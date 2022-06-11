import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "firebs";
import { signOut } from "firebase/auth";

function Profile() {
  let navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <h1>Profile</h1>
      <button onClick={onLogOutClick}> Log Out </button>
    </>
  );
}
export default Profile;
