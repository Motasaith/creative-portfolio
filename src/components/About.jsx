import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center p-8 md:p-20 relative z-10">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="md:w-1/2"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I'm Abdul Rauf Azhar, a passionate Creative Developer based in Pakistan. 
            I specialize in building immersive web experiences that blend art with technology.
          </p>
          <p className="text-gray-400 text-base leading-relaxed mb-8">
            With a strong foundation in modern web technologies like React, Tailwind, and GSAP, 
            I turn complex problems into elegant, interactive solutions. When I'm not coding, 
            I'm exploring new design trends or contributing to open-source projects.
          </p>
          
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 font-mono text-sm">
              Frontend Dev
            </div>
            <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-lg text-purple-400 font-mono text-sm">
              UI/UX Design
            </div>
            <div className="px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 font-mono text-sm">
              Creative Coding
            </div>
          </div>
        </motion.div>

        {/* Visual Content (Code Snippet Graphic) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="md:w-1/2 w-full"
        >
          <div className="bg-[#1e1e1e] rounded-xl shadow-2xl border border-gray-800 overflow-hidden relative group hover:border-blue-500/30 transition-colors">
            {/* Window Controls */}
            <div className="bg-[#252526] px-4 py-2 flex items-center gap-2 border-b border-gray-800">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-2 text-xs text-gray-500 font-mono">developer.js</span>
            </div>

            {/* Code Content */}
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <div className="text-gray-400">
                <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = <span className="text-yellow-400">{`{`}</span>
              </div>
              <div className="pl-4 text-gray-300">
                name: <span className="text-green-400">'Abdul Rauf Azhar'</span>,
              </div>
              <div className="pl-4 text-gray-300">
                role: <span className="text-green-400">'Creative Developer'</span>,
              </div>
              <div className="pl-4 text-gray-300">
                skills: <span className="text-yellow-400">[</span>
                <span className="text-green-400">'React'</span>, <span className="text-green-400">'GSAP'</span>, <span className="text-green-400">'Three.js'</span>
                <span className="text-yellow-400">]</span>,
              </div>
              <div className="pl-4 text-gray-300">
                hardWorker: <span className="text-blue-400">true</span>,
              </div>
              <div className="pl-4 text-gray-300">
                problemSolver: <span className="text-blue-400">true</span>,
              </div>
              <div className="pl-4 text-gray-300">
                hireable: <span className="text-purple-400">function</span>() <span className="text-yellow-400">{`{`}</span>
              </div>
              <div className="pl-8 text-gray-300">
                <span className="text-purple-400">return</span> <span className="text-blue-400">true</span>;
              </div>
              <div className="pl-4 text-yellow-400">{`}`}</div>
              <div className="text-yellow-400">{`}`}</div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-10 group-hover:opacity-20 transition duration-500 -z-10"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
