import React from 'react';
import { motion } from 'framer-motion';

const layers = [
  {
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
    title: 'Human Connection',
    text: 'Capturing the essence of humanity through the lens'
  },
  {
    image: 'https://images.unsplash.com/photo-1447684808650-354ae64db5b8',
    title: 'Urban Stories',
    text: 'Finding beauty in the chaos of city life'
  },
  {
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    title: 'Natural Wonder',
    text: 'Exploring the untamed beauty of our world'
  }
];

export function OverlappingLayers() {
  return (
    <section className="min-h-screen py-24 px-8 bg-black relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mb-24"
      >
        Depth in Dimensions
      </motion.h2>

      <div className="max-w-7xl mx-auto relative h-[150vh]">
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="sticky top-[20vh] w-full max-w-2xl mx-auto"
            style={{
              marginLeft: `${index * 10}%`,
              zIndex: layers.length - index
            }}
          >
            <div className="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={layer.image}
                  alt={layer.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-bold mb-2">{layer.title}</h3>
                <p className="text-lg text-gray-300">{layer.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}