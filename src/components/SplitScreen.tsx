import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const panels = [
  {
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    title: 'The Journey',
    description: 'Through untamed wilderness'
  },
  {
    image: 'https://images.unsplash.com/photo-1447684808650-354ae64db5b8',
    title: 'The Discovery',
    description: 'Finding hidden gems'
  },
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'The Wonder',
    description: 'Nature\'s masterpiece'
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