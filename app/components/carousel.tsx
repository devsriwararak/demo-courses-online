'use client'
import { useRef, useEffect, useCallback, useState } from "react"; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: string; 
  image: string;
  title:string
}

const SliderComponent = () => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [slides, setSlides] = useState<Slide[]>([])


  const fetchCourses = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/api/homepage/courses`
      );
      // console.log(res.data);
      if (res.status === 200) {
        setSlides(res.data || []); // ใช้ setSlides เพื่ออัพเดต state
      } else {
        console.error("Error fetching products");
      }
    } catch (err) {
      const error = err as { response: { data: { message: string } } };
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, []);

  // Update swiper on resize
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current) {
        swiperRef.current.update();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(slides.length);

  return (
    <div className="w-full xl:w-[1030px] h-auto relative">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
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
        {slides.length > 0 ? (
          slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Link href={`/home/course/${slide.id}`}>
              <div className="relative w-full h-48">
                  <Image
                    layout="responsive"
                    objectFit="cover" 
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API}/images/${slide.image}`}
                    alt={slide.title || `Slide ${index + 1}`}
                    width={500}
                    height={500}
                    loading="lazy"
                    className=" w-full h-full rounded-md"
                  />
                </div>
              </Link>
            
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-white">Loading slides...</p>
        )}
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

export default SliderComponent;
