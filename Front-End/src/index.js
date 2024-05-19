import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "1037920734937-7jpfbgol8jhe4s02nb2e9elttrov2sm3.apps.googleusercontent.com";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <App clientId={clientId} />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
