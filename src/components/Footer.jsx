import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-slate-900 bg-slate-950 text-center text-slate-400">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="flex gap-6">
          <a href="https://linkedin.com/in/ayushmantripathi-58b339225" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="mailto:ayushmantripathi224@gmail.com" className="hover:text-indigo-400 transition-colors">
            <Mail className="w-6 h-6" />
          </a>
          <a href="#" target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">
            <Github className="w-6 h-6" />
          </a>
        </div>
        
        <p className="flex items-center justify-center gap-2 text-sm">
          Built with <Heart className="w-4 h-4 text-red-500" /> by Ayushman Tripathi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
