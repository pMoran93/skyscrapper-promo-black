import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import logo from '../assets/icons/logo_eterna.svg';

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
    <section className="h-[100svh] relative overflow-hidden bg-black">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute top-4 md:top-8 left-4 md:left-8 z-20 px-4 md:px-0"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 flex items-center gap-4">
          <img src='src/assets/icons/logo_eterna.svg' alt="Eterna Logo" className="h-10 md:h-12 lg:h-14 brightness-0 invert" />
          Eterna Tower Nashville
        </h1>
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
            return `<span class="${className} !w-2 !h-2 md:!w-3 md:!h-3"></span>`;
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-16 md:bottom-32 left-4 md:left-32 max-w-xl px-4 md:px-0"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
                  {image.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-white/80">
                  {image.description}
                </p>
                <div className="flex items-center space-x-2 text-white/60">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base md:text-lg">{image.location}</span>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation buttons - Hidden on mobile */}
      <div className="hidden md:block">
        <div className="swiper-button-next !w-12 !h-12 md:!w-16 md:!h-16 !right-4 md:!right-8 after:!text-3xl md:after:!text-4xl"></div>
        <div className="swiper-button-prev !w-12 !h-12 md:!w-16 md:!h-16 !left-4 md:!left-8 after:!text-3xl md:after:!text-4xl"></div>
      </div>

      {/* Add touch indicator for mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 2,
          repeat: 2,
          repeatType: "reverse"
        }}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm flex flex-col items-center md:hidden"
      >
        <span>Swipe to explore</span>
        <svg className="w-6 h-6 mt-1 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
}