import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface Image {
  image: string;
  title: string;
  description?: string;
}

interface ImageModalProps {
  images: Image[];
  selectedIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageModal({ images, selectedIndex, onClose, onNavigate }: ImageModalProps) {
  if (selectedIndex === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        onClick={onClose}
      >
        {/* Left Arrow */}
        <div className="absolute left-40 top-1/2 -translate-y-1/2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
              }}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Right Arrow */}
        <div className="absolute right-40 top-1/2 -translate-y-1/2">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
              }}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Close Button */}
        <div className="absolute top-20 right-20">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={onClose}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="relative max-w-7xl w-full max-h-[90vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[selectedIndex].image}
            alt={images[selectedIndex].title}
            className="w-full h-full object-contain rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <h3 className="text-3xl font-bold text-white mb-2">
              {images[selectedIndex].title}
            </h3>
            {images[selectedIndex].description && (
              <p className="text-white/80 text-lg">
                {images[selectedIndex].description}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
