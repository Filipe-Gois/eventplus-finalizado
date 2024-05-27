import Rotas from "./routes/routes";
import { UserContext } from "./context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { ClientIdContext } from "./context/ClientIdContext";
// importa nosso app encapsulado pelo sistema de roteamento

const App = ({ clientId }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);

    const token = localStorage.getItem("token");
    setUserData(token === null ? {} : JSON.parse(token));
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
};

export default App;
