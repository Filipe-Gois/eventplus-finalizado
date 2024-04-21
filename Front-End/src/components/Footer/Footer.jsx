import React from "react";
import "./Footer.css";

// import Container from '../Container/Container';

const Footer = ({
  textRights = `Escola Senai de Informática - ${new Date().getFullYear()}`,
}) => {
  return (
    <footer className="footer-page">
      <p className="footer-page__rights">&copy; {textRights}</p>
    </footer>
  );
};

export default Footer;
