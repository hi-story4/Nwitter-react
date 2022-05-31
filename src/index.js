import React from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import App from "components/App";

const container = document.getElementById("root");
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
