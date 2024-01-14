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

import editPen from "../../assets/images/edit-pen.svg";
import trashDelete from "../../assets/images/trash-delete.svg";
import eyeIcon from "../../assets/images/eyeIcon.svg";

const TipoUsuarioPage = () => {
  const [frmEdit, setFrmEdit] = useState(false);
  const [frmEditData, setFrmEditData] = useState({
    idTipoUsuario: null,
    titulo: "",
  });

  const [tipoUsuario, setTipoUsuario] = useState({
    idTipoUsuario: null,
    titulo: "",
  });
  const [tiposUsuario, setTiposUsuario] = useState([]);

  const [titulo, setTitulo] = useState();
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [showSpinner, setShowSpinner] = useState(false); //Spinner Loading

  const [tableHead] = useState(["Título", "Editar", "Deletar"]);

  const handleDelete = async (id) => {
    if (!window.confirm("Confirma a exclusão?")) {
      return;
    }

    setShowSpinner(true);

    try {
      const response = await api.delete(`${usersTypes}/${id}`);

      loadTypes();

      if (response.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Cadastro apagado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao deletar tipo de usuário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  const showUpdateForm = async (idTipoUsuario) => {
    setFrmEdit(true);

    try {
      const response = await api.get(usersTypes + "/" + idTipoUsuario);
      setFrmEditData(response.data);
    } catch (error) {}
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    setShowSpinner(true);

    try {
      const response = await api.put(
        usersTypes + "/" + frmEditData.idTipoUsuario,
        { titulo: frmEditData.titulo }
      );

      loadTypes();

      if (response.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Cadastro atualizado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }

      editActionAbort();
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao atualizar tipo de usuário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setShowSpinner(true);

    if (tipoUsuario.titulo.trim().length < 3) {
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
      await api.post(usersTypes, tipoUsuario);

      loadTypes();

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      editActionAbort();
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao cadastrar tipo de usuário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  const editActionAbort = () => {
    setTipoUsuario({ idTipoUsuario: null, titulo: "" });
    setFrmEdit(false);
  };

  const loadTypes = async () => {
    setShowSpinner(true);
    try {
      const response = await api.get(usersTypes);

      setTiposUsuario(response.data);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro carregar os tipos de usuário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  };

  useEffect(() => {
    loadTypes();
  }, []);

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      {/* SPINNER - Feito com position */}
      {showSpinner ? <Spinner /> : null}

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
                      value={tipoUsuario.titulo}
                      manipulationFunction={(e) => {
                        setTipoUsuario({
                          ...tipoUsuario,
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
                      value={frmEditData.titulo}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
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

            <Table
              dados={[
                tableHead,
                [
                  ...tiposUsuario.map((tipoUsuario) => [
                    tipoUsuario.titulo,
                    <img
                      className="table-data__icon"
                      src={editPen}
                      alt=""
                      onClick={() => showUpdateForm(tipoUsuario.idTipoUsuario)}
                    />,
                    <img
                      className="table-data__icon"
                      src={trashDelete}
                      alt=""
                      onClick={(e) => handleDelete(tipoUsuario.idTipoUsuario)}
                    />,
                  ]),
                ],
              ]}
              addtionalClass={tableHead.length > 3 ? "scroll-vertical" : ""}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoUsuarioPage;
