import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const panels = [
  {
    image: '/building_6.png',
    title: "See",
    description: "See Nashville like never before from the heights of Eterna Tower Nashville"
  },
  {
    image: '/building_1.png',
    title: "Through Our",
    description: "With panoramic windows in each residence, enjoy spectacular views that encompass the city's main points of interest, the Cumberland River and beyond"
  },
  {
    image: '/building_4.png',
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

  const containerStyle = useTransform(
    scrollYProgress,
    [0, 0.95, 0.95],
    ["fixed", "fixed", "absolute"]
  );

  const marginTop = useTransform(
    scrollYProgress,
    [0, 0.95, 0.95],
    ["0vh", "0vh", "100vh"]
  );

  return (
    <div ref={containerRef} className="relative h-[200vh] z-10">
      <motion.div 
        className="top-0 left-0 right-0 h-screen flex md:flex-row flex-col overflow-hidden"
        style={{ 
          position: containerStyle,
          marginTop: marginTop,
          zIndex: 10
        }}
      >
        {panels.map((panel, i) => {
          const progress = useTransform(
            scrollYProgress,
            [i / panels.length, (i + 1) / panels.length],
            [0, 1]
          );

          return (
            <motion.div
              key={i}
              className="relative md:w-1/3 w-full h-full"
              style={{
                opacity: progress
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${panel.image})` }}
              />
              <div className="absolute inset-0 bg-black/10" />
              <motion.div 
                className="absolute bottom-10 left-10 right-10 text-white"
                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="md:text-4xl text-2xl font-bold mb-4">{panel.title}</h3>
                <p className="md:text-xl text-sm">{panel.description}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}