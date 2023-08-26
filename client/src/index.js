import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./Context/ContextProvider";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <Toaster position="top-center" reverseOrder={false} />
    <App />
  </ContextProvider>
);
