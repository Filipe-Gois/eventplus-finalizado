import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css/effect-coverflow";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./Slider.css";
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
      ]}
      {...settings}
    >
      {children}
    </Swiper>
  );
};

export default Slider;
