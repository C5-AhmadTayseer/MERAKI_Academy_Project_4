import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowerRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowerRouter>
      <App />
    </BrowerRouter>
  </React.StrictMode>
);
