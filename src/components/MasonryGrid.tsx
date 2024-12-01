import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageModal } from './ImageModal';

const images = [
  {
    image: '/src/assets/interior_1.png',
    title: "Grand Reception Lobby",
    description: "Experience luxury from the moment you enter with our 24/7 concierge service and elegant waiting areas"
  },
  {
    image: '/src/assets/interior_2.png',
    title: "Infinity Pool",
    description: "Relax and unwind in our stunning rooftop pool with panoramic city views"
  },
  {
    image: '/src/assets/interior_3.png',
    title: "State-of-the-art Gym",
    description: "Stay fit and healthy in our fully equipped fitness center featuring premium equipment"
  }
];

export function MasonryGrid() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen bg-black justify-between py-24 px-4 flex flex-col z-50">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-8 text-white"
        >
          Amenities
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mb-16 space-y-6"
        >
          <p className="text-lg leading-relaxed text-white/80">
            Experience a lifestyle like no other at Eterna Tower Nashville, with
            amenities carefully designed for your comfort and enjoyment.
          </p>
          <p className="text-lg leading-relaxed text-white/80">
            Exclusive access to a fully equipped gym, heated pool, coworking spaces and
            entertainment areas.
          </p>
        </motion.div>
        
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg">
                <img
                  src={image.image}
                  alt={image.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-white/80">{image.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center mt-16 space-y-6"
        >
          <p className="text-lg leading-relaxed text-white/80">
            Our concierge team is available 24 hours a day to assist with
            every detail of your daily life, guaranteeing exceptional service.
          </p>
        </motion.div>

      {/* Image Modal */}
      <ImageModal
        images={images}
        selectedIndex={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNavigate={(index) => setSelectedImage(index)}
      />
    </section>
  );
}