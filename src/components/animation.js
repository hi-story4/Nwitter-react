import React, { useEffect } from "react";
import lottie from "lottie-web";
import animationData from "twitter.json";

const Animation = (props) => {
  const container = document.querySelector("#container");

  useEffect(() => {
    lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });
  }, []);
  return (
    <>
      <div id="container" className="w-auto"></div>
    </>
  );
};

export default Animation;
