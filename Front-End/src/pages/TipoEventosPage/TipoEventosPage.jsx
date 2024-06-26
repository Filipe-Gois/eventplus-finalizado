import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import TableTp from "./TableTp/TableTp";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import {
  InputDefault,
  Button,
  Table,
} from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoEventosPage = () => {
  const tableHead = ["Título"];

  // states
  const [frmEdit, setFrmEdit] = useState(false); //está em modo edição?
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState(null); //para editar, por causa do evento!
  const [tipoEventos, setTipoEventos] = useState([]); //array
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification
  const [showSpinner, setShowSpinner] = useState(false); //Spinner Loading

  // Função que após a página/DOM estar pronta
  useEffect(() => {
    // define a chamada em nossa api
    const loadEventsType = async () => {
      setShowSpinner(true);

      try {
        const response = await api.get(eventsTypeResource);

        const tpModificado = [];

        response.data.forEach((element) => {
          tpModificado.push({
            id: element.idTipoEvento,
            titulo: element.titulo,
          });
        });

        setTipoEventos(tpModificado);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao carregar os tipos de eventos.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }

      setShowSpinner(false);
    };
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  // ***************************** CADASTRAR *****************************
  const handleSubmit = async (e) => {
    e.preventDefault(); //evita o submit do formulário
    setShowSpinner(true);

    if (titulo.trim().length < 3) {
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
      await api.post(eventsTypeResource, {
        titulo: titulo,
      });

      setTitulo(""); //limpa o state
      // avisa o usuário
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      // Atualiza a tela
      const buscaEventos = await api.get(eventsTypeResource);
      setTipoEventos(buscaEventos.data); //aqui retorna um array, então de boa!
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro na operação. Verifique a conexão com a internet`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  /********************* EDITAR CADASTRO *********************/
  // mostra o formulário de edição
  const showUpdateForm = async (idElement) => {
    setFrmEdit(true);
    setIdEvento(idElement); // preenche o id do evento para poder atualizar
    setShowSpinner(true);
    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo);
    } catch (error) {}
    setShowSpinner(false);
  };
  // cancela a tela/ação de edição (volta para o form de cadastro)
  const editActionAbort = () => {
    setFrmEdit(false);
    setTitulo(""); //reseta as variáveis
    setIdEvento(null); //reseta as variáveis
  };
  // cadastrar a atualização na api
  const handleUpdate = async (e) => {
    e.preventDefault(); //para o evento de submit
    setShowSpinner(true);

    try {
      // atualiar na api

      const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo: titulo,
      }); //o id está no state

      if (retorno.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Cadastro atualizado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });

        // atualizar os dados na tela
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);

        // volta para a tela de cadastro
        editActionAbort();
      }
    } catch (error) {
      //  notificar o erro ao usuário
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro na operação. Por favor verifique a conexão!`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  /********************* APAGAR DADOS *********************/
  // apaga o tipo de evento na api
  const handleDelete = async (idElement) => {
    // se confirmar a exclusão, cancela a ação
    if (window.confirm("Confirma a exclusão?")) {
      setShowSpinner(true);
      try {
        const promise = await api.delete(`${eventsTypeResource}/${idElement}`);

        if (promise.status === 204) {
          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Cadastro apagado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });

          // DESAFIO: fazer uma função para retirar o registro apagado do array tipoEventos
          const buscaEventos = await api.get(eventsTypeResource);
          setTipoEventos(buscaEventos.data); //aqui retorna um array, então de boa!
        }
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao apagar o tipo de evento.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
      setShowSpinner(false);
    }
  };
  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      {/* SPINNER - Feito com position */}
      {showSpinner ? <Spinner /> : null}

      <MainContent>
        {/* formulário de cadastro do tipo do evento */}
        <section className="cadastro-evento-section">
          <Container>
            <Title titleText={"Cadastro Tipo de Eventos"} />
            <div className="cadastro-evento__box">
              <ImageIllustrator imageRender={tipoEventoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar? */}
                {!frmEdit ? (
                  // Cadastrar
                  <>
                    <InputDefault
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                  </>
                ) : (
                  // Editar
                  <>
                    <InputDefault
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      manipulationFunction={(e) => {
                        setTitulo(e.target.value);
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

        {/* Listagem de tipo de eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Lista Tipo de Eventos"} color="white" />

            <Table
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
              showUpdate={true}
              showDelete={true}
              dados={[
                tableHead,
                [
                  ...tipoEventos.map((tipoEvento) => [
                    tipoEvento.id,
                    tipoEvento.titulo,
                  ]),
                ],
              ]}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
