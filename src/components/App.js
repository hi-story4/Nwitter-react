 import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { auth } from "firebs";

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      if  (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })

  }, []);
  return (
    <>
      { init ? < AppRouter isLoggedIn={isLoggedIn} /> : " Initializing ..." }
    
    </>
  );
}

export default App;
