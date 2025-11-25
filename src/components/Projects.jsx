import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from './ProjectCard';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Neon Cyber",
    description: "A futuristic e-commerce platform with 3D product previews and neon aesthetics.",
    tags: ["React", "Three.js", "Tailwind"],
    color: "bg-purple-600"
  },
  {
    title: "Eco Tracker",
    description: "Carbon footprint tracking dashboard with interactive data visualization.",
    tags: ["Vue", "D3.js", "Node.js"],
    color: "bg-green-500"
  },
  {
    title: "Retro Arcade",
    description: "Browser-based classic arcade games built with modern web technologies.",
    tags: ["Canvas API", "Audio API", "JS"],
    color: "bg-red-500"
  },
  {
    title: "Crypto Vault",
    description: "Secure cryptocurrency wallet interface with real-time market data.",
    tags: ["React Native", "Web3", "Graph"],
    color: "bg-blue-500"
  },
  {
    title: "Zen Space",
    description: "Meditation and focus app with ambient soundscapes and minimal UI.",
    tags: ["Svelte", "Howler.js", "PWA"],
    color: "bg-teal-500"
  }
];

const Projects = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = sectionRef.current.scrollWidth;
      const windowWidth = window.innerWidth;
      
      gsap.to(sectionRef.current, {
        x: () => -(totalWidth - windowWidth),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-transparent relative">
      <div className="h-screen flex items-center">
        <div className="absolute top-10 left-10 z-10">
          <h2 className="text-5xl md:text-7xl font-bold text-white opacity-5 font-comic">Selected Works</h2>
        </div>
        
        <div 
          ref={sectionRef} 
          className="flex gap-10 px-10 md:px-20 w-fit"
        >
          {/* Intro Card */}
          <div className="w-[300px] md:w-[400px] flex flex-col justify-center shrink-0">
            <h3 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Recent <br />
              <span className="text-blue-400">Projects</span>
            </h3>
            <p className="text-gray-400 text-lg">
              A collection of my best work in web development and design.
              <br />
              <span className="text-sm text-gray-600 mt-4 block">Scroll down to explore &rarr;</span>
            </p>
          </div>

          {projects.map((project, index) => (
            <div key={index} className="shrink-0">
              <ProjectCard {...project} />
            </div>
          ))}
          
          {/* Outro Card */}
           <div className="w-[300px] md:w-[400px] flex flex-col justify-center items-center shrink-0">
            <h3 className="text-3xl font-bold text-white mb-4">Want to see more?</h3>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 text-xl underline">
              Visit my GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
