import React from 'react';
import { motion } from 'framer-motion';
import HeroImage from './HeroImage';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-20 pt-40 md:pt-20 bg-transparent text-white overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-navy-dark rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-sans tracking-tight">
            Hi, I'm <span className="text-blue-400">Abdul Rauf</span>
          </h1>
          <h2 className="text-2xl md:text-4xl text-gray-300 mb-6 font-light">
            Creative Developer
          </h2>
          <p className="text-lg text-gray-400 max-w-md mx-auto md:mx-0 mb-8 leading-relaxed">
            Crafting immersive digital experiences with code and creativity.
            Specializing in interactive 2.5D web design.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-500 transition-colors"
          >
            View Projects
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:w-1/2 flex justify-center"
        >
          <HeroImage />
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-500 cursor-pointer hover:text-white transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
