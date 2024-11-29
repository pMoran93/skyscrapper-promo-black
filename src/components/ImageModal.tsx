import React, { useState, useRef, useEffect } from 'react';
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

function MobileImageView({ image, title }: Image) {
  const [constraints, setConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (!imageRef.current || !containerRef.current) return;

      const img = imageRef.current;
      const container = containerRef.current;
      
      const scale = 1.5;
      const scaledWidth = img.offsetWidth * scale;
      const scaledHeight = img.offsetHeight * scale;
      
      const xConstraint = Math.max(0, (scaledWidth - container.offsetWidth) / 1.5);
      const yConstraint = Math.max(0, (scaledHeight - container.offsetHeight) / 1.5);

      setConstraints({
        left: -xConstraint,
        right: xConstraint,
        top: -yConstraint,
        bottom: yConstraint
      });
    };

    const img = imageRef.current;
    if (img) {
      img.style.transform = 'scale(1.5)';
      img.addEventListener('load', updateConstraints);
      window.addEventListener('resize', updateConstraints);
      updateConstraints();
    }

    return () => {
      if (img) {
        img.removeEventListener('load', updateConstraints);
        window.removeEventListener('resize', updateConstraints);
      }
    };
  }, [image]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="relative w-full h-full"
        drag
        dragConstraints={constraints}
        dragElastic={0.1}
      >
        <img
          ref={imageRef}
          src={image}
          alt={title}
          className="w-full h-full object-cover touch-none select-none origin-center"
        />
      </motion.div>
    </div>
  );
}

function DesktopImageView({ image, title }: Image) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={image}
        alt={title}
        className="max-h-[90vh] w-auto object-contain rounded-lg"
      />
    </div>
  );
}

export function ImageModal({ images, selectedIndex, onClose, onNavigate }: ImageModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (selectedIndex === null) return null;

  const currentImage = images[selectedIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90"
        onClick={onClose}
      >
        {/* Mobile Controls */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
              }}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
              }}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block absolute left-40 top-1/2 -translate-y-1/2 z-20">
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

        <div className="hidden md:block absolute right-40 top-1/2 -translate-y-1/2 z-20">
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
        <div className="absolute top-4 right-4 z-30">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="relative p-2 bg-black rounded-full text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>

        <div className="w-full h-full" onClick={(e) => e.stopPropagation()}>
          {isMobile ? (
            <MobileImageView {...currentImage} />
          ) : (
            <DesktopImageView {...currentImage} />
          )}

          <div className="absolute bottom-20 md:bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {currentImage.title}
            </h3>
            {currentImage.description && (
              <p className="text-white/80 text-base md:text-lg">
                {currentImage.description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
