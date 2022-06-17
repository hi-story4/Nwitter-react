import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  console.log(typeof isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home userObj={userObj} /> : <Auth />}
        />
        <Route
          path="/profile"
          element={<Profile refreshUser={refreshUser} userObj={userObj} />}
        >
          {" "}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
