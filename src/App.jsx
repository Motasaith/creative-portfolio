import React from 'react';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StarfieldBackground from './components/StarfieldBackground';
import About from './components/About';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';

import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Preloader from './components/Preloader';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen text-white tracking-tight selection:bg-blue-500 selection:text-white relative">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#1e1e2e',
            color: '#fff',
            border: '1px solid #3b82f6',
          },
          success: {
            iconTheme: {
              primary: '#06b6d4',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <StarfieldBackground />
      <Header />
      <Sidebar />
      <BackToTop />
      
      {/* Main Content Wrapper to offset Sidebar on desktop */}
      <main className="md:pl-20 relative z-10">
        <Hero />
        <About />
        <div id="projects">
          <Projects />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="contact">
          <Contact />
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default App;
