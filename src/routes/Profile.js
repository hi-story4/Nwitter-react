import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, dbService } from "firebs";
import { signOut, updateProfile } from "firebase/auth";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import Nweet from "components/Nweet";

function Profile({ refreshUser, userObj }) {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [newArray, setNewArray] = useState([]);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      console.log(newDisplayName);
      await updateProfile(auth.currentUser, { displayName: newDisplayName });
      refreshUser();
    }
  };
  const onChange = (event) => {
    setNewDisplayName(event.target.value);
  };
  let navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/");
    refreshUser();
  };

  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt")
    );
    const querySnapshot = await getDocs(q);

    const newArray = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setNewArray(newArray);
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  return (
    <div>
      <div className="h-screen max-w-2xl mx-auto">
        <div className="text-3xl pb-10">Profile</div>
        <div className="mb-3">Profile Name Update</div>
        <div className="mb-10">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Display Name"
              value={newDisplayName}
              onChange={onChange}
            />

            <input type="submit" value="확인" className="focus:bg-slate-100" />
          </form>
        </div>

        <div>
          {newArray.map((nweet) => (
            <Nweet
              key={nweet.id}
              nweetObj={nweet}
              isOwner={nweet.creatorId === userObj.uid}
            />
          ))}
        </div>

        <div className="flex w-full justify-end  mt-32">
          <button
            className="flex justify-end rounded-2xl p-1 text-red-400 hover:bg-red-50 "
            onClick={onLogOutClick}
          >
            {" "}
            Log Out{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
