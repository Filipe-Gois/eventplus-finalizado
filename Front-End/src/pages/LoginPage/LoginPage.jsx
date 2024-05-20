import React, { useContext, useEffect, useState } from "react";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import logo from "../../assets/images/logo-pink.svg";
import {
  InputDefault,
  Button,
  InputPassword,
} from "../../components/FormComponents/FormComponents";
import loginImage from "../../assets/images/login.svg";
import api, { loginResource, usuario } from "../../Services/Service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Container from "../../components/Container/Container";
import MainContent from "../../components/MainContent/MainContent";
import Notification from "../../components/Notification/Notification";

import "./LoginPage.css";
import {
  UserContext,
  userDecodeToken,
  userDecodeTokenGoogle,
} from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { GoogleLogin } from "@react-oauth/google";
import { gapi } from "gapi-script";
import { LoginGoogleButton } from "../../components/LoginGoogleButton/LoginGoogleButton";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "adm@adm.com",
    senha: "123456",
    googleIdAccount: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [notifyUser, setNotifyUser] = useState({});

  //importa os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({});

  const { errors, isSubmitting } = formState;

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
        navigate("/"); //envia o usuário para a home
      }
    } catch (error) {
      console.log("erro ao logar", error);
    }
  };

  const criarContaComGoogle = async (nome, email, googleIdAccount) => {
    try {
      const { status } = await api.post(
        `${usuario}?isCreateAccountGoogle=true`,
        {
          nome,
          email,
          googleIdAccount,
          IdTipoUsuario: "cfa6afe8-f175-49f9-8a7b-ea709db0af29",
        }
      );

      if (status === 201) {
        await logar(email, "", googleIdAccount, true);
      }
    } catch (error) {}
  };

  //retorna um booleano se existe ou nao um usuario google com essas informacoes
  const existeUsuarioGoogle = async (email, googleIdAccount) => {
    try {
      const { status } = await api.get(
        `${usuario}/BuscarPorIdGoogle?email=${email}&googleIdAccount=${googleIdAccount}`
      );
      return status === 200;
    } catch (error) {}
  };

  const handleLoginWithGoogle = async (response) => {
    try {
      const { googleIdAccount, email, nome } = userDecodeTokenGoogle(
        response.credential
      );

      const existeUsuario = await existeUsuarioGoogle(email, googleIdAccount);

      if (existeUsuario) {
        await logar(email, "", googleIdAccount, true);
      } else {
        await criarContaComGoogle(nome, email, googleIdAccount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    // validar usuário e senha:
    // tamanho mínimo de caracteres : 5
    if (user.senha.length <= 5) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `Preencha os dados corretamente!`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação!",
        showMessage: true,
      });
    }

    try {
      await logar(user.email, user.senha, "", false);
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
  };
  useEffect(() => {
    if (userData.nome) {
      navigate("/");
    }
  }, [userData]);
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
                  <InputDefault
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

                  {/* <InputDefault
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
                  /> */}

                  <InputPassword
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
                  <div
                    className="parent"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "30px 0 0 0",
                    }}
                  >
                    <GoogleLogin
                      width={"100%"}
                      buttonText="Entrar com Googleasdasdasd"
                      className="signInButton"
                      // onError={() => handleLoginWithGoogle()}
                      onSuccess={(response) => handleLoginWithGoogle(response)}
                    />
                  </div>
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
