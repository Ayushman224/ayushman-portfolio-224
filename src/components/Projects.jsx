import { motion } from 'framer-motion';
import { FolderGit2, ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Grain Nexus',
      type: 'Full Stack E-Commerce Platform',
      role: 'Full Stack Developer',
      description: 'Built a comprehensive full-stack marketplace designed to bridge the gap between farmers and customers, aiming to streamline agricultural commerce.',
      tech: ['React', 'Tailwind CSS', 'Node.js', 'SQL'],
      github: '#',
      live: '#'
    },
    {
      title: 'Calendar with Remainder',
      type: 'Web Application',
      role: 'Front-End Developer',
      description: 'A feature-rich calendar application with built-in remainder functionality. Ensures efficient scheduling with an intuitive user interface.',
      tech: ['React', 'Tailwind CSS', 'JavaScript'],
      github: 'https://github.com/Ayushman224/Calander-',
      live: 'https://calandar-alpha.vercel.app/'
    },
    {
      title: 'CRUD Application',
      type: 'Full Stack Application',
      role: 'Full Stack Developer',
      description: 'A comprehensive CRUD application designed for dynamic data handling, smooth database operations, and user management.',
      tech: ['React', 'Node.js', 'Express', 'SQL'],
      github: 'https://github.com/Ayushman224/CRUD-APPLICATION',
      live: '#'
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">04.</span> Featured Projects
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 group shadow-lg shadow-black/20"
              >
                <div className="flex justify-between items-center mb-6">
                  <FolderGit2 className="w-10 h-10 text-indigo-400 group-hover:text-violet-400 transition-colors" />
                  <div className="flex gap-4">
                    <a href={project.github} className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="GitHub Repository">
                      <Github className="w-6 h-6" />
                    </a>
                    <a href={project.live} className="text-slate-400 hover:text-indigo-400 transition-colors" aria-label="Live Demo">
                      <ExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-slate-200 mb-2 group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <div className="text-sm text-indigo-400 mb-4 font-medium">{project.type} &bull; {project.role}</div>
                
                <p className="text-slate-400 mb-6 line-clamp-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="text-slate-300 text-sm flex flex-wrap gap-x-4 gap-y-2 font-mono mt-auto">
                  {project.tech.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
