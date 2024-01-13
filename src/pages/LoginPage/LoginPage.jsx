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
import Notification from "../../components/Notification/Notification";

import "./LoginPage.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const [user, setUser] = useState({ email: "adm@adm.com", senha: "123456" });
  const [notifyUser, setNotifyUser] = useState({});

  //importa os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({});

  const { errors, isSubmitting } = formState;

  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData]);

  async function handleSubmitData(e) {
    e.preventDefault();

    // validar usuário e senha:
    // tamanho mínimo de caracteres : 5
    if (user.senha.length >= 5) {
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
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Dados incorretos.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
    } else {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Preencha os dados corretamente!`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação!",
        showMessage: true,
      });
    }
  }
  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <MainContent>
        <section className="login-section">
          <div className="login__illustration">
            <Container>
              <div className="login__illustration-box">
                <ImageIllustrator
                  imageRender={loginImage}
                  altText="Imagem de um homem em frente de uma porta de entrada"
                  additionalClass="login-illustrator"
                />
              </div>
            </Container>
          </div>

          <div className="login">
            <Container>
              <div className="frm-login">
                <form
                  className="frm-login__formbox"
                  onSubmit={handleSubmitData}
                >
                  <img src={logo} className="frm-login__logo" alt="" />
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

                  <Link to="" className="frm-login__link--forgot-password">
                    Esqueceu a senha?
                  </Link>

                  <Button
                    textButton="Entrar"
                    id="btn-login"
                    name="btn-login"
                    type="submit"
                    additionalClass="frm-login__button"
                  />
                  <span className="frm-login__span frm-login__link--criar">
                    Novo aqui ?{" "}
                    <Link
                      to={"/register"}
                      className="frm-login__link frm-login__link--criar"
                    >
                      Criar conta
                    </Link>
                  </span>
                </form>
              </div>
            </Container>
          </div>
        </section>
      </MainContent>
    </>
  );
};

export default LoginPage;
