"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCallback, useRef, useEffect, useState } from "react";
import SingleItem from "./SingleItem";
import "swiper/css/navigation";
import "swiper/css";

const Categories = () => {
  const sliderRef = useRef<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const username = "admin";
        const appPassword = "SA0Y2M849pllyAxOYRuuyQyU";

        const auth = "Basic " + btoa(`${username}:${appPassword}`);

        const res = await fetch(
          "http://localhost/next-woo-backend/wp-json/wc/v3/products/categories",
          {
            headers: {
              Authorization: auth,
            },
          }
        );

        const text = await res.text(); // first get raw text

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          console.error("❌ JSON parse failed:", e);
        }

        setCategories(data || []);
      } catch (error) {
        console.error("❌ Fetch failed:", error);
      }
    };

    fetchCategories();
  }, []);

  const handlePrev = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slidePrev();
    }
  }, []);

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideNext();
    }
  }, []);

  return (
    <section className="overflow-hidden pt-17.5">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <div className="swiper categories-carousel common-carousel">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Browse by Category
            </h2>
            <div className="flex items-center gap-3">
              <button onClick={handlePrev}>Prev</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>

          <Swiper
            ref={sliderRef}
            slidesPerView={6}
            breakpoints={{
              0: { slidesPerView: 2 },
              1000: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            }}
          >
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <SwiperSlide key={cat.id}>
                  <SingleItem item={cat} />
                </SwiperSlide>
              ))
            ) : (
              <p className="text-red-500">⚠️ No categories found</p>
            )}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Categories;
