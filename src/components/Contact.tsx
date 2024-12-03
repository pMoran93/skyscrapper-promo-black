import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  floorType: string;
  subject: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    floorType: '',
    subject: 'Eterna Tower - Flat request'
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (!formData.floorType) {
      newErrors.floorType = 'Floor type selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const emailData = {
        ...formData,
        subject: `Eterna Tower - ${formData.floorType} Request`
      };

      const backendUrl = import.meta.env.PUBLIC_BACKEND_URL;

      const response = await fetch(`${backendUrl}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your interest! We will contact you soon about the ' + formData.floorType + '.',
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        floorType: '',
        subject: 'Eterna Tower - Flat request'
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-black text-white py-12 md:py-20">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-24"
      >
        Contact
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto text-center space-y-4 md:space-y-6 px-4 md:px-0"
      >
        <p className="text-base md:text-lg leading-relaxed text-white/80">
          We're here to help you find your ideal home in Eterna Tower Nashville.
          Complete our contact form to request more information or schedule an appointment
          visit.
        </p>
        <p className="text-base md:text-lg leading-relaxed text-white/80 pb-12 md:pb-40">
          You can also call us or write to us by email. Our team, together
          with Black Navy Real Estate, is ready to assist you and answer all your questions.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form - Moved to top for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:order-2 bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-lg"
          >
            <h3 className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              Get in Touch
            </h3>
            {submitStatus.type === 'success' ? (
              <div 
                className="p-6 rounded-lg bg-green-500/20 text-green-200 border border-green-500/30"
              >
                <p className="text-lg font-medium mb-2">Thank you!</p>
                <p className="text-sm">{submitStatus.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
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
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.name ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white`}
                    required
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
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
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.email ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
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
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.phone ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white`}
                    required
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="floorType" className="block text-sm font-medium text-gray-300 mb-2">
                    Floor Type
                  </label>
                  <select
                    id="floorType"
                    name="floorType"
                    value={formData.floorType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.floorType ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white`}
                    required
                  >
                    <option value="">Select floor type</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Intermediate Floor">Intermediate Floor</option>
                  </select>
                  {errors.floorType && (
                    <p className="mt-1 text-sm text-red-500">{errors.floorType}</p>
                  )}
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
                    className={`w-full px-4 py-3 bg-white/10 border ${
                      errors.message ? 'border-red-500' : 'border-gray-700'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-white`}
                    required
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-colors ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Information Column - Moved to bottom for mobile */}
          <div className="space-y-8 md:space-y-16 lg:order-1">
            {/* Contact Info - Moved to top of info section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 order-first"
            >
              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">+34 620 744 137</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">info@blacknavyrealstate.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">1201 Demonbreun Street, Nashville</span>
                </div>
              </div>
            </motion.div>

            {/* Location Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Location
              </h3>
              <div className="flex items-start gap-4">
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
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
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
                Legal
              </h3>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                In this section you will find the terms and conditions of our website, as well as
                our privacy policy. We are committed to protecting your information and ensuring
                transparency in every interaction, in line with the highest standards in the sector.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 pb-12 md:pb-8 border-t border-gray-800">
        <p className="text-center text-gray-500">
          {new Date().getFullYear()} Black Navy - Eterna Tower Nashville - All rights reserved.
        </p>
      </div>
    </section>
  );
};
