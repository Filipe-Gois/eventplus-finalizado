import React, { useContext, useEffect } from "react";
import { ClientIdContext } from "../../context/ClientIdContext";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";

export const LoginGoogleButton = () => {
  const { clientId } = useContext(ClientIdContext);

  const { signIn } = useGoogleLogin({
    clientId: clientId,
  });

  const handleLogin = () => {
    signIn();
  };

  return <button onClick={() => handleLogin()}>Login com Google</button>;
};
