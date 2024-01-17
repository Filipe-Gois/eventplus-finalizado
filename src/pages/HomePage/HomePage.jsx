import React, { useContext, useEffect, useState } from "react";
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
import { UserContext } from "../../context/AuthContext";

const HomePage = () => {
  const { userData, setUserData } = useContext(UserContext);

  const settingsSlides = {
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
  const [notifyUser, setNotifyUser] = useState({}); //Componente Notification

   const getNextEvents = async () => {
    try {
      const promise = await api.get(nextEventResource);
      const dados = await promise.data;
      setNextEvents(dados); //atualiza o state
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Não foi possível carregar os próximos eventos. Verifique a sua conexão com a internet.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  }

  const getOldEvents = async () => {
    try {
      const response = await api.get(oldEventResource);

      setOldEvents(response.data);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `Não foi possível carregar os eventos anteriores. Verifique a sua conexão com a internet.`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de erro. Rapaz segurando um balão com símbolo x.",
        showMessage: true,
      });
    }
  };

  // roda somente na inicialização do componente
  useEffect(() => {
    // if (userData.nome) {
    //   setNotifyUser({
    //     titleNote: `Bem-vindo, ${userData.nome}.`,
    //     textNote: ``,
    //     imgIcon: "success",
    //     imgAlt:
    //       "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
    //     showMessage: true,
    //   });
    // }

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

          <Slider settings={settingsSlides}>
            {nextEvents.map((e) => {
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

      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Eventos Antigos"} />

          <Slider settings={settingsSlides}>
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
