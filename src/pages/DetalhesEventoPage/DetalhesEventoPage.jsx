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
  const [trueComentaries, setTrueComentaries] = useState([]);
  const [allComentaries, setAllComentaries] = useState([]);

  // const loadTrueComentaries = async () => {
  //   const responseTrueCommentarys = await api.get(trueCommentaryEventResource);
  //   setTrueComentaries(responseTrueCommentarys);
  // };

  const loadAllComentaries = async () => {
    const responseAllCommentarys = await api.get(commentaryEventResource);

    setAllComentaries(responseAllCommentarys);
  };

  useEffect(() => {
    // userData.userId === "Administrador"
    //   ? loadAllComentaries()
    //   : loadTrueComentaries();

    loadAllComentaries();
    //loadTrueComentaries();

    console.log(trueComentaries);
    console.log(allComentaries);
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
            {/* {allComentaries.map((evento) => {
              return <NextEvent />;
            })} */}
            <NextEvent
              title={"oioi"}
              description={"sdjkhfgkjsdbgfsdkhjbgkhjsdkhjgb"}
            />
          </>
        ) : (
          <>
            {/* {trueComentaries.map((evento) => {
              return (<NextEvent 
              
              title={evento.evento.nomeEvento}
              description={evento.descricao}
              eventDate={evento.evento.dataEvento}
              
              />)
            })} */}
            {setTrueComentaries(() => {
              allComentaries.filter((valor) => valor.exibe === true
              );
            })}
            {/* perguntar pq isso dá errado */}

            {console.log(trueComentaries)}


            <NextEvent
              title={"oioi"}
              description={"sdjkhfgkjsdbgfsdkhjbgkhjsdkhjgb"}
              eventDate={""}
            />
          </>
        )}
      </Container>
    </MainContent>
  );
};

export default DetalhesEventoPage;
