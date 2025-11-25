import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroImage = () => {
  const ref = useRef(null);
  const [isConsumed, setIsConsumed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values (0 to 1) for parallax
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Smooth spring animation for tilt
  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 150, damping: 20 });
  const imageX = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });
  const imageY = useSpring(useTransform(y, [0, 1], [-10, 10]), { stiffness: 150, damping: 20 });
  const glowX = useTransform(x, [0, 1], ['0%', '100%']);
  const glowY = useTransform(y, [0, 1], ['0%', '100%']);

  // Scroll Trigger to reset state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50 && isConsumed) {
        setIsConsumed(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isConsumed]);

  const handleMouseMove = (e) => {
    if (!ref.current || isConsumed) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    x.set(clientX / rect.width);
    y.set(clientY / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0.5);
    y.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isConsumed) {
        setIsConsumed(true);
    }
  };

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
      {/* Black Hole Portal */}
      <motion.div
        className="absolute z-0 rounded-full"
        style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, #000000 0%, #0a0a1a 40%, #1a1a2e 70%, transparent 100%)',
          boxShadow: '0 0 60px rgba(0,0,0,0.8)',
        }}
        variants={{
          initial: { scale: 0, opacity: 0 },
          expanding: { 
            scale: 2.5, 
            opacity: 1, 
            rotate: 180,
            transition: { duration: 0.8, ease: "circIn" } 
          },
          pulsing: { 
            scale: [0.8, 0.9, 0.8], 
            opacity: 0.8, 
            rotate: 360,
            transition: { 
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              rotate: { repeat: Infinity, duration: 20, ease: "linear" }
            } 
          },
          reset: { 
            scale: 0, 
            opacity: 0,
            transition: { duration: 0.5, ease: "backIn" }
          }
        }}
        animate={
          !isConsumed ? "reset" :
          isHovered ? "expanding" : "pulsing"
        }
      />

      {/* Hero Image Container */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          perspective: 1000,
          rotateX: isConsumed ? 0 : rotateX,
          rotateY: isConsumed ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        variants={{
          visible: { 
            scale: 1, 
            opacity: 1, 
            filter: "blur(0px)",
            x: 0,
            y: 0,
            transition: { duration: 0.8, ease: "backOut" }
          },
          consumed: { 
            scale: 0.05, 
            opacity: 0, 
            filter: "blur(20px)",
            rotate: 720,
            transition: { duration: 0.6, ease: "anticipate" }
          }
        }}
        animate={isConsumed ? "consumed" : "visible"}
        className="relative w-full h-full rounded-full bg-gray-900 border-2 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.5)] cursor-pointer overflow-hidden group z-10"
      >
        {/* Parallax Image Container */}
        <motion.div
          style={{
            x: isConsumed ? 0 : imageX,
            y: isConsumed ? 0 : imageY,
            scale: 1.1, 
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img 
            src="/profile.png" 
            alt="Profile" 
            className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          {/* Vignette Mask */}
          <div className="absolute inset-0 bg-radial-gradient-fade pointer-events-none rounded-full"></div>
        </motion.div>

        {/* Dynamic Lighting Glow Overlay */}
        <motion.div
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)`
            ),
          }}
          className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay rounded-full"
        />

        {/* Glass Reflection Shine */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-full" />
        
        {/* Border Glow */}
        <div className="absolute inset-0 rounded-full border border-white/10 group-hover:border-blue-500/30 transition-colors duration-500 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default HeroImage;
