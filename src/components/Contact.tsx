import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section className="bg-black text-white py-20">

<motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold text-center mb-12"
      >
        Contact
      </motion.h2>

      <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
        <p className="text-lg leading-relaxed text-white/80">
          We're here to help you find your ideal home in Eterna Tower Nashville.
          Complete our contact form to request more information or schedule an appointment
          visit.
        </p>
        <p className="text-lg leading-relaxed text-white/80 pb-40">
          You can also call us or write to us by email. Our team, together
          with Black Navy Real Estate, is ready to assist you and answer all your questions.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Information */}
        <div className="space-y-16">
          {/* Location Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Location
            </h3>
            <div className="flex items-start gap-4">
              <p className="text-gray-300 leading-relaxed">
                Located in the heart of Nashville, at 1201 Demonbreun Street, Eterna Tower Nashville
                puts you at the epicenter of culture, entertainment and style. Minutes away from
                major business centers, award-winning restaurants and iconic attractions, live
                here it means enjoying the best the city has to offer. Its privileged location in
                The Gulch guarantees unparalleled accessibility and views.
              </p>
            </div>
          </motion.div>

          {/* Legal Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Legal
            </h3>
            <p className="text-gray-300 leading-relaxed">
              In this section you will find the terms and conditions of our website, as well as
              our privacy policy. We are committed to protecting your information and ensuring
              transparency in every interaction, in line with the highest standards in the sector.
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">+1 (615) 555-0123</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">contact@eternatower.com</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-sm p-8 rounded-lg"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
            Get in Touch
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 pb-24 bg-white/10 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02]"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-gray-800">
        <p className="text-center text-gray-500">
          {new Date().getFullYear()} Black Navy - Eterna Tower Nashville - All rights reserved.
        </p>
      </div>
    </section>
  );
};
