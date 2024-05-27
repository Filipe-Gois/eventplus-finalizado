import React, { useState, useEffect, useContext } from "react";

import "./Register.css";
import { UserContext, userDecodeToken } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import {
  InputDefault,
  Button,
  InputPassword,
  InputComponent,
  ButtonAsync,
} from "../../components/FormComponents/FormComponents";
import logo from "../../assets/images/logo-pink.svg";
import loginImage from "../../assets/images/login.svg";
import Notification from "../../components/Notification/Notification";
import api, { usuario, loginResource } from "../../Services/Service";

const Register = () => {
  const [user, setUser] = useState({
    nome: "",
    email: "",
    senha: "",
    idTipoUsuario: "cfa6afe8-f175-49f9-8a7b-ea709db0af29",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState(false);

  const [loading, setLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);

  const [notifyUser, setNotifyUser] = useState({});

  const navigate = useNavigate();

  const logar = async (
    email,
    senha,
    googleIdAccount,
    isGoogleLogin = false
  ) => {
    try {
      const { status, data } = await api.post(
        `${loginResource}?isGoogleLogin=${isGoogleLogin}
        `,
        isGoogleLogin ? { email, googleIdAccount } : { email, senha }
      );

      if (status === 200) {
        const userFullToken = userDecodeToken(data.token); // decodifica o token vindo da api

        setUserData(userFullToken); // guarda o token globalmente
        localStorage.setItem("token", JSON.stringify(userFullToken));
        actionAbort();
        navigate("/"); //envia o usuário para a home
      }
    } catch (error) {
      console.log("erro ao logar", error);
    }
  };

  const criarConta = async (nome, email, senha) => {
    setLoading(true);
    try {
      const { status } = await api.post(
        `${usuario}?isCreateAccountGoogle=false`,
        {
          nome,
          email,
          senha,
          idTipoUsuario: "cfa6afe8-f175-49f9-8a7b-ea709db0af29",
        }
      );

      if (status === 201) {
        await logar(email, senha, "", false);
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Email já vinculado à uma conta! `,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
      setLoading(false);
    }
  };

  const actionAbort = () => {
    setUser({ ...user, nome: "", email: "", senha: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.senha.length < 5) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `A senha deve conter pelo menos 5 caracteres!`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação!",
        showMessage: true,
      });
      return;
    }
    try {
      await criarConta(user.nome, user.email, user.senha);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Não foi possível criar uma conta!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };
  const handleErrors = () => {
    setLoginError(!user.email.includes("@") && user.email);
  };

  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData, user.email]);
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
                <form className="frm-login__formbox" onSubmit={handleSubmit}>
                  <img src={logo} className="frm-login__logo" alt="" />

                  <InputComponent
                    textLabel="Nome"
                    id="nome"
                    name={"nome"}
                    value={user.nome}
                    type={"text"}
                    onChange={(e) => {
                      setUser({ ...user, nome: e.target.value });
                    }}
                  />

                  <InputComponent
                    textLabel="Email"
                    value={user.email}
                    type={"email"}
                    error={user.email && !user.email.includes("@")}
                    errorText="Formato de e-mail inválido!"
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                      handleErrors();
                    }}
                  />

                  <InputPassword
                    error={user.senha.length <= 5 && user.senha}
                    errorText="A senha deve conter no mínimo 6 caracteres!"
                    value={user.senha}
                    onChange={(e) => {
                      setUser({
                        ...user,
                        senha: e.target.value.trim(),
                      });
                    }}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                  />

                  <ButtonAsync
                    textButton="Cadastre-se"
                    id="btn-login"
                    name="btn-login"
                    type="submit"
                    additionalClass="frm-login__button"
                    loading={loading}
                  />

                  <span className="frm-login__span frm-login__link--criar">
                    Já possui uma conta ?{" "}
                    {
                      <Link
                        to={"/login"}
                        className="frm-login__link frm-login__link--criar"
                      >
                        Fazer Login
                      </Link>
                    }
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

export default Register;
