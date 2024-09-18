import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; // นำเข้า CSS สำหรับ Navigation
import 'swiper/css/autoplay'; // นำเข้า CSS ของ autoplay
import { Navigation, Autoplay } from 'swiper/modules'; // นำเข้าโมดูล Navigation และ Autoplay
import Image from 'next/image';

const SliderComponent = () => {
  return (
    <div className="w-full h-auto"> 
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        navigation={true} // เปิดใช้งาน Navigation
        loop={true}
        autoplay={{
          delay: 3000, // เลื่อนอัตโนมัติทุก 3 วินาที
          disableOnInteraction: false, // เลื่อนต่อหลังจากการโต้ตอบ
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Navigation, Autoplay]} // เพิ่มโมดูล Navigation และ Autoplay
        // className="custom-swiper"
      >
        <SwiperSlide>
          <Image src="/pic1.jpg" alt="Slide 1" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pic2.jpg" alt="Slide 2" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pic5.jpg" alt="Slide 3" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pic6.jpg" alt="Slide 3" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pic7.jpg" alt="Slide 3" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/pic8.jpg" alt="Slide 3" width={500} height={500} className="rounded-lg object-cover" />
        </SwiperSlide>
      </Swiper>

    </div>
  );
};

export default SliderComponent;
