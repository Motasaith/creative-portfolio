import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0f0f1a] border-t border-white/10 pt-16 pb-8 px-6 md:px-20 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        
        {/* Left: Logo & Copyright */}
        <div className="md:w-1/3">
          <div className="text-2xl font-bold font-comic text-white tracking-tighter mb-4">
            Abdul Rauf <span className="text-blue-500">Azhar</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Crafting digital experiences with passion and precision. 
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right: Contact Info */}
        <div className="md:w-1/3 flex flex-col gap-4">
          <h3 className="text-lg font-bold text-white mb-2">Contact Info</h3>
          
          <div className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group cursor-pointer">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Phone size={18} />
            </div>
            <span>+92 336-3855120</span>
          </div>

          <a href="mailto:abdulrauf.azhar@proton.me" className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group cursor-pointer">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <Mail size={18} />
            </div>
            <span>abdulrauf.azhar@proton.me</span>
          </a>

          <div className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group cursor-pointer">
            <div className="p-2 bg-white/5 rounded-lg group-hover:bg-blue-500/20 transition-colors">
              <MapPin size={18} />
            </div>
            <span>Street # 02, Rahim Garden, RYK, Punjab, Pakistan</span>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        Designed & Built by Abdul Rauf Azhar
      </div>
    </footer>
  );
};

export default Footer;
