import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ProjectCard = ({ title, description, tags, color }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rounded-3xl p-8 flex flex-col justify-between overflow-hidden group cursor-pointer border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105 transition-all duration-300`}
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xl z-0 shadow-xl group-hover:bg-slate-900/50 transition-all duration-300"></div>
      
      {/* Gradient Blob for color */}
      <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-40 ${color} z-0 pointer-events-none`}></div>
      <div className={`absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-40 ${color} z-0 pointer-events-none`}></div>

      {/* Content */}
      <div className="relative z-10 transform translate-z-10">
        <h3 className="text-3xl font-bold mb-2 text-white drop-shadow-md">{title}</h3>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed">{description}</p>
      </div>

      <div className="relative z-10 transform translate-z-10">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-black/30 rounded-full text-xs text-white font-medium backdrop-blur-sm border border-white/10">
              {tag}
            </span>
          ))}
        </div>
        <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-bold transition-colors backdrop-blur-sm">
          View Project
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
