import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";

import logoMobile from "../../assets/images/logo-white.svg";
import logoDesktop from "../../assets/images/logo-pink.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";
import Logo from "../../components/Logo/Logo";

const Nav = ({ exibeNavbar, setExibeNavbar }) => {
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () =>
      window.innerWidth >= 992 ? logoDesktop : logoMobile;

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      {/* <span
        className="navbar__close"
        onClick={() => {
          setExibeNavbar(false);
        }}
      >
        x
      </span> */}

      <Link to="/" className="eventlogo" onClick={() => setExibeNavbar(false)}>
        {/* <Logo /> */}
      </Link>

      <div className="navbar__items-box">
        <Link
          to="/"
          className="navbar__item"
          onClick={() => setExibeNavbar(false)}
        >
          Home
        </Link>

        {/* <Link to={'/detalhes-evento'} className="navbar__item" onClick={() => setExibeNavbar(false)}>Detalhes de eventos</Link> */}

        {userData.nome && userData.role === "Administrador" ? (
          <>
            <Link
              className="navbar__item"
              to="/tipo-eventos"
              onClick={() => setExibeNavbar(false)}
            >
              Tipos De Evento
            </Link>
            <Link
              className="navbar__item"
              to="/eventos"
              onClick={() => setExibeNavbar(false)}
            >
              Eventos
            </Link>

            <Link
              className="navbar__item"
              to="/tipos-usuario"
              onClick={() => setExibeNavbar(false)}
            >
              Tipos De Usuário
            </Link>

            <Link
              className="navbar__item"
              to={"/instituicoes"}
              onClick={() => setExibeNavbar(false)}
            >
              Instituições
            </Link>
          </>
        ) : userData.nome && userData.role === "Comum" ? (
          <Link
            className="navbar__item"
            to="/eventos-aluno"
            onClick={() => setExibeNavbar(false)}
          >
            Eventos
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Nav;
