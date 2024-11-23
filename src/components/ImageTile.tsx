import React from 'react';
import { motion } from 'framer-motion';

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
        className="text-5xl font-bold text-center mb-24"
      >
        Stories in Focus
      </motion.h2>

      <div className="max-w-7xl mx-auto space-y-32">
        {stories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`flex flex-col ${story.align === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-16`}
          >
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000"></div>
                <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="object-cover w-full h-full transform transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-4xl font-bold">{story.title}</h3>
              <p className="text-xl leading-relaxed text-gray-300">{story.description}</p>
              <button className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors duration-300">
                Read More
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}