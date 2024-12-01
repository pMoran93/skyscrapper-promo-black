import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenTool, Building, Camera, Palette } from 'lucide-react';
import brochurePdf from '../assets/pdf/test.pdf';

interface Unit {
  floor: string;
  price: string;
  sqft: string;
  bedrooms: number;
  available: boolean;
  isPenthouse: boolean;
  isHighFloor: boolean;
}

const enterprises = [
  {
    icon: PenTool,
    name: "Design Architects",
    description: "NoName Architecture"
  },
  {
    icon: Building,
    name: "Developers",
    description: "Mara Properties"
  },
  {
    icon: Camera,
    name: "CGI Images",
    description: "JVA Renders"
  },
  {
    icon: Palette,
    name: "Branding & Web Design",
    description: "Black Navy Real Estate"
  }
];

export function Availability() {
  const [filters, setFilters] = useState({
    penthouse: false,
    highFloor: false,
    threeBedsPlus: false,
    available: false,
  });

  const floors: Unit[] = [
    {
      floor: "Penthouse",
      price: "$2,500,000",
      sqft: "3,500",
      bedrooms: 4,
      available: true,
      isPenthouse: true,
      isHighFloor: true
    },
    {
      floor: "Floor 40",
      price: "$1,800,000",
      sqft: "2,800",
      bedrooms: 3,
      available: true,
      isPenthouse: false,
      isHighFloor: true
    },
    {
      floor: "Floor 39",
      price: "$1,700,000",
      sqft: "2,600",
      bedrooms: 3,
      available: false,
      isPenthouse: false,
      isHighFloor: true
    },
    {
      floor: "Floor 38",
      price: "$1,600,000",
      sqft: "2,400",
      bedrooms: 2,
      available: true,
      isPenthouse: false,
      isHighFloor: true
    },
  ];

  const handleFilterChange = (filterName: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const filteredUnits = floors.filter(unit => {
    if (filters.penthouse && !unit.isPenthouse) return false;
    if (filters.highFloor && !unit.isHighFloor) return false;
    if (filters.threeBedsPlus && unit.bedrooms < 3) return false;
    if (filters.available && !unit.available) return false;
    return true;
  });

  return (
    <section className="bg-black py-24 px-4">
      
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-24 text-white"
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

      <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex flex-col space-y-6 md:space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {Object.entries({
              penthouse: "Penthouse",
              highFloor: "High Floor",
              threeBedsPlus: "3+ Beds",
              available: "Available"
            }).map(([key, label]) => (
              <div key={key} className="relative">
                <div 
                  className={`absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md ${
                    filters[key as keyof typeof filters] ? 'opacity-75' : 'opacity-0'
                  } blur transition duration-1000`}
                />
                <button
                  onClick={() => handleFilterChange(key as keyof typeof filters)}
                  className={`relative w-full py-2 md:py-3 px-2 md:px-3 rounded-md transition-colors text-sm md:text-base ${
                    filters[key as keyof typeof filters] 
                      ? 'bg-black text-white' 
                      : 'bg-black/50 text-white/70 hover:text-white hover:bg-black'
                  }`}
                >
                  {label}
                </button>
              </div>
            ))}
          </div>

          <div className="space-y-4 md:space-y-6">
            <AnimatePresence>
              {filteredUnits.map((unit, index) => (
                <motion.div
                  key={unit.floor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000"></div>
                  <div className="relative p-4 md:p-6 rounded-lg bg-black">
                    <div className="flex flex-col md:grid md:grid-cols-4 gap-4 items-start md:items-center text-white">
                      {/* Floor and Availability */}
                      <div className="w-full flex justify-between items-center md:block">
                        <div>
                          <h4 className="text-lg md:text-xl font-semibold">{unit.floor}</h4>
                          <p className={`text-sm mt-1 md:mt-2 ${unit.available ? 'text-green-400' : 'text-red-400'}`}>
                            {unit.available ? 'Available' : 'Reserved'}
                          </p>
                        </div>
                        <p className="text-xl md:text-2xl font-bold md:hidden">{unit.price}</p>
                      </div>

                      {/* Beds and Sqft */}
                      <div className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <span className="text-white/80">{unit.bedrooms}</span>
                          <span className="text-white/80">Beds</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-white/80">{unit.sqft}</span>
                          <span className="text-white/80">sq ft</span>
                        </div>
                      </div>

                      {/* Price - Hidden on mobile */}
                      <div className="hidden md:block text-center">
                        <p className="text-2xl font-bold">{unit.price}</p>
                      </div>

                      {/* View Details Button */}
                      <div className="w-full flex justify-center md:justify-end">
                        <div className="relative group/button">
                          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md opacity-0 group-hover/button:opacity-75 blur transition duration-1000"></div>
                          <a
                            href={brochurePdf}
                            download="luxury-residences-brochure.pdf"
                            className="relative px-4 py-2 bg-black text-white rounded-md transition-colors text-sm md:text-base w-full text-center">
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {filteredUnits.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-white/70 py-6 md:py-8"
              >
                No units match your selected filters
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-16 md:mt-24"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center text-white mb-8 md:mb-12">
              Our Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {enterprises.map((enterprise, index) => {
                const Icon = enterprise.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group h-full"
                  >
                    <div className="absolute -inset-1 rounded-lg opacity-50 group-hover:opacity-75 blur transition duration-1000"></div>
                    <div className="relative p-3 md:p-4 rounded-lg bg-black h-full">
                      <div className="flex flex-col items-center text-center space-y-2 h-full justify-center">
                        <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <h4 className="text-base md:text-lg font-semibold text-white">{enterprise.name}</h4>
                        <p className="text-xs md:text-sm text-white/80">{enterprise.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
