import React, { useContext, useEffect, useState } from "react";
import "./DetalhesEventoPage.css";
import api, {
  commentaryEventResource,
  trueCommentaryEventResource,
  eventsResource,
} from "../../Services/Service";
import {
  dateFormatDbToView,
  dateFormateDbToView,
} from "../../Utils/stringFunctions";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import { UserContext } from "../../context/AuthContext";
import NextEvent from "../../components/NextEvent/NextEvent";
import { EventoContext } from "../../context/EventoContext";
import TableDE from "./TableDE/TableDE";

import { Slide, Slider } from "../../components/Slider";
import { useParams } from "react-router-dom";

const DetalhesEventoPage = () => {
  const { idEvento } = useParams();

  const { userData } = useContext(UserContext);
  const [eventoBuscado, setEventoBuscado] = useState({
    idEvento: "",
    dataEvento: "",
    nomeEvento: "",
    descricao: "",
    idTipoEvento: "",
    tiposEvento: {
      idTipoEvento: "",
      titulo: "",
    },
    idInstituicao: "",
    instituicao: {
      idInstituicao: "",
      cnpj: "",
      endereco: "",
      nomeFantasia: "",
    },
  });

  const [trueComentaries, setTrueComentaries] = useState([]);

  const [allComentaries, setAllComentaries] = useState([]);

  const tableHead = ["Nome", "Comentário", "Exibe"];

  const [settingsSlides, setSettingsSlides] = useState({
    scrollbar: { hide: true },
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,

    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },

    spaceBetween: 30,
    slidesPerView: "auto",
    // window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3,
    navigation: true,
  });

  // fazer uma lógica para só chamar a api de allComentaries e dar um .filter na hora de exibir os q estejam com "true"

  const getEvento = async () => {
    try {
      const response = await api.get(eventsResource + "/" + idEvento);

      setEventoBuscado(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadComentaries = async () => {
    try {
      const response = await api.get(
        commentaryEventResource + `?id=` + idEvento
      );

      setAllComentaries(response.data);

      setTrueComentaries(
        response.data.filter((comentario) => comentario.exibe === true)
      );

      console.log(allComentaries);
    } catch (error) {
      console.log(error);
    }
  };

  // const loadAllComentaries = async () => {
  //   const response = await api.get(commentaryEventResource + `?id=` + idEvento);

  //   // const comentariosModificados = [];

  //   // response.data.forEach((element) => {
  //   //   comentariosModificados.push({
  //   //     id: element.idComentarioEvento,
  //   //     descricao: element.descricao,
  //   //     exibe: element.exibe,
  //   //     idUsuario: element.idUsuario,
  //   //     usuario: element.usuario,
  //   //     idEvento: element.idEvento,
  //   //     evento: element.evento,
  //   //   });
  //   // });

  //   setAllComentaries(response.data);
  // };

  // const loadTrueComentaries = async () => {
  //   // const responseTrueCommentarys = await api.get(
  //   //   trueCommentaryEventResource + "?id=" + idEvento
  //   // );

  //   // const dados = responseTrueCommentarys.data;

  //   // setTrueComentaries(dados);

  //   const responseAllCommentarys = await api.get(
  //     commentaryEventResource + `?id=` + idEvento
  //   );

  //   const dados = responseAllCommentarys.data;

  //   setTrueComentaries(dados.filter((comentario) => comentario.exibe === true));
  // };

  useEffect(() => {
    loadComentaries();
    getEvento();
  }, []);

  return (
    <MainContent>
      <section className="detalhes-evento__section">
        <Container>
          <div className="detalhes-evento__box">
            <Title titleText={eventoBuscado.nomeEvento} additionalClass="" />

            <Slider settings={settingsSlides}>
              <Slide>
                <NextEvent
                  title={"Data Do Evento"}
                  description={dateFormatDbToView(eventoBuscado.dataEvento)}
                  date={false}
                  tooltip={false}
                />
              </Slide>

              <Slide>
                <NextEvent
                  title={"Tipo Do Evento"}
                  description={eventoBuscado.tiposEvento.titulo}
                  date={false}
                  tooltip={false}
                />
              </Slide>

              <Slide>
                <NextEvent
                  title={"Descrição"}
                  description={eventoBuscado.descricao}
                  date={false}
                  tooltip={false}
                />
              </Slide>

              <Slide>
                <NextEvent
                  title={"Instituição"}
                  description={eventoBuscado.instituicao.nomeFantasia}
                  date={false}
                  tooltip={false}
                />
              </Slide>
            </Slider>
            {/* 
            <NextEvent
              title={eventoBuscado.nomeEvento}
              description={eventoBuscado.descricao}
              eventDate={eventoBuscado.dataEvento}
              idEvento={eventoBuscado.idEvento}
            /> */}
          </div>
        </Container>
      </section>

      {eventoBuscado.dataEvento ? (
        <section className="detalhes-lista__section">
          <Container>
            <div className="detalhes-lista__box">
              <Title titleText={"Comentários"} color="white" />
              <TableDE
                dados={
                  userData.nome && userData.role === "Administrador"
                    ? allComentaries
                    : trueComentaries
                }
              />
            </div>
          </Container>
        </section>
      ) : null}
    </MainContent>
  );
};

export default DetalhesEventoPage;
