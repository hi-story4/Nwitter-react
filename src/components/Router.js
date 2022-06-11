import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ isLoggedIn }) => {
  console.log(typeof isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        <Route path="/profile" element={<Profile />}>
          {" "}
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
