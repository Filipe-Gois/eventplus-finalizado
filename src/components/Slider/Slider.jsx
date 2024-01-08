import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Slider.css'

const Slider = ({ children, settings }) => {
  return (
    <Swiper modules={[Navigation, Pagination, A11y]} {...settings}>
      {children}
    </Swiper>
  );
};

export default Slider;
