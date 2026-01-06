import React, { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const projectsData = [
  {
    title: "E-commerce Store",
    description: "A full-featured MERN stack e-commerce platform with product management, user authentication, and a streamlined checkout process. Solved complex state management challenges with Redux Toolkit.",
    img: "/project1.png",
    liveLink: "https://mern-ecommerce-xi-dusky-60.vercel.app/",
    gitLink: "https://github.com/Motasaith/mern-ecommerce",
  },
  {
    title: "Blog Site",
    description: "A dynamic blog platform built with the MERN stack, featuring a rich text editor, user comments, and an admin dashboard for content management. Focused on a clean, readable UI and SEO optimization.",
    img: "/project2.png",
    liveLink: "https://abdul-blog-client.vercel.app/",
    gitLink: "https://github.com/Motasaith/AbdulBlog",
  },
  {
    title: "Smart Weather App",
    description: "A responsive frontend-only weather application with real-time weather data, beautiful UI, and interactive temperature graphs. Built using modern JavaScript tools and free APIs, this app delivers local forecasts with precision and style.",
    img: "/project3.png",
    liveLink: "https://motasaith.github.io/Weather-App/",
    gitLink: "https://github.com/Motasaith/Weather-App",
  },
  {
    title: "Policy Management System",
    description: "A comprehensive MERN stack application for managing company policies. It includes version control for policies, user access levels, and an intuitive interface for policy creation and updates.",
    img: "/project4.png",
    liveLink: "https://policy-management-app-egls.vercel.app/",
    gitLink: "https://github.com/Motasaith/policy-management-app",
  },
  {
    title: "Smart To-Do List",
    description: "A feature-rich task manager that lets users add, update, delete, and complete tasks with real-time reminder alerts, sound notifications, and persistent data using localStorage. Built with only HTML, CSS, and JavaScript for maximum accessibility.",
    img: "/project5.png",
    liveLink: "https://motasaith.github.io/Smart-TO-DO-List/",
    gitLink: "https://github.com/motasaith/Smart-TO-DO-List",
  },
  {
    title: "Professional Image BG Removal",
    description: "Intelligent Background Remover API using FastAPI & Docker. Auto-switches between AI and Color Keying for perfect results on both photos and logos.",
    img: "/project6.png",
    liveLink: "http://167.88.43.163:8000/docs",
    gitLink: "https://github.com/Motasaith/image-bg-remover",
  },
  {
    title: "AI IMAGE RESTORATION (IMAGE UPSCALER)",
    description: "Production-grade AI Image Restoration engine using Real-ESRGAN & GFPGAN. Features 4x upscaling, face enhancement, denoising, and batch processing via a FastAPI backend and modern Dashboard. Docker-ready for VPS deployment.",
    img: "/project7.png",
    liveLink: "http://167.88.43.163:8001/docs",
    gitLink: "https://github.com/Motasaith/ai-image-restorer",
  },
];

const ProjectCard = ({ project }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState(false);
  const descriptionRef = useRef(null);

  React.useEffect(() => {
    if (project.description.length > 120) {
      setShowReadMore(true);
    }
  }, [project.description]);

  return (
    <div 
      className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col group hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300 w-full max-w-[350px] mx-auto h-[440px]"
    >
      <div className="h-[180px] w-full overflow-hidden relative shrink-0">
        <img 
          src={project.img} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs text-cyan-400 font-mono font-bold tracking-wider">VIEW DETAILS</span>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1 min-h-0 relative">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors shrink-0">{project.title}</h3>
        
        <div className="flex-1 min-h-0 relative mb-4">
          <motion.div 
            className={`text-sm text-gray-300 leading-relaxed pr-2 ${isExpanded ? 'overflow-y-auto' : 'overflow-hidden'} blue-scrollbar transition-all`}
            initial={false}
            animate={{ height: isExpanded ? "100%" : "4.5em" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            ref={descriptionRef}
          >
             {project.description}
          </motion.div>
          
          {!isExpanded && showReadMore && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-slate-900/90 to-transparent pointer-events-none" />
          )}
        </div>

        {showReadMore && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-bold mb-3 self-start shrink-0 flex items-center gap-1 transition-colors"
          >
            {isExpanded ? "Read Less" : "Read More..."}
          </button>
        )}
        
        <div className="flex gap-3 mt-auto shrink-0">
          <a 
            href={project.liveLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg text-xs font-bold transition-all border border-cyan-500/20 hover:border-cyan-500/50"
          >
            <FaExternalLinkAlt size={12} /> Live Demo
          </a>
          <a 
            href={project.gitLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 rounded-lg text-xs font-bold transition-all border border-purple-500/20 hover:border-purple-500/50"
          >
            <FaGithub size={14} /> Code
          </a>
        </div>
      </div>

    </div>
  );
};

const Projects = () => {
  return (
    <section className="py-20 w-full relative min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-[0_0_10px_rgba(6,182,212,0.3)] mb-4">
              FEATURED PROJECTS
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base">
              Explore a collection of my recent work, ranging from full-stack web applications to AI-powered interactions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {projectsData.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
