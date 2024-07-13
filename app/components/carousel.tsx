import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Slide {
  src: string;
  alt: string;
}

interface CarouselProps {
  slides: Slide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [slides.length]);

  return (
    <div className='overflow-hidden relative rounded-lg  '>
      <div className='flex transition-transform duration-500' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.src}
            alt={slide.alt}
            width={550}
            height={500}
            className=" object-cover  shadow-lg"
            crossOrigin=''
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
