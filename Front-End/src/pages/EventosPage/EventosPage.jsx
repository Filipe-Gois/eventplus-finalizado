import React, { useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import ImageIllustrator from "../../components/ImageIllustrator/ImageIllustrator";
import {
  Input,
  Button,
  Select,
} from "../../components/FormComponents/FormComponents";
// import Table  from "./TableEv/TableEv";
import api, {
  eventsResource,
  eventsTypeResource,
  institutionResource,
} from "../../Services/Service";
import Spinner from "../../components/Spinner/Spinner";
import Notification from "../../components/Notification/Notification";
import { truncateDateFromDb } from "../../Utils/stringFunctions";
import eventoImage from "../../assets/images/evento.svg";
// import { Table } from "../../components/FormComponents/FormComponents";
import TableEv from "./TableEv/TableEv";
import "./EventosPage.css";

const EventosPaage = () => {
  //dados do form

  const [eventos, setEventos] = useState([]);
  const [evento, setEvento] = useState({
    nomeEvento: "",
    descricao: "",
    dataEvento: "",
    idTipoEvento: "",
    idInstituicao: "",
  });

  const [tiposEvento, setTiposEvento] = useState([]);
  const [instituicoes, setInstituicoes] = useState([]);

  const [frmEditData, setFrmEditData] = useState({}); //dados do formulário de edição de dados

  //states condicionais
  const [showSpinner, setShowSpinner] = useState(false);
  //controla qual é a ação do submit, cadastrar ou atualizar
  const [frmEdit, setFrmEdit] = useState(false);
  const [notifyUser, setNotifyUser] = useState({}); //Componente Notification

  // const tableHead = [
  //   "Evento",
  //   "Descrição",
  //   "Tipo Evento",
  //   "Data",
  //   "Editar",
  //   "Deletar",
  // ];

  // - Carrega os tipos de evento no carregamento do componente
  useEffect(() => {
    loadEventsType();
  }, [frmEdit]); //frmEdit[instituicao ]

  const loadEventsType = async () => {
    setShowSpinner(true);

    try {
      const promise = await api.get(eventsResource);
      const promiseTipoEventos = await api.get(eventsTypeResource);
      const promiseInstituicoes = await api.get(institutionResource);
      //só tem uma instituição neste projeto mas já fica preparado pra adicionar mais!
      setEventos(promise.data);

      const tpEventosModificado = [];

      //retorno da api (array tipo de eventos)
      promiseTipoEventos.data.forEach((event) => {
        tpEventosModificado.push({
          value: event.idTipoEvento,
          text: event.titulo,
        });
      });

      const instituicaoModificado = [];

      promiseInstituicoes.data.forEach((event) => {
        instituicaoModificado.push({
          value: event.idInstituicao,
          text: event.nomeFantasia,
        });
      });

      setTiposEvento(tpEventosModificado);
      setInstituicoes(instituicaoModificado);
    } catch (error) {}
    setShowSpinner(false);
  };

  // UPDATE
  const editActionAbort = () => {
    setEvento({
      ...evento,
      nomeEvento: "",
      descricao: "",
      dataEvento: "",
      idTipoEvento: "",
      idInstituicao: "",
    });
    setFrmEdit(false);
    setFrmEditData({
      ...frmEditData,
      nomeEvento: "",
      descricao: "",
      dataEvento: "",
      idTipoEvento: "",
      idInstituicao: "",
    });
  };
  // Exibe os dados na tela com o formulário de edição
  const showUpdateForm = async (evento) => {
    setFrmEditData(evento);
    setFrmEdit(true);
  };

  // UPDATE ON API MONSTER BACKEND
  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowSpinner(true);

    if (
      frmEditData.nomeEvento.trim().length === 0 ||
      frmEditData.descricao.trim().length === 0 ||
      frmEditData.idTipoEvento.trim().length === 0 ||
      frmEditData.dataEvento.trim().length === 0 ||
      frmEditData.idInstituicao.trim().length === 0
    ) {
      setNotifyUser({
        titleNote: "Atenção",
        textNote: "Preencha os campos corretamente",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });

      setShowSpinner(false);
      return;
    }
    try {
      const promise = await api.put(
        `${eventsResource}/${frmEditData.idEvento}`,
        {
          nomeEvento: frmEditData.nomeEvento,
          dataEvento: frmEditData.dataEvento,
          descricao: frmEditData.descricao,
          idInstituicao: frmEditData.idInstituicao,
          idTipoEvento: frmEditData.idTipoEvento,
        }
      );

      if (promise.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Atualizado com sucesso! (${frmEditData.nomeEvento})`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });

        const buscaEventos = await api.get(eventsResource);
        setEventos(buscaEventos.data); //aqui retorna um array, então de boa!
      } else {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Problemas ao atualizar, contate o admnistrador do sistema)`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Problemas ao atualizar os dados na tela ou no banco`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
    }
    editActionAbort();
    setShowSpinner(false);
    setFrmEdit(false);
    return; // aqui como um preventDefault()
  };

  // DELETE
  const handleDelete = async (idElemento) => {
    if (!window.confirm("Confirma Exclusão?")) {
      return; //retorna a função sem executar o restante do código
    }

    setShowSpinner(true);
    try {
      const promise = await api.delete(`${eventsResource}/${idElemento}`);

      if (promise.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso!",
          textNote: "Evento excluído com sucesso!",
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });

        const buscaEventos = await api.get(eventsResource);
        setEventos(buscaEventos.data); //aqui retorna um array, então de boa!
      } else {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao excluir evento.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao excluir evento.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
    }
    setShowSpinner(false);
  };

  //SUBMIT FORM - Cadastrar evento
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    // Validação dos campos
    if (
      evento.nomeEvento.trim().length === 0 ||
      evento.descricao.trim().length === 0 ||
      evento.idTipoEvento.trim().length === 0 ||
      evento.descricao.trim().length === 0 ||
      evento.idInstituicao.trim().length === 0
    ) {
      // console.log(evento);
      setNotifyUser({
        titleNote: "Atenção",
        textNote: "Preencha os campos corretamente",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de atenção. Mulher ao lado do símbolo de exclamação",
        showMessage: true,
      });
      setShowSpinner(false);
      return;
    }

    try {
      await api.post(eventsResource, {
        nomeEvento: evento.nomeEvento,
        dataEvento: evento.dataEvento,
        descricao: evento.descricao,
        idInstituicao: evento.idInstituicao,
        idTipoEvento: evento.idTipoEvento,
      });

      const newListEvents = await api.get(eventsResource);
      setEventos(newListEvents.data);
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Evento ( ${evento.nomeEvento} ) cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
      editActionAbort();
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao cadastrar.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }

    setShowSpinner(false);
  };

  /**
   * Esta função faz um DE/PARA no array de tipos de eventos vindo do banco de dados.
   * idInstituicao vira value
   * titulo vira o texto
   *
   * @param {[{}]} arrEvents
   * @returns array
   */
  const fromToEventType = (arrEvents) => {
    if (arrEvents.length === 0) return [];

    const arrAux = [];

    arrEvents.forEach((event) => {
      arrAux.push({ value: event.idTipoEvento, text: event.titulo });
    });

    return arrAux;
  };

  // THE COMPONENT
  return (
    <>
      <MainContent>
        <section className="cadastro-evento-section">
          <Container>
            <Title titleText={"Eventos"} />
            <div className="cadastro-evento__box">
              <ImageIllustrator
                imageName="evento"
                imageRender={eventoImage}
                altText="Imagem de Ilustrativa para o cadastro de tipos de eventos - duas pessoas construindo uma parte de um todo!"
              />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou atualizar */}
                {!frmEdit ? (
                  <>
                    {/* cadastrar */}
                    {/* 
                      sugestão: trocar por um único formulário 
                      utilizando apenas frmEditData e formatação condicional para os botões
                      ainda utilizando frmEdit
                    */}
                    <Input
                      type="text"
                      required={true}
                      id="nome"
                      name="nome"
                      placeholder="Nome"
                      value={evento.nomeEvento}
                      manipulationFunction={(e) =>
                        setEvento({ ...evento, nomeEvento: e.target.value })
                      }
                    />

                    <Input
                      type="text"
                      required={true}
                      id="descricao"
                      name="descricao"
                      placeholder="Descrição"
                      value={evento.descricao}
                      manipulationFunction={(e) =>
                        setEvento({
                          ...evento,
                          descricao: e.target.value,
                        })
                      }
                    />

                    <Select
                      id="tipo-evento"
                      name="tipo-evento"
                      required={true}
                      options={tiposEvento} // aqui o array dos tipos
                      manipulationFunction={(e) =>
                        setEvento({ ...evento, idTipoEvento: e.target.value })
                      } // aqui só a variável state
                      defaultValue={evento.idTipoEvento}
                      defaultOption="Tipo do evento"
                    />

                    <Select
                      id="instituicao"
                      name="instituicao"
                      required={true}
                      options={instituicoes} // aqui o array contendo as instituições
                      manipulationFunction={(e) =>
                        setEvento({ ...evento, idInstituicao: e.target.value })
                      } // aqui só a variável state
                      defaultValue={evento.idInstituicao}
                      defaultOption="Instituição"
                    />

                    <Input
                      type="date"
                      required={true}
                      id="dataEvento"
                      name="dataEvento"
                      placeholder="Data do Evento"
                      value={evento.dataEvento}
                      manipulationFunction={(e) =>
                        setEvento({ ...evento, dataEvento: e.target.value })
                      }
                    />

                    <Button
                      name="cadastrar"
                      id="cadastrar"
                      textButton="Cadastrar"
                      additionalClass="btn-cadastrar"
                    />
                  </>
                ) : (
                  <>
                    {/* editar */}
                    <Input
                      type="text"
                      required={true}
                      id="nome"
                      name="nome"
                      placeholder="Nome Evento"
                      value={frmEditData.nomeEvento}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          nomeEvento: e.target.value,
                        });
                      }}
                    />
                    <Input
                      type="text"
                      required={true}
                      id="descricao"
                      name="descricao"
                      placeholder="Descrição"
                      value={frmEditData.descricao}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          descricao: e.target.value,
                        });
                      }}
                    />

                    <Select
                      id="tipo-evento"
                      name="tipo-evento"
                      required={true}
                      options={tiposEvento}
                      defaultValue={frmEditData.idTipoEvento}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          idTipoEvento: e.target.value,
                        });
                      }}
                    />
                    <Select
                      id="instituicao"
                      name="instituicao"
                      required={true}
                      options={instituicoes}
                      defaultValue={frmEditData.idInstituicao}
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          idInstituicao: e.target.value,
                        });
                      }}
                    />

                    <Input
                      type="date"
                      required={true}
                      id="dataEvento"
                      name="dataEvento"
                      placeholder="Data do Evento"
                      value={truncateDateFromDb(frmEditData.dataEvento)}
                      // value="2023-01-05"
                      manipulationFunction={(e) => {
                        setFrmEditData({
                          ...frmEditData,
                          dataEvento: e.target.value,
                        });
                      }}
                    />

                    {/* botões de ação */}
                    <div className="buttons-editbox">
                      <Button
                        name="atualizar"
                        id="atualizar"
                        textButton="Atualizar"
                        additionalClass="button-component--middle"
                      />
                      <Button
                        name="cancelar"
                        id="cancelar"
                        textButton="Cancelar"
                        type="reset"
                        manipulationFunction={() => {
                          editActionAbort();
                        }}
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
            <Title titleText={"Lista de Eventos"} color="white" />
            <TableEv
              dados={eventos}
              fnDelete={handleDelete}
              fnUpdate={showUpdateForm}
            />

            {/* <Table
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
              // fnShowDetails={}
              dados={[
                tableHead,
                [
                  ...eventos.map((evento) => [
                    evento.id,
                    evento.nomeEvento,
                    evento.descricao,
                    evento.tiposEvento.titulo,
                    evento.dataEvento,
                    evento.instituicao.nomeFantasia
                  ]),
                ],
              ]}
            />  */}
          </Container>
        </section>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {/* CARD NOTIFICATION */}
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
    </>
  );
};

export default EventosPaage;
