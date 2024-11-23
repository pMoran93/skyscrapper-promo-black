import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const panels = [
  {
    image: '/src/assets/building_6.png',
    title: "See",
    description: "See Nashville like never before from the heights of Eterna Tower Nashville"
  },
  {
    image: '/src/assets/building_1.png',
    title: "Through Our",
    description: "With panoramic windows in each residence, enjoy spectacular views that encompass the city's main points of interest, the Cumberland River and beyond"
  },
  {
    image: '/src/assets/building_4.png',
    title: "View",
    description: "This skyscraper redefines perspectives, making every sunrise and sunset a unique experience"
  }
];

export function SplitScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex overflow-hidden">
        {panels.map((panel, i) => {
          const progress = useTransform(
            scrollYProgress,
            [i / panels.length, (i + 1) / panels.length],
            [0, 1]
          );

          return (
            <motion.div
              key={i}
              className="relative w-1/3 h-full"
              style={{
                opacity: progress
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${panel.image})` }}
              />
              <div className="absolute inset-0 bg-black/30" />
              <motion.div 
                className="absolute bottom-20 left-10 right-10 text-white"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-4xl font-bold mb-4">{panel.title}</h3>
                <p className="text-xl">{panel.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}