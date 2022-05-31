import React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";

const AppRouter = ({ isLoggedIn }) => {
  console.log(typeof isLoggedIn);
  console.log(isLoggedIn);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isLoggedIn ? <Home /> : <Auth />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
