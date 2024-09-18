"use client";
import { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper"; // นำเข้า SwiperType

const SliderComponent = () => {
  const swiperRef = useRef<SwiperType | null>(null); // ใช้ SwiperType แทน SwiperRef

  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update(); // เรียกใช้ update() จาก Swiper instance
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-[1030px] h-auto relative ">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper; // เก็บอินสแตนซ์ของ Swiper ลงใน ref
        }}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          340: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        modules={[Navigation, Autoplay]}
      >
        <SwiperSlide>
          <img
            src="/pic1.jpg"
            alt="Slide 1"
            className="rounded-lg object-cover w-[250px] h-[160px] border border-white "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pic2.jpg"
            alt="Slide 1"
            className="rounded-lg object-cover w-[250px] h-[160px] border border-white "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pic5.jpg"
            alt="Slide 1"
            className="rounded-lg object-cover w-[250px] h-[160px] border border-white "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pic6.jpg"
            alt="Slide 1"
            className="rounded-lg object-cover w-[250px] h-[160px] border border-white "
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="/pic7.jpg"
            alt="Slide 1"
            className="rounded-lg object-cover w-[250px] h-[160px] border border-white "
          />
        </SwiperSlide>

        {/* เพิ่ม Slide อื่น ๆ */}
      </Swiper>

      {/* ปุ่ม Navigation */}
      <div className="swiper-button-prev-custom absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-left.svg" alt="Previous" className="h-6 w-6" />
      </div>
      <div className="swiper-button-next-custom absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-right.svg" alt="Next" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default SliderComponent;
