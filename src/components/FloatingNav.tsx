import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavItem {
  id: string;
  initial: string;
}

export const FloatingNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');

  const navItems: NavItem[] = [
    { id: 'home', initial: 'H' },
    { id: 'amenities', initial: 'A' },
    { id: 'views', initial: 'V' },
    { id: 'availability', initial: 'A' },
    { id: 'residences', initial: 'R' },
    { id: 'contact', initial: 'C' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { 
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-1/4 right-8 -translate-y-1/2 z-50"
    >
      <div className="flex flex-col items-center gap-3 p-3 rounded-full bg-black/30 backdrop-blur-lg border border-white/10 shadow-lg">
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-600/20 to-pink-600/20 blur-xl"></div>
        {navItems.map(({ id, initial }) => (
          <motion.button
            key={id}
            onClick={() => scrollToSection(id)}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
              activeSection === id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                : 'text-white/70 hover:text-white'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">{initial}</span>
            {activeSection === id && (
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
                layoutId="activeSection"
                transition={{ type: "spring", duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};
