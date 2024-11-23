import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const images = [
  {
    image: '/src/assets/building_5.png',
    title: "Luxury Living Redefined",
    description: "Experience unparalleled elegance in the heart of the city",
    location: "Downtown Financial District"
  },
  {
    image: '/src/assets/building_4.png',
    title: "Sky-High Sophistication",
    description: "Where luxury meets breathtaking panoramic views",
    location: "Prime Urban Location"
  },
  {
    image: '/src/assets/building_2.png',
    title: "Elite Urban Residences",
    description: "Premium apartments designed for discerning professionals",
    location: "Business District"
  }
];

export function Carousel() {
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiper = swiperRef.current.swiper;
        if (e.deltaY > 0) {
          swiper.slideNext();
        } else {
          swiper.slidePrev();
        }
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <section className="h-screen relative overflow-hidden bg-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-8 left-8 z-20"
      >
        <h1 className="text-6xl font-bold text-white mb-2">
          Skyline Living
        </h1>
        <p className="text-xl text-white/80">Elevate Your Lifestyle</p>
      </motion.div>

      <Swiper
        ref={swiperRef}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        effect="fade"
        speed={1000}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} w-3 h-3"></span>`;
          }
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105"
                style={{ 
                  backgroundImage: `url(${image.image})`,
                  animation: 'slowZoom 7s ease-in-out infinite alternate'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-32 left-32 max-w-xl"
              >
                <h2 className="text-5xl font-bold mb-4 text-white">
                  {image.title}
                </h2>
                <p className="text-xl mb-6 text-white/80">
                  {image.description}
                </p>
                <div className="flex items-center space-x-2 text-white/60">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{image.location}</span>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-next !w-16 !h-16 !right-8 after:!text-4xl"></div>
      <div className="swiper-button-prev !w-16 !h-16 !left-8 after:!text-4xl"></div>
    </section>
  );
}