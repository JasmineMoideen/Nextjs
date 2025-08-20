"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Slide {
  percentage_discount: string;
  caption: string;
  description: string;
  cta: string;
  image:string; 
}

const HeroCarousal = () => {
  const [slides, setSlides] = useState<Slide[]>([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("http://localhost/next-woo-backend/wp-json/wp/v2/pages/2");
        const data = await res.json();
        const acf = data.acf;

        // collect slides from ACF
        const slideData: Slide[] = [
          acf.banner_slider_1,
          acf.banner_slider_2,
        ];

        setSlides(slideData);
      } catch (err) {
        console.error("Error fetching hero slides:", err);
      }
    };

    fetchSlides();
  }, []);

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row">
            <div className="max-w-[394px] py-10 sm:py-15 lg:py-24.5 pl-4 sm:pl-7.5 lg:pl-12.5">
              <div className="flex items-center gap-4 mb-7.5 sm:mb-10">
                <span className="block font-semibold text-heading-3 sm:text-heading-1 text-blue">
                  {slide.percentage_discount}%
                </span>
                <span className="block text-dark text-sm sm:text-custom-1 sm:leading-[24px]">
                  Sale<br />Off
                </span>
              </div>

              <h1 className="font-semibold text-dark text-xl sm:text-3xl mb-3">
                {slide.caption}
              </h1>

              <p>{slide.description}</p>

              <a
                href="#"
                className="inline-flex font-medium text-white text-custom-sm rounded-md bg-dark py-3 px-9 ease-out duration-200 hover:bg-blue mt-10"
              >
                {slide.cta}
              </a>
            </div>
            <div>
                <img
                  src={slide.image}
                  alt={slide.caption}
                  width={351}
                  height={358}
                />
              </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
