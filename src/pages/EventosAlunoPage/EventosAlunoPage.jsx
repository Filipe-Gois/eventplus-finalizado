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
  commentaryEventResourceAI,
} from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import Notification from "../../components/Notification/Notification";

const EventosAlunoPage = () => {
  const [notifyUser, setNotifyUser] = useState({});
  const [comentado, setComentado] = useState(false);

  const [eventos, setEventos] = useState([]);
  const [meusEventos, setMeusEventos] = useState([]);
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

  const [comentario2, setComentario2] = useState({
    idComentario: null,
    descricao: "",
    exibe: true,
    idUsuario: "",
    idEvento: "",
  });

  const [comentario, setComentario] = useState("");
  const [idEvento, setIdEvento] = useState("");
  const [idComentario, setIdComentario] = useState(null);

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

  const loadEventsType = async () => {
    setShowSpinner(true);

    if (tipoEvento === "1") {
      //Exibe todos os eventos cadastrados (Evento)
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
        console.log(error);
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao carregar os tipos de vento.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
    } else if (tipoEvento === "2") {
      loadMypresences();
    }
    //   /**
    //    * Lista os eventos em que o usuário está cadastrado (PresencasEventos)
    //    * retorna um formato diferente de array
    //    */
    //   try {
    //     const retornoEventos = await api.get(
    //       `${myEventsResource}/${userData.userId}`
    //     );

    //     const arrEventos = []; //array vazio

    //     retornoEventos.data.forEach((e) => {
    //       arrEventos.push({
    //         ...e.evento,
    //         situacao: e.situacao,
    //         idPresencaEvento: e.idPresencaEvento,
    //       });
    //     });

    //     setEventos(arrEventos);
    //   } catch (error) {
    //     setNotifyUser({
    //       titleNote: "Erro",
    //       textNote: `Erro ao carregar meus eventos.`,
    //       imgIcon: "danger",
    //       imgAlt:
    //         "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
    //       showMessage: true,
    //     });
    //     console.log(error);

    //   }
    // } else {
    //   setEventos([]);
    // }
    setShowSpinner(false);
  };

  // toggle meus eventos ou todos os eventos
  const myEvents = (tpEvent) => {
    setTipoEvento(tpEvent);
  };

  const showHideModal = (idEvent) => {
    // console.log(eventos);
    setShowModal(showModal ? false : true);
    setComentario(!showModal && "");
    // setUserData({ ...userData, idEvento: idEvent });
    setIdEvento(idEvent);
  };

  // ler um comentário - get
  const loadMyCommentary = async (idUsuario, idEvento) => {
    try {
      // api está retornando sempre todos os comentários do usuário
      const promise = await api.get(
        `${commentaryEventResource}/BuscarPorIdUsuario/${idEvento}?idUsuario=${idUsuario}&idEvento=${idEvento}`
      );

      // const myComm = await promise.data.filter(
      //   (comm) => comm.idEvento === idEvento && comm.idUsuario === idUsuario
      // );

      // setComentario(
      //   myComm.length > 0
      //     ? myComm[0].descricao
      //     : "Comente algo sobre este evento!"
      // );

      // setIdComentario(
      //   myComm[0].length > 0 ? myComm[0].idComentarioEvento : null
      // );

      setComentario(
        promise.data.descricao
          ? promise.data.descricao
          : "Comente algo sobre este evento!"
      );

      setIdComentario(
        promise.data.idComentarioEvento ? promise.data.idComentarioEvento : null
      );

      setComentario2(promise.data ? promise.data : {});

      console.log("comentario carregado");
      console.log(comentario2);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Erro ao carregar.`,
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
      const promise = await api.post(commentaryEventResourceAI, {
        descricao: descricao,
        idUsuario: idUsuario,
        idEvento: idEvento,
      });

      const response = await api.get(
        `${commentaryEventResource}/BuscarPorIdUsuario/${idEvento}?idUsuario=${idUsuario}&idEvento=${idEvento}`
      );

      console.log("comentario postado");
      setComentario2(response.data);

      console.log(response.data);

      if (promise.status === 201 && !response.data.exibe) {
        setNotifyUser({
          titleNote: "Alerta",
          textNote: `Ops, seu comentário possui um conteúdo ofensivo.`,
          imgIcon: "warning",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
      } else if (promise.status === 201) {
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
        `${commentaryEventResource}?id=${idComentario}`
      );
      if (promise.status === 204) {
        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Comentário excluído com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
        console.log("comentario deletado");

        setComentario2({});
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

  const handleConnect = async (eventId, whatTheFunction, presencaId = null) => {
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
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao se inscrever.`,
          imgIcon: "danger",
          imgAlt:
            "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
          showMessage: true,
        });
      }
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
  };

  const loadMypresences = async () => {
    try {
      const response = await api.get(
        presencesEventResource + "/" + userData.userId
      );

      const arrEventos = []; //array vazio

      response.data.forEach((e) => {
        arrEventos.push({
          ...e.evento,
          situacao: e.situacao,
          idPresencaEvento: e.idPresencaEvento,
        });
      });

      setMeusEventos(arrEventos);
      // console.log(response.data);
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
  };

  useEffect(() => {
    loadEventsType();
    loadMypresences();
  }, [tipoEvento, userData.userId]); //

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
              dados={
                tipoEvento === "1"
                  ? eventos
                  : tipoEvento === "2"
                  ? meusEventos
                  : []
              }
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
          exibe={comentario2.exibe}
          // comentado={comentado}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
