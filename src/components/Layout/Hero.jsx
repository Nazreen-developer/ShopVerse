import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { hero1, hero2 } from "../../assets";

const Hero = () => {
  return (
    <section className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        <SwiperSlide>
          <img
            src={hero1}
            alt="Hero 1"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-contain bg-white"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src={hero2}
            alt="Hero 2"
            className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-contain bg-white"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;