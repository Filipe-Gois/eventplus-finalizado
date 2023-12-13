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
import { EventoContext } from "../../context/EventoContext";
import TableDE from "./TableDE/TableDE";
import { Link, useParams } from "react-router-dom";

const DetalhesEventoPage = () => {

  const { idEvento } = useParams()

  const { userData } = useContext(UserContext);
  const [trueComentaries, setTrueComentaries] = useState([]);
  const [allComentaries, setAllComentaries] = useState([{
    id: "1", descricao
      :
      "Evento incrível!!"
  }, {
    id: "2", descricao
      :
      "Evento LEGAL!!"
  }]);



  // const loadTrueComentaries = async () => {
  //   const responseTrueCommentarys = await api.get(trueCommentaryEventResource);
  //   setTrueComentaries(responseTrueCommentarys);
  // };


  //fazer uma lógica para só chamar a api de allComentaries e dar um .filter na hora de exibir os q estejam com "true"

  // const loadAllComentaries = async () => {
  //   const responseAllCommentarys = await api.get(commentaryEventResource);

  //   setAllComentaries(responseAllCommentarys);
  // };

  // const loadTrueComentaries = async () => {
  //   const responseTrueCommentarys = await api.get(trueCommentaryEventResource);

  //   setTrueComentaries(responseTrueCommentarys);
  // };

  useEffect(() => {
    // userData.userId === "Administrador"
    //   ? loadAllComentaries()
    //   : loadTrueComentaries();

    // loadAllComentaries();
    // loadTrueComentaries()

    console.log(trueComentaries);
    console.log(allComentaries);
  }, []);

  // const sla = allComentaries.filter(valor => valor.exibe === true)



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
              title={"oioi"}
              description={"sdjkhfgkjsdbgfsdkhjbgkhjsdkhjgb"}
              eventDate={""}
            />
          </div>
        </Container>
      </section>

      

      <section className="lista-eventos-section">
        <Container>

          <Title titleText={"Comentários"} color="white" />
          <TableDE dados={allComentaries} />
        </Container>
      </section>





      {userData.userId === "Administrador" ? (
        <>
          {/* {allComentaries.map((evento) => {
              return <NextEvent />;
            })} */}

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

          {/* perguntar pq isso dá errado */}


        </>
      )}

    </MainContent>
  );
};

export default DetalhesEventoPage;
