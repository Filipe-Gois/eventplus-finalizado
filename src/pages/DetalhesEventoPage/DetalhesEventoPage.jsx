import React, { useContext, useEffect, useState } from "react";
import "./DetalhesEventoPage.css";
import api, {
  commentaryEventResource,
  trueCommentaryEventResource,
} from "../../Services/Service";
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import { UserContext } from "../../context/AuthContext";
import NextEvent from "../../components/NextEvent/NextEvent";

const DetalhesEventoPage = () => {
  const { userData } = useContext(UserContext);
  const [trueEvents, setTrueEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const loadTrueCommentaries = async () => {
    const responseTrueCommentarys = await api.get(trueCommentaryEventResource);
    setTrueEvents(responseTrueCommentarys);
  };

  const loadAllComentaries = async () => {
    const responseAllCommentarys = await api.get(commentaryEventResource);

    setAllEvents(responseAllCommentarys);
  };

  useEffect(() => {
    loadAllComentaries();
    loadTrueCommentaries();
    console.log(trueEvents);
    console.log(allEvents);
  }, []);

  return (
    <MainContent>
      <Container>
        <Title
          titleText={"Comentários de Eventos"}
          additionalClass="custom-title"
        />
        {userData.userId === "Administrador" ? (
          <>
            {allEvents.map((evento) => {
              return (<NextEvent />)
            })}
          </>
        ) : (
          <>
            {/* {trueEvents.map((evento) => {
              return (<NextEvent 
              
              title={evento.evento.nomeEvento}
              description={evento.descricao}
              eventDate={evento.evento.dataEvento}
              
              />)
            })} */}
          </>
        )}
      </Container>
    </MainContent>
  );
};

export default DetalhesEventoPage;
