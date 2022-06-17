import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth } from "firebs";
import { updateProfile } from "firebase/auth";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName == null) {
          const name = user.email;
          console.log(name);
          updateProfile(auth.currentUser, { displayName: name });
        }
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    setUserObj(auth.currentUser);
  };
  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={isLoggedIn}
          userObj={userObj}
        />
      ) : (
        " Initializing ..."
      )}
    </>
  );
}

export default App;
