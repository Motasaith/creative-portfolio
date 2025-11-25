import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full z-50 px-6 md:pl-24 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm"
    >
      <div className="text-xl md:text-2xl font-bold font-comic text-white tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        Abdul Rauf <span className="text-blue-500">Azhar</span>
      </div>

      <nav className="hidden md:flex gap-8">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(item)}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
          </button>
        ))}
      </nav>

      <button className="md:hidden text-white">
        {/* Mobile Menu Icon Placeholder */}
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </motion.header>
  );
};

export default Header;
