import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageModal } from './ImageModal';

interface LayerImage {
  image: string;
  title: string;
  description?: string;
}

interface Layer {
  mainImage: string;
  title: string;
  text: string;
  images: LayerImage[];
}

const layers: Layer[] = [
  {
    mainImage: '/interior_4.png',
    title: 'Living Room',
    text: 'Discover the essence of modern luxury in every corner of Eterna Tower Nashville, located at 1201 Demonbreun Street, Nashville, TN 37203',
    images: [
      {
        image: '/interior_4.png',
        title: 'Living Room - Main View',
        description: 'Spacious living area with floor-to-ceiling windows'
      },
      {
        image: '/interior_5.png',
        title: 'Living Room - Lounge',
        description: 'Elegant lounge area perfect for entertaining'
      },
      {
        image: '/interior_6.png',
        title: 'Living Room - Evening',
        description: 'Stunning city views at sunset'
      },
      {
        image: '/interior_7.png',
        title: 'Living Room - Detail',
        description: 'Premium finishes and modern design elements'
      }
    ]
  },
  {
    mainImage: '/interior_8.png',
    title: 'Master Bedroom',
    text: 'Designed to redefine comfort and exclusivity, our residences offer spacious spaces, top quality finishes and unparalleled views of the Nashville skyline',
    images: [
      {
        image: '/interior_8.png',
        title: 'Master Bedroom - Overview',
        description: 'Luxurious master suite with panoramic views'
      },
      {
        image: '/interior_9.png',
        title: 'Master Bedroom - Evening',
        description: 'Perfect ambiance for relaxation with city lights'
      }
    ]
  },
  {
    mainImage: '/interior_10.png',
    title: 'Bathroom',
    text: 'From cozy studios to majestic penthouses, these residences adapt to the highest standards of living contemporary',
    images: [
      {
        image: '/interior_10.png',
        title: 'Bathroom - Main View',
        description: 'Spa-like master bathroom with premium fixtures'
      },
      {
        image: '/interior_11.png',
        title: 'Bathroom - Detail',
        description: 'Elegant finishes and modern amenities'
      }
    ]
  }
];

export function OverlappingLayers() {
  const [selectedLayer, setSelectedLayer] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleLayerClick = (layerIndex: number) => {
    setSelectedLayer(layerIndex);
    setSelectedImageIndex(0); // Start with the first image
  };

  const handleCloseModal = () => {
    setSelectedLayer(null);
    setSelectedImageIndex(null);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedImageIndex(newIndex);
  };

  return (
    <section className="py-32 px-4 relative overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-24"
      >
        Residences
      </motion.h2>

      <div className="max-w-7xl mx-auto relative h-[120vh] min-[500px]:h-[180vh] lg:h-[180vh] flex flex-col md:block">
        {layers.map((layer, index) => (
          <motion.div
          key={index}
          initial={{ opacity: 0, y: 100, rotate: 5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          className={`
            relative md:sticky md:top-[20vh] w-full max-w-2xl mb-8 md:mb-0
            ${index === 0 ? '' : 
              index === 1 ? 'md:ml-[10%] md:-mt-[3vh]' : 
              'md:ml-[20%] md:-mt-[6vh]'}
          `}
          style={{
            zIndex: layers.length - index
          }}
          onClick={() => handleLayerClick(index)}
          >
            <div className="relative rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={layer.mainImage}
                  alt={layer.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 md:p-8">
                <h3 className="text-xl md:text-3xl font-bold mb-1 md:mb-2">{layer.title}</h3>
                <p className="text-sm md:text-lg text-gray-300">{layer.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedLayer !== null && selectedImageIndex !== null && (
        <ImageModal
          images={layers[selectedLayer].images}
          selectedIndex={selectedImageIndex}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  );
}