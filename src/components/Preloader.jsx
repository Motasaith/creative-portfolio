import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("Initializing Core Systems...");

  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = duration / 100;

    const timer = setInterval(() => {
      setCount((prev) => {
        const newCount = prev + 1;
        
        // Update text based on progress
        if (newCount < 30) {
          setText("Initializing Core Systems...");
        } else if (newCount < 70) {
          setText("Calibrating Star Charts...");
        } else if (newCount < 99) {
          setText("Engaging Hyperdrive...");
        } else {
          setText("Ready.");
        }

        if (newCount >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay before exit
          return 100;
        }
        return newCount;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[100] bg-[#050510] flex flex-col items-center justify-center font-mono"
    >
      {/* Central Counter */}
      <div className="relative">
        <motion.h1 
          className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
          style={{ textShadow: "0 0 20px rgba(6,182,212,0.5)" }}
        >
          {count}%
        </motion.h1>
      </div>

      {/* Status Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        key={text} // Re-animate when text changes
        className="mt-4 text-cyan-400/80 text-sm md:text-base tracking-widest uppercase"
      >
        {text}
      </motion.p>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-900">
        <motion.div 
          className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"
          style={{ width: `${count}%` }}
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
