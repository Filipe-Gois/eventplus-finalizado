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

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";


const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [oldEvents, setOldEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification






  // roda somente na inicialização do componente
  useEffect(() => {
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

        const response = api.get(oldEventResource)

        const dados = await (await response).data

        setOldEvents(dados)
      } catch (error) {

      }
    }

    getNextEvents(); //chama a função
    getOldEvents()
  }, []);

  return (

    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            <Swiper
              slidesPerView={window.innerWidth >= 992 ? 3 : 1}
              spaceBetween={30}
              // style={}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >



              {nextEvents.map((e) => {
                return (
                  <SwiperSlide key={e.idEvento}>
                    <NextEvent
                      key={e.idEvento}
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvent={e.idEvento}
                      textButton={"Conectar"}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>


      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Eventos Antigos"} />

          <div className="events-box">
            <Swiper
              slidesPerView={window.innerWidth >= 992 ? 3 : 1}
              spaceBetween={30}
              // style={}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >



              {oldEvents.map((e) => {
                return (
                  <SwiperSlide key={e.idEvento}>
                    <NextEvent
                      key={e.idEvento}
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                      idEvent={e.idEvento}
                      textButton={"Ver Detalhes"}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>



      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
