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

function App() {
  return (
    <div className="min-h-screen text-white font-comic selection:bg-blue-500 selection:text-white relative">
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
