import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

export const UserContext = createContext(null);

export const userDecodeToken = (theToken) => {
  const decoded = jwtDecode(theToken); //objeto do payload
  return {
    role: decoded.role,
    userId: decoded.jti,
    nome: decoded.name,
    token: theToken,
  };
};

//decodifica o token que vem da api do google, extraindo as informações a cadastrando na nossa api
export const userDecodeTokenGoogle = (token) => {
  const decoded = jwtDecode(token); //objeto do payload
  return {
    googleIdAccount: decoded.sub,
    email: decoded.email,
    nome: decoded.name,
    picture: decoded.picture,
    tokenGoogle: token,
  };
};
