import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import loginImage from "../../assets/images/login.svg";
import api, { loginResource } from "../../Services/Service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "adm@adm.com", senha: "123456" });
  //importa os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData]);

  async function handleSubmit(e) {
    e.preventDefault();

    // validar usuário e senha:
    // tamanho mínimo de caracteres : 3
    if (user.email.length >= 3 && user.senha.length >= 3) {
      try {
        const promise = await api.post(loginResource, {
          email: user.email,
          senha: user.senha,
        });

        const userFullToken = userDecodeToken(promise.data.token); // decodifica o token vindo da api

        setUserData(userFullToken); // guarda o token globalmente
        localStorage.setItem("token", JSON.stringify(userFullToken));
        navigate("/"); //envia o usuário para a home
      } catch (error) {
        // erro da api: bad request (401) ou erro de conexão
        alert("Verifique os dados e a conexão com a internet!");
        console.log("ERROS NO LOGIN DO USUÁRIO");
        console.log(error);
      }
    } else {
      alert("Preencha os dados corretamente");
    }
  }
  return (
    <MainContent>
      <section className="login">
        <Container>
          <div className="login-box">
            <div className="login__illustration">
              <div className="login__illustration-rotate"></div>
              <ImageIllustrator
                imageRender={loginImage}
                altText="Imagem de um homem em frente de uma porta de entrada"
                additionalClass="login-illustrator"
              />
            </div>

            <div className="frm-login">
              <img src={logo} className="frm-login__logo" alt="" />

              <form className="frm-login__formbox" onSubmit={handleSubmit}>
                <Input
                  additionalClass="frm-login__entry"
                  type="email"
                  id="login"
                  name="login"
                  required={true}
                  value={user.email}
                  manipulationFunction={(e) => {
                    setUser({
                      ...user,
                      email: e.target.value.trim(),
                    });
                  }}
                  placeholder="Email"
                />

                {/* <span className="focus-input" data-placeholder="Email"></span> */}

                <Input
                  additionalClass="frm-login__entry"
                  type="password"
                  id="senha"
                  name="senha"
                  required={true}
                  value={user.senha}
                  manipulationFunction={(e) => {
                    setUser({
                      ...user,
                      senha: e.target.value.trim(),
                    });
                  }}
                  placeholder="Senha"
                />

                {/* <span className="focus-input" data-placeholder="Password"></span> */}

                <Link to="" className="frm-login__link">
                  Esqueceu a senha?
                </Link>

                <Button
                  textButton="Entrar"
                  id="btn-login"
                  name="btn-login"
                  type="submit"
                  additionalClass="frm-login__button"
                />

                <Link
                  to={"/register"}
                  className="frm-login__link frm-login__link--criar"
                >
                  Criar conta
                </Link>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default LoginPage;
