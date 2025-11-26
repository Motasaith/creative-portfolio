import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaRocket } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading("Transmitting signal...");

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
    .then((result) => {
      setLoading(false);
      toast.dismiss(loadingToast);
      toast.success("Signal Transmitted Successfully! 🚀");
      setForm({ name: '', email: '', message: '' });
    }, (error) => {
      setLoading(false);
      toast.dismiss(loadingToast);
      console.error('EmailJS Error:', error);
      toast.error("Transmission Failed. Check your connection.");
    });
  };

  return (
    <section id="contact" className="min-h-screen bg-transparent flex items-center justify-center p-8 md:p-20 relative overflow-hidden">
      
      {/* Nebula Background Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Purple Blob - Top Left to Bottom Right */}
        <motion.div 
          className="absolute top-[-20%] left-[-20%] w-[600px] h-[600px] bg-purple-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
          animate={{
            x: ['0%', '100%', '0%'],
            y: ['0%', '50%', '0%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Cyan Blob - Bottom Right to Top Left */}
        <motion.div 
          className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] bg-cyan-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"
          animate={{
            x: ['0%', '-100%', '0%'],
            y: ['0%', '-50%', '0%'],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="w-full max-w-4xl z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Terminal Header */}
          <div className="bg-white/5 px-4 py-3 flex items-center gap-2 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="ml-4 text-xs text-gray-400 font-mono tracking-wide">contact_protocol.exe</div>
          </div>

          {/* Terminal Body */}
          <div className="p-8 md:p-12 font-mono relative">
            <p className="text-cyan-400 mb-8 text-lg">
              <span className="text-purple-400 mr-2">➜</span> 
              <span className="text-white/80">Initialize transmission...</span>
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 group">
                  <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-cyan-400 transition-colors">Identity</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter Name"
                    className="w-full bg-transparent border-b border-gray-600 text-white focus:border-cyan-400 focus:outline-none py-3 transition-all placeholder-gray-700"
                    required
                  />
                </div>
                <div className="flex-1 group">
                  <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-cyan-400 transition-colors">Frequency (Email)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="w-full bg-transparent border-b border-gray-600 text-white focus:border-cyan-400 focus:outline-none py-3 transition-all placeholder-gray-700"
                    required
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-gray-400 text-sm mb-2 group-focus-within:text-cyan-400 transition-colors">Data Packet (Message)</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Type your message here..."
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:border-cyan-400 focus:outline-none py-3 transition-all resize-none placeholder-gray-700"
                  required
                />
              </div>

              <div className="flex justify-between items-center pt-6">
                <AnimatePresence mode='wait'>
                  <motion.button
                    key="submit"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 rounded hover:bg-cyan-500/20 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 group uppercase tracking-wider text-sm font-bold"
                  >
                    {loading ? 'Transmitting...' : 'Transmit Signal'}
                    {!loading && <FaRocket className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />}
                  </motion.button>
                </AnimatePresence>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
