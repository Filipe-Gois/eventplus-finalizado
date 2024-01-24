import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectCoverflow,
  EffectCards
} from "swiper/modules";

import 'swiper/css';
import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Slider.css";
import 'swiper/css/effect-cards';
// import "./styles.css";

const Slider = ({ children, settings, addtionalClass = "" }) => {
  return (
    <Swiper
      className={`${addtionalClass}`}
      modules={[
        Navigation,
        Pagination,
        A11y,
        Scrollbar,
        Autoplay,
        EffectCoverflow,
        [EffectCards]
      ]}
      {...settings}
    >
      {children}
    </Swiper>
  );
};

export default Slider;
