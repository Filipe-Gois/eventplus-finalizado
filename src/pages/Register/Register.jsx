import React, { useState, useEffect, useContext } from "react";

import "./Register.css";
import { UserContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState();
  const { userData, setUserData } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData]);
  return (
    <MainContent>
      <Container>
        <section className="register-section"></section>
      </Container>
    </MainContent>
  );
};

export default Register;
