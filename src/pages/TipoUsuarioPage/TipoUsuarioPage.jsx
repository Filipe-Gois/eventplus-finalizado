import React, { useEffect, useState } from "react";
import "./TipoUsuarioPage.css";
import MainContent from "../../components/MainContent/MainContent";
import {
  Button,
  Input,
  Table,
} from "../../components/FormComponents/FormComponents";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import TipoUsuarioImage from "../../assets/images/tipo-usuario.svg";
import api, { usersTypes } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoUsuarioPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [tiposUsuario, setTiposUsuario] = useState({
    idTipoUsuario: "",
    titulo: "",
  });
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [showSpinner, setShowSpinner] = useState(false); //Spinner Loading

  const handleUpdate = async (e) => {
    e.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSpinner(true);

    if (tiposUsuario.titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: `O título deve ter pelo menos 3 caracteres`,
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação!",
        showMessage: true,
      });
      return;
    }

    try {
      api.post(usersTypes, tiposUsuario);
      setTiposUsuario({ ...tiposUsuario, titulo: "" });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `O título deve ter pelo menos 3 caractere`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    } catch (error) {}

    setShowSpinner(false);
  };

  const editActionAbort = () => {
    setTiposUsuario({ ...tiposUsuario, titulo: "" });
  };

  const loadTypes = async () => {
    try {
      const response = await api.get(usersTypes);
      setTiposUsuario(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    loadTypes();
    console.log(tiposUsuario);
  }, []);

  return (
    <MainContent>
      <section className="cadastro-tipo-usuario-section">
        <Container>
          <Title titleText={"CADASTRO TIPO DE USUÁRIO"} />
          <div className="cadastro-tipo-usuario-box">
            <ImageIllustrator imageRender={TipoUsuarioImage} />

            <form
              className="form-tipo-usuario"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  <Input
                    placeholder={"Título"}
                    id={"Titulo"}
                    name={"titulo"}
                    required={true}
                    type={"text"}
                    value={tiposUsuario.titulo}
                    manipulationFunction={(e) => {
                      setTiposUsuario({
                        ...tiposUsuario,
                        titulo: e.target.value,
                      });
                    }}
                  />
                  <Button textButton={"Cadastrar"} />
                </>
              ) : (
                <>
                  <Input
                    id="Titulo"
                    placeholder="Título"
                    name={"titulo"}
                    type={"text"}
                    required={"required"}
                    value={tiposUsuario.titulo}
                    manipulationFunction={(e) => {
                      setTiposUsuario({
                        ...tiposUsuario,
                        titulo: e.target.value,
                      });
                    }}
                  />
                  <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="atualizar"
                      type="submit"
                      additionalClass="button-component--middle"
                    />
                    <Button
                      textButton="Cancelar"
                      id="cancelar"
                      name="cancelar"
                      type="button"
                      manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      <section className="lista-tipos-usuario">
        <Container>
          <Title titleText={"LISTA TIPO DE USUÁRIOS"} color="white" />

          <Table dados={[["Título", "Editar", "Deletar"], [{}]]} />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoUsuarioPage;
