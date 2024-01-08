import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api, { oldEventResource } from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource } from "../../Services/Service";

// Import Swiper
import { Slider, Slide } from "../../components/Slider";

const HomePage = () => {
  const settings = {
    spaceBetween: 30,
    slidesPerView:
      window.innerWidth < 768 ? 1 : window.innerWidth < 1100 ? 2 : 3,
    navigation: true,
    pagination: {
      clickable: true,
    },
  };

  const [nextEvents, setNextEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification

  async function getNextEvents() {
    try {
      const promise = await api.get(nextEventResource);
      const dados = await promise.data;
      // console.log(dados);
      setNextEvents(dados); //atualiza o state
    } catch (error) {
      console.log("não trouxe os próximos eventos, verifique lá!");
      // setNotifyUser({
      //   titleNote: "Erro",
      //   textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet`,
      //   imgIcon: "danger",
      //   imgAlt:
      //   "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
      //   showMessage: true,
      // });
    }
  }

  const getOldEvents = async () => {
    try {
      const response = api.get(oldEventResource);

      setOldEvents((await response).data);
    } catch (error) {}
  };

  // roda somente na inicialização do componente
  useEffect(() => {
    getNextEvents(); //chama a função
    getOldEvents();
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <Slider settings={settings}>
            {nextEvents.map((e) => {
              return (
                <Slide key={e.idEvento}>
                  <NextEvent
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvento={e.idEvento}
                    textButton={"Conectar"}
                  />
                </Slide>
              );
            })}
          </Slider>
        </Container>
      </section>

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Eventos Antigos"} />

          <Slider settings={settings}>
            {oldEvents.map((e) => {
              return (
                <Slide key={e.idEvento}>
                  <NextEvent
                    key={e.idEvento}
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                    idEvento={e.idEvento}
                    textButton={"Ver Detalhes"}
                  />
                </Slide>
              );
            })}
          </Slider>


        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
