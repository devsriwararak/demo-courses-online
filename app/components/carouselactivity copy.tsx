"use client";
import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";

const SliderActivity = ({ data }: { data: string[] }) => {
  const swiperRef = useRef(null);

  return (
    <div className="w-full xl:w-[1030px] h-auto relative">
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={Math.min(data.length, 4)}
        slidesPerGroup={Math.min(data.length, 4)}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        loop={data.length >= 4}
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
        {data.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-48">
              <Image
                style={{ objectFit: "cover" }}
                src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${image}`}
                alt={`Slide ${index + 1}`}
                layout="fill"
                className="w-full h-full rounded-md  shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-left.svg" alt="Previous" className="h-6 w-6" />
      </div>
      <div className="swiper-button-next-custom absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white text-black rounded-full p-2 shadow-lg z-10 hover:bg-gray-200 transition">
        <img src="/icon-arrow-right.svg" alt="Next" className="h-6 w-6" />
      </div>
    </div>
  );
};

export default SliderActivity;
