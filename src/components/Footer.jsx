import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="text-xl font-black tracking-tighter text-white mb-2">
            AYUSHMAN<span className="text-indigo-500">.</span>
          </div>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
            Software Developer
          </p>
        </div>
        
        <div className="flex gap-8 items-center">
          <a href="https://linkedin.com/in/ayushmantripathi-58b339225" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:ayushmantripathi224@gmail.com" className="text-slate-400 hover:text-indigo-400 transition-colors">
            <Mail className="w-5 h-5" />
          </a>
          <a href="https://github.com/Ayushman224" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-indigo-400 transition-colors">
            <Github className="w-5 h-5" />
          </a>
        </div>
        
        <div className="text-slate-500 text-xs font-mono">
          &copy; {new Date().getFullYear()} &bull; Built with React & Vite
        </div>
      </div>
    </footer>
  );
};

export default Footer;
