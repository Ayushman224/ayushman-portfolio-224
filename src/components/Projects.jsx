import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github, Code, Layout, Cpu } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Grain Nexus',
      type: 'Full Stack E-Commerce Platform',
      role: 'Full Stack Developer',
      icon: <Layout className="w-10 h-10 text-indigo-400" />,
      description: 'Built a comprehensive full-stack marketplace connecting farmers and customers using React, Tailwind CSS, Node.js, and SQL. Converted complex Figma designs into high-fidelity reusable UI components and implemented core e-commerce features including secure authentication, product catalog, cart management, and order fulfillment workflows.',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'SQL', 'Express'],
      github: 'https://www.linkedin.com/in/ayushman-tripathi-58b339225/details/projects/',
      live: 'https://www.linkedin.com/in/ayushman-tripathi-58b339225/details/projects/'
    },
    {
      title: 'Smart Calendar & Reminder',
      type: 'Dashboard Application',
      role: 'Front-End Developer',
      icon: <Code className="w-10 h-10 text-amber-400" />,
      description: 'Developed a sophisticated task scheduling dashboard with integrated reminder features and automated email notifications using React and Node.js. Designed for high performance with clean state management and a fully responsive interface tailored from custom Figma prototypes.',
      tech: ['React', 'Tailwind CSS', 'JavaScript', 'EmailJS', 'Framer Motion'],
      github: 'https://github.com/Ayushman224/Calander-',
      live: 'https://calandar-alpha.vercel.app/'
    },
    {
      title: 'Face Recognition System',
      type: 'Computer Vision Application',
      role: 'Lead Developer',
      icon: <Cpu className="w-10 h-10 text-rose-400" />,
      description: 'Developed a high-accuracy biometric security system using Java and OpenCV to automate attendance tracking and secure monitoring. Implemented advanced facial detection algorithms including LBPH and Haar Cascade Classifiers to detect, preprocess, and identify faces in real-time environments.',
      tech: ['Java', 'OpenCV', 'JavaCV', 'LBPH', 'Haar Cascade'],
      github: 'https://www.linkedin.com/in/ayushman-tripathi-58b339225/details/projects/',
      live: 'https://www.linkedin.com/in/ayushman-tripathi-58b339225/details/projects/'
    },
    {
      title: 'CRUD Application',
      type: 'Full Stack Service',
      role: 'Full Stack Developer',
      icon: <FolderGit2 className="w-10 h-10 text-emerald-400" />,
      description: 'A robust data management portal built for dynamic inventory handling. Features high-performance database operations and a secure administrative dashboard for real-time record manipulation.',
      tech: ['React', 'Node.js', 'Express', 'SQL', 'PostgreSQL'],
      github: 'https://github.com/Ayushman224/CRUD-APPLICATION',
      live: 'https://www.linkedin.com/in/ayushman-tripathi-58b339225/details/projects/'
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-900 overflow-hidden relative">
      {/* Background flare */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/5 rounded-full blur-[140px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Projects</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A small selection of my recent works across web development, computer vision, and automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/30 border border-slate-800 rounded-[2.5rem] p-8 lg:p-10 hover:-translate-y-2 hover:bg-slate-900/50 transition-all duration-500 group relative flex flex-col h-full overflow-hidden"
            >
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 bg-slate-950/50 rounded-3xl border border-slate-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-all duration-500 transform group-hover:scale-110">
                  {project.icon}
                </div>
                <div className="flex gap-4">
                  <a href={project.github} className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300" aria-label="GitHub Repository">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href={project.live} className="p-3 bg-slate-800 rounded-2xl text-slate-400 hover:text-white hover:bg-indigo-600 transition-all duration-300" aria-label="Live Demo">
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="relative z-10 flex-grow">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-100 mb-2 group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xs font-black tracking-widest text-indigo-400 uppercase bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/10">
                    {project.type}
                  </span>
                  <span className="text-xs font-bold text-slate-500">&bull; {project.role}</span>
                </div>
                
                <p className="text-slate-400 text-lg mb-8 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {project.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto relative z-10">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-full text-xs font-bold text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
