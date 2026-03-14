import { motion } from 'framer-motion';
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Ayushman Tripathi</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-slate-300 mb-6">
            Software Developer
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            Specializing in React and Tailwind CSS for the frontend, leveraging Python for robust automation, and continually expanding my expertise into backend development to build cohesive, end-to-end scalable applications.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="/#projects" className="px-8 py-3 rounded-full bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/30">
              View Work
            </a>
            <a href="/#contact" className="px-8 py-3 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Me
            </a>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-slate-400">
            <a href="/#contact" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <Mail className="w-5 h-5" /> ayushmantripathi224@gmail.com
            </a>
            <a href="tel:+918318007109" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <Phone className="w-5 h-5" /> +91 8318007109
            </a>
            <a href="https://linkedin.com/in/ayushmantripathi-58b339225" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-indigo-400 transition-colors">
              <Linkedin className="w-5 h-5" /> LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
