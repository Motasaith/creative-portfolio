import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { FaReact, FaNodeJs, FaPython, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiThreedotjs, SiJavascript, SiTypescript } from 'react-icons/si';

const skillsData = [
  { name: "React", icon: FaReact, color: "#61DAFB", level: "Advanced" },
  { name: "Node.js", icon: FaNodeJs, color: "#339933", level: "Advanced" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248", level: "Intermediate" },
  { name: "Express", icon: SiExpress, color: "#000000", level: "Intermediate" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#38B2AC", level: "Advanced" },
  { name: "Three.js", icon: SiThreedotjs, color: "#000000", level: "Intermediate" },
  { name: "Git", icon: FaGitAlt, color: "#F05032", level: "Advanced" },
  { name: "Python", icon: FaPython, color: "#3776AB", level: "Intermediate" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", level: "Expert" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", level: "Advanced" },
];

const Skills = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [constraints, setConstraints] = useState(null);
  const [scene, setScene] = useState(null);
  
  // Refs for managing DOM elements sync
  const bubbleRefs = useRef([]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const Engine = Matter.Engine,
          Render = Matter.Render,
          World = Matter.World,
          Bodies = Matter.Bodies,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint,
          Runner = Matter.Runner;

    const engine = Engine.create();
    const world = engine.world;

    // Zero Gravity
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Create Renderer (Invisible, just for mouse interaction mostly)
    const render = Render.create({
      element: containerRef.current,
      canvas: canvasRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        showAngleIndicator: false
      }
    });

    // Create Walls
    const wallOptions = { 
      isStatic: true, 
      render: { visible: false },
      restitution: 0.8 
    };
    const walls = [
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // Top
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // Bottom
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions), // Right
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions) // Left
    ];
    World.add(world, walls);

    // Create Skill Bubbles
    const bubbles = skillsData.map((skill, index) => {
      const radius = 60; // Bubble radius
      const x = Math.random() * (width - radius * 2) + radius;
      const y = Math.random() * (height - radius * 2) + radius;
      
      const body = Bodies.circle(x, y, radius, {
        restitution: 0.9, // Bouncy
        friction: 0.005,
        frictionAir: 0.02, // Air resistance to slow down eventually
        density: 0.04,
        render: { visible: false } // We render via React
      });

      // Add initial random velocity
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
      });

      return { body, index };
    });

    World.add(world, bubbles.map(b => b.body));

    // Mouse Control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the engine
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    // Sync Loop
    let animationFrameId;
    const updateLoop = () => {
      bubbles.forEach(({ body, index }) => {
        const bubbleEl = bubbleRefs.current[index];
        if (bubbleEl) {
          const { x, y } = body.position;
          const angle = body.angle;
          // Sync DOM position
          bubbleEl.style.transform = `translate(${x - 60}px, ${y - 60}px) rotate(${angle}rad)`;
        }
      });
      animationFrameId = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    // Cleanup
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      cancelAnimationFrame(animationFrameId);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <section id="skills" className="min-h-screen w-full bg-transparent relative flex flex-col items-center justify-center overflow-hidden py-20">
      <div className="text-center mb-10 z-10 pointer-events-none">
        <h2 className="text-5xl md:text-7xl font-bold text-white font-comic mb-4">Tech Stack</h2>
        <p className="text-xl text-blue-400 font-light">Zero-Gravity Arsenal</p>
      </div>

      {/* Physics Container */}
      <div 
        ref={containerRef} 
        className="relative w-full max-w-6xl h-[60vh] border border-white/5 rounded-3xl bg-white/5 backdrop-blur-sm overflow-hidden"
      >
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-auto z-10"
        />

        {/* React Bubbles (Synced to Physics) */}
        {skillsData.map((skill, index) => (
          <div
            key={index}
            ref={el => bubbleRefs.current[index] = el}
            className="absolute top-0 left-0 w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center pointer-events-none z-20 group"
            style={{ willChange: 'transform' }}
          >
            {/* Glass Bubble Visual */}
            <div className={`w-full h-full rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:shadow-[0_0_30px_${skill.color}]`}>
              <skill.icon className="text-5xl text-white drop-shadow-lg transition-colors duration-300" style={{ color: skill.color }} />
            </div>
            
            {/* Tooltip/Label */}
            <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center">
              <span className="text-white font-bold text-sm bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm border border-white/10">
                {skill.name}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-gray-500 text-sm animate-pulse pointer-events-none">
        Grab and throw the bubbles!
      </div>
    </section>
  );
};

export default Skills;
