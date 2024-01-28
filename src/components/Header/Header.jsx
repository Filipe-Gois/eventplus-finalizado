import React, { useState, useEffect } from "react";
import "./Header.css";

import Container from "../Container/Container";
import Nav from "../Nav/Nav";
import PerfilUsuario from "../PerfilUsuario/PerfilUsuario";
import { Button } from "../../components/FormComponents/FormComponents";
import Logo from "../Logo/Logo";
import menubar from "../../assets/images/menubar.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [exibeNavbar, setExibeNavbar] = useState(false); //exibe/esconde menu

  useEffect(() => {
    const showMenu = () => {};

    window.addEventListener("resize", showMenu);

    return () => {
      window.removeEventListener("resize", showMenu);
    };
  }, []);

  return (
    <header className="headerpage">
      <Container>
        <div className="header-flex">
          {window.innerWidth < 992 ? (
            <button
              onClick={() =>
                exibeNavbar ? setExibeNavbar(false) : setExibeNavbar(true)
              }
              className={`headerpage__menubar ${
                exibeNavbar ? "headerpage__menubar--white" : ""
              }`}
            ></button>
          ) : (
            <Link className="navbar__item" to={"/"}>
              <Logo />
            </Link>
          )}

          <Nav exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} />
          <PerfilUsuario />
        </div>
      </Container>
    </header>
  );
};

export default Header;
