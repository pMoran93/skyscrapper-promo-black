import React, { useRef } from 'react';
import { motion } from 'framer-motion';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-photographer-in-a-forest-taking-pictures-34671-large.mp4"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-4xl px-8"
        >
          <h2 className="text-6xl font-bold mb-8">Motion Through the Lens</h2>
          <p className="text-xl max-w-2xl mx-auto mb-12 text-gray-300">
            Experience the art of photography in motion, where every frame tells a story and every moment becomes eternal.
          </p>
          <div className="flex items-center justify-center space-x-6">
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-opacity-90 transition-colors duration-300">
              Watch Reel
            </button>
            <button className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold hover:bg-white/20 transition-colors duration-300">
              Behind the Scenes
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}