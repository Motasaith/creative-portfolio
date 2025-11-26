import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Share2, Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isSocialOpen, setIsSocialOpen] = React.useState(false);
  const navItems = ["Home", "About", "Projects", "Skills", "Contact"];

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isSocialOpen) setIsSocialOpen(false);
  };

  const toggleSocial = () => {
    setIsSocialOpen(!isSocialOpen);
    if (isNavOpen) setIsNavOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsNavOpen(false);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full z-50 px-6 md:pl-24 py-4 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pointer-events-none md:pointer-events-auto"
      >
        <div className="text-xl md:text-2xl font-bold font-comic text-white tracking-tighter cursor-pointer pointer-events-auto md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Abdul Rauf <span className="text-blue-500">Azhar</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 pointer-events-auto">
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
      </motion.header>

      {/* MOBILE CONTROLS (Visible only on mobile) */}
      
      {/* Left Toggle - Comms */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-5 left-5 z-[60] md:hidden w-12 h-12 rounded-full bg-slate-900/50 backdrop-blur border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        onClick={toggleSocial}
      >
        <Share2 size={20} />
      </motion.button>

      {/* Right Toggle - Nav */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed top-5 right-5 z-[60] md:hidden w-12 h-12 rounded-full bg-slate-900/50 backdrop-blur border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        onClick={toggleNav}
      >
        <Menu size={24} />
      </motion.button>

      {/* LEFT PANEL - COMMS (Socials) */}
      <AnimatePresence>
        {isSocialOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-3/4 max-w-xs bg-[#0a0a1a]/95 backdrop-blur-xl z-[55] border-r border-cyan-500/30 shadow-[5px_0_30px_rgba(6,182,212,0.2)] p-8 pt-28 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <h3 className="text-xl font-bold text-cyan-400 tracking-widest">COMMS</h3>
              <button onClick={() => setIsSocialOpen(false)} className="text-gray-400 hover:text-white absolute top-6 right-6">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                  <Github size={20} />
                </div>
                <span className="font-medium">GitHub</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                  <Linkedin size={20} />
                </div>
                <span className="font-medium">LinkedIn</span>
              </a>
              <a href="mailto:contact@example.com" className="flex items-center gap-4 text-gray-300 hover:text-cyan-400 transition-colors group">
                <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 group-hover:border-cyan-500/50 transition-colors">
                  <Mail size={20} />
                </div>
                <span className="font-medium">Email</span>
              </a>
            </div>

            <div className="mt-auto">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent mb-6"></div>
              <p className="text-xs text-center text-cyan-500/50 font-mono">SYSTEM: ONLINE</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RIGHT PANEL - NAV (Links) */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-3/4 max-w-xs bg-[#0a0a1a]/95 backdrop-blur-xl z-[55] border-l border-purple-500/30 shadow-[-5px_0_30px_rgba(168,85,247,0.2)] p-8 pt-28 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <button onClick={() => setIsNavOpen(false)} className="text-gray-400 hover:text-white absolute top-6 left-6">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item)}
                  className="text-left py-4 px-4 rounded-lg hover:bg-purple-500/10 text-gray-300 hover:text-purple-300 transition-all border border-transparent hover:border-purple-500/30"
                >
                  <span className="text-xs font-mono text-purple-500/50 mr-3">0{index + 1}</span>
                  {item}
                </button>
              ))}
            </div>

            <div className="mt-auto">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mb-6"></div>
              <p className="text-xs text-center text-purple-500/50 font-mono">NAVIGATIONAL SYSTEMS</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
