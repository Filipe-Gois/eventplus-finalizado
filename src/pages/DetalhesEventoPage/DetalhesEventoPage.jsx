import React, { useContext, useEffect, useState } from "react";
import "./DetalhesEventoPage.css";
import api, {
  commentaryEventResource,
  trueCommentaryEventResource,
  eventsResource,
} from "../../Services/Service";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import { UserContext } from "../../context/AuthContext";
import NextEvent from "../../components/NextEvent/NextEvent";
import { EventoContext } from "../../context/EventoContext";
import TableDE from "./TableDE/TableDE";
import { Link, useParams } from "react-router-dom";

const DetalhesEventoPage = () => {
  const { idEvento } = useParams();

  const { userData } = useContext(UserContext);
  const [eventoBuscado, setEventoBuscado] = useState({});


  const [trueComentaries, setTrueComentaries] = useState([]);
  const [allComentaries, setAllComentaries] = useState([]);

  // fazer uma lógica para só chamar a api de allComentaries e dar um .filter na hora de exibir os q estejam com "true"

  const getEvento = async () => {
    const response = await api.get(eventsResource + "/" + idEvento);
    const dados = response.data;
    setEventoBuscado(dados);
  };

  const loadAllComentaries = async () => {
    const responseAllCommentarys = await api.get(commentaryEventResource + `?id=` + idEvento);

    const dados = responseAllCommentarys.data;

    setAllComentaries(dados);
  };

  const loadTrueComentaries = async () => {
    const responseTrueCommentarys = await api.get(trueCommentaryEventResource + "?id=" + idEvento);

    const dados = responseTrueCommentarys.data;

    setTrueComentaries(dados);
  };

  useEffect(() => {


    loadAllComentaries();
    getEvento()
    loadTrueComentaries();
  }, []);


  return (
    <MainContent>
      <section className="detalhes-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title
              titleText={"Detalhes do Eventos"}
              additionalClass="custom-title"
            />

            <NextEvent
              title={eventoBuscado.nomeEvento}
              description={eventoBuscado.descricao}
              eventDate={eventoBuscado.dataEvento}
              idEvento={eventoBuscado.idEvento}

            />
          </div>
        </Container>
      </section>

      {eventoBuscado.dataEvento ?

        (

          <section className="lista-eventos-section">
            <Container>
              <Title titleText={"Comentários"} color="white" />
              <TableDE dados={userData.nome && userData.role === "Administrador" ? allComentaries : trueComentaries} />
            </Container>
          </section>
        )
        : null}




    </MainContent>
  );
};

export default DetalhesEventoPage;
