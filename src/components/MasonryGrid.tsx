import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const images = [
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Mountain Vista',
    size: 'large'
  },
  {
    url: 'https://images.unsplash.com/photo-1447684808650-354ae64db5b8',
    title: 'Ocean Dreams',
    size: 'small'
  },
  {
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    title: 'Forest Light',
    size: 'medium'
  },
  {
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
    title: 'Nature\'s Path',
    size: 'large'
  },
  {
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
    title: 'Mountain Lake',
    size: 'medium'
  },
  {
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Sunset Peak',
    size: 'small'
  }
];

export function MasonryGrid() {
  return (
    <section className="py-24 px-8 bg-black">
      <motion.h2 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mb-16"
      >
        Fragments of Beauty
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`relative overflow-hidden rounded-lg ${
              image.size === 'large' ? 'row-span-2' :
              image.size === 'medium' ? 'row-span-1' : ''
            }`}
          >
            <div className="group aspect-w-3 aspect-h-4 relative overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                    {image.title}
                  </h3>
                  <button className="px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}