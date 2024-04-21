import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //v6

// imports dos componentes de página
import HomePage from "../pages/HomePage/HomePage";
import TipoEventos from "../pages/TipoEventosPage/TipoEventosPage";
import EventosPage from "../pages/EventosPage/EventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";
import DetalhesEventoPage from "../pages/DetalhesEventoPage/DetalhesEventoPage";
import TipoUsuarioPage from "../pages/TipoUsuarioPage/TipoUsuarioPage";
import InstituicoesPage from "../pages/InstituicoesPage/InstituicoesPage"
import Register from "../pages/Register/Register";

// Componente Rota
const Rotas = () => {
  return (
    <BrowserRouter>
      <Header />



      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route
          element={<DetalhesEventoPage />}
          path={"/detalhes-evento/:idEvento"}
        />

        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventos />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route path="/tipos-usuario" element={
          <PrivateRoute redirectTo="/">
            <TipoUsuarioPage />
          </PrivateRoute>
        } />

        <Route path="/instituicoes" element={
          <PrivateRoute redirectTo="/">
            <InstituicoesPage />
          </PrivateRoute>
        } />

        <Route element={<LoginPage />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<HomePage />} path="*" />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
