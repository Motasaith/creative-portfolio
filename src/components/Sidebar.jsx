import React from 'react';
import { Github, Linkedin, Container } from 'lucide-react'; // Using Container as Docker icon proxy or generic box
import { motion } from 'framer-motion';

const Sidebar = () => {
  const links = [
    { icon: <Github size={24} />, href: "https://github.com/Motasaith", label: "GitHub" },
    { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/abdul-rauf-azhar-5750a3378/", label: "LinkedIn" },
    { icon: <Container size={24} />, href: "https://hub.docker.com/u/abdulraufazhar?_gl=1*1rrojn1*_gcl_au*MzUxMTEwMjUyLjE3NjI5NjQ3MzY.*_ga*NTc4Njk1NjU2LjE3NjI5NjQ3Mzc.*_ga_XJWPQMJYHQ*czE3NjQxNzQyNjckbzkkZzAkdDE3NjQxNzQyNjckajYwJGwwJGgw", label: "Docker" },
  ];

  return (
    <motion.div 
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed left-0 top-0 h-full w-16 md:w-20 bg-black/20 backdrop-blur-lg border-r border-white/5 flex flex-col items-center justify-center gap-8 z-40 hidden md:flex"
    >
      {/* Decorative Line Top */}
      <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-gray-500 absolute top-0"></div>

      {links.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.2, x: 5, color: '#60A5FA' }}
          className="text-gray-400 hover:text-blue-400 transition-colors relative group"
        >
          {link.icon}
          <span className="absolute left-14 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {link.label}
          </span>
        </motion.a>
      ))}

      {/* Decorative Line Bottom */}
      <div className="w-[1px] h-20 bg-gradient-to-t from-transparent to-gray-500 absolute bottom-0"></div>
    </motion.div>
  );
};

export default Sidebar;
