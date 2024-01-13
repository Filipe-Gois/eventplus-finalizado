import React, { useContext, useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myEventsResource,
  presencesEventResource,
  commentaryEventResource,
} from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import Notification from "../../components/Notification/Notification";

const EventosAlunoPage = () => {
  const [notifyUser, setNotifyUser] = useState({});

  // state do menu mobile

  const [eventos, setEventos] = useState([]);
  // select mocado
  // const [quaisEventos, setQuaisEventos] = useState([
  const quaisEventos = [
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ];

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData } = useContext(UserContext);
  const [comentario, setComentario] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [idComentario, setIdComentario] = useState(null);

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]); //

  async function loadEventsType() {
    setShowSpinner(true);
    // setEventos([]); //zera o array de eventos
    if (tipoEvento === "1") {
      //todos os eventos (Evento)
      try {
        const todosEventos = await api.get(eventsResource);
        const meusEventos = await api.get(
          `${myEventsResource}/${userData.userId}`
        );

        const eventosMarcados = verificaPresenca(
          todosEventos.data,
          meusEventos.data
        );

        setEventos(eventosMarcados);
      } catch (error) {
        // setNotifyUser({
        //   titleNote: "Erro",
        //   textNote: `Erro ao carregar os tipos de vento.`,
        //   imgIcon: "danger",
        //   imgAlt:
        //     "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        //   showMessage: true,
        // });
      }
    } else if (tipoEvento === "2") {
      /**
       * Lista os meus eventos (PresencasEventos)
       * retorna um formato diferente de array
       */
      try {
        const retornoEventos = await api.get(
          `${myEventsResource}/${userData.userId}`
        );

        const arrEventos = []; //array vazio

        retornoEventos.data.forEach((e) => {
          arrEventos.push({
            ...e.evento,
            situacao: e.situacao,
            idPresencaEvento: e.idPresencaEvento,
          });
        });

        setEventos(arrEventos);
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao carregar meus eventos.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
    } else {
      setEventos([]);
    }
    setShowSpinner(false);
  }
  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      //para cada evento principal
      for (let i = 0; i < eventsUser.length; i++) {
        //procurar a correspondência em minhas presenças
        if (arrAllEvents[x].idEvento === eventsUser[i].evento.idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break; //paro de procurar para o evento principal atual
        }
      }
    }

    //retorna todos os eventos marcados com a presença do usuário
    return arrAllEvents;
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    // setUserData({ ...userData, idEvento: idEvent });
    setIdEvento(idEvent);
  };

  // ler um comentário - get
  const loadMyCommentary = async (idUsuario, idEvento) => {
    try {
      // api está retornando sempre todos os comentários do usuário
      const promise = await api.get(
        `${commentaryEventResource}?idUsuario=${idUsuario}&idEvento=${idEvento}`
      );

      const myComm = await promise.data.filter(
        (comm) => comm.idEvento === idEvento && comm.idUsuario === idUsuario
      );

      setComentario(myComm.length > 0 ? myComm[0].descricao : "");
      setIdComentario(myComm.length > 0 ? myComm[0].idComentarioEvento : null);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao carregar o evento.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  // cadastrar um comentário = post
  const postMyCommentary = async (descricao, idUsuario, idEvento) => {
    try {
      const promise = await api.post(commentaryEventResource, {
        descricao: descricao,
        exibe: true,
        idUsuario: idUsuario,
        idEvento: idEvento,
      });

      if (promise.status === 200) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Comentário cadastrado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao cadastrar o comentário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  // remove o comentário - delete
  const commentaryRemove = async (idComentario) => {
    try {
      const promise = await api.delete(
        `${commentaryEventResource}/${idComentario}`
      );
      if (promise.status === 200) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Evento excluído com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao excluir o comentário.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {
      try {
        //connect
        const promise = await api.post(presencesEventResource, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId,
        });

        if (promise.status === 201) {
          loadEventsType();
          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Presença confirmada, parabéns!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });
        }
      } catch (error) {}
      return;
    }

    // unconnect - aqui seria o else
    try {
      const unconnected = await api.delete(
        `${presencesEventResource}?id=${presencaId}`
      );
      if (unconnected.status === 204) {
        loadEventsType();
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Desconectado do evento com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      }
    } catch (error) {

      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao desconecar o usuário do evento.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  }

  return (
    <>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}

      <MainContent>
        <Container>
          <section className="eventos-aluno-section">
            <Title titleText={"Eventos"} additionalClass="custom-title" />

            <Select
              id="id-tipo-evento"
              name="tipo-evento"
              required={true}
              options={quaisEventos} // aqui o array dos tipos
              manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
              defaultValue={tipoEvento}
              additionalClass="select-tp-evento"
            />
            <Table
              dados={eventos}
              fnConnect={handleConnect}
              fnShowModal={showHideModal}
            />
          </section>
        </Container>
      </MainContent>
      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          // userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyCommentary}
          fnPost={postMyCommentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
          userId={userData.userId}
          idEvento={idEvento}
          idComentario={idComentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
