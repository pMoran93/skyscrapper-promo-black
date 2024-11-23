import React from 'react';
import { motion } from 'framer-motion';
import { Availability } from './Availability';

const stories = [
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'The Art of Seeing',
    description: 'Every photograph tells a story, captures a moment, preserves a memory that would otherwise be lost to time. Through the lens, we discover the extraordinary in the ordinary.',
    align: 'right'
  },
  {
    image: 'https://images.unsplash.com/photo-1447684808650-354ae64db5b8',
    title: 'Behind the Lens',
    description: 'The photographer\'s eye transforms ordinary scenes into extraordinary moments. Each click of the shutter is a decision, a moment of clarity in a world of chaos.',
    align: 'left'
  }
];

export function ImageTile() {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-black to-gray-900">

      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mb-12"
      >
        Availability
      </motion.h2>

      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
        <p className="text-lg leading-relaxed text-white/80">
        Check out our available unit options and find the one that best suits you.
        your needs at Eterna Tower Nashville. 
        With a variety of plans and configurations, we offer options that fit different lifestyles. 
        </p>
        <p className="text-lg leading-relaxed text-white/80">
        Use our interactive search engine, developed by Black Navy Real Estate, to explore the
        residences available and plan your visit today.
        </p>
      </motion.div>

      <Availability></Availability>

    </section>
  );
}