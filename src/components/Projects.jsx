import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Billboard } from '@react-three/drei';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import * as THREE from 'three';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    title: "Project Alpha",
    description: "A futuristic dashboard for managing interstellar cargo shipments.",
    img: "/project1.png",
    liveLink: "https://google.com",
    gitLink: "https://github.com",
  },
  {
    title: "Nebula Nexus",
    description: "Social network for deep space explorers to share star charts.",
    img: "/project2.png",
    liveLink: "https://google.com",
    gitLink: "https://github.com",
  },
  {
    title: "Quantum Core",
    description: "AI-powered engine optimization tool for light-speed travel.",
    img: "/project3.png",
    liveLink: "https://google.com",
    gitLink: "https://github.com",
  },
];

const Sun = () => {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial 
        emissive="#06b6d4" 
        emissiveIntensity={2} 
        color="#06b6d4" 
        roughness={0.2}
      />
      <pointLight intensity={2} distance={20} color="#06b6d4" />
      <pointLight intensity={1} distance={20} color="#a855f7" position={[2, 0, 0]} />
    </mesh>
  );
};

const ProjectPlanet = ({ project, position }) => {
  return (
    <group position={position}>
      {/* The Planet Mesh acts as the PARENT for the Card */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />

        {/* NESTED BILLBOARD - Rigidly attached to the Planet Mesh */}
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          {/* Position Z=1 moves the card IN FRONT of the planet mesh to prevent clipping */}
          <Html transform scale={0.8} position={[0, 1.5, 1]} occlude="blending">
            <div className="w-[300px] bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden p-4 shadow-[0_0_20px_rgba(6,182,212,0.2)] flex flex-col gap-3 group hover:scale-105 transition-transform duration-300 select-none">
              <div className="h-40 w-full overflow-hidden rounded-lg relative">
                <img 
                  src={project.img} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <span className="text-xs text-cyan-400 font-mono">SYSTEM: ONLINE</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-2">{project.description}</p>
              </div>

              <div className="flex gap-3 mt-2">
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-400 rounded-lg text-sm font-bold transition-colors border border-cyan-500/30"
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag interference
                >
                  <FaExternalLinkAlt size={12} /> Demo
                </a>
                <a 
                  href={project.gitLink} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-purple-500/20 hover:bg-purple-500/40 text-purple-400 rounded-lg text-sm font-bold transition-colors border border-purple-500/30"
                  onPointerDown={(e) => e.stopPropagation()} // Prevent drag interference
                >
                  <FaGithub size={14} /> Code
                </a>
              </div>
            </div>
          </Html>
        </Billboard>
      </mesh>
    </group>
  );
};

const SolarSystem = ({ scrollProgress }) => {
  const groupRef = useRef();
  const radius = 5;

  useFrame(() => {
    if (groupRef.current) {
      // Read the current scroll progress from the ref
      const progress = scrollProgress.current || 0;
      // Rotate based on progress (0 to 1 -> 0 to 2*PI)
      const targetRotation = progress * Math.PI * 2;
      
      // Smooth rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  return (
    // Added slight tilt (0.1 rad on X) AND shifted down (-1 on Y) to center in view
    <group ref={groupRef} rotation={[0.1, 0, 0]} position={[0, -1, 0]}>
      <Sun />
      {projectsData.map((project, index) => {
        const angle = (index / projectsData.length) * 2 * Math.PI;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        return (
          <ProjectPlanet 
            key={index} 
            project={project} 
            position={[x, 0, z]}
          />
        );
      })}
    </group>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const scrollProgress = useRef(0);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Update the ref whenever scroll changes
  // We use a ref to pass the value into the Canvas without re-rendering the Canvas
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      scrollProgress.current = latest;
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="h-[200vh] w-full relative bg-transparent flex items-start justify-center">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-10">
        
        {/* Title Section - Moved OUTSIDE the 3D Container */}
        <div className="text-center mb-10 z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
            SOLAR PROJECTS
          </h2>
          <p className="text-gray-400 mt-2 font-mono text-sm">SCROLL TO EXPLORE THE SYSTEM</p>
        </div>

        {/* Holographic Tank Container */}
        <div className="w-full h-[70vh] border border-white/10 bg-slate-900/20 backdrop-blur-md rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(6,182,212,0.1)]">
          
          <Canvas camera={{ position: [0, 0, 16], fov: 50 }}>
            <ambientLight intensity={0.5} />
            {/* Pass the scroll ref to the scene */}
            <SolarSystem scrollProgress={scrollProgress} />
          </Canvas>

        </div>
      </div>
    </section>
  );
};

export default Projects;
