import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Workflow, 
  Settings, 
  UserCircle2,
  Database,
  Monitor
} from 'lucide-react';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: <Terminal className="w-5 h-5" />,
    skills: [
      { name: 'Java', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
      { name: 'JavaScript', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
      { name: 'Python', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      { name: 'SQL', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
      { name: 'HTML5', color: 'bg-red-500/10 text-red-500 border-red-500/20' },
      { name: 'CSS3', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' }
    ]
  },
  {
    title: 'Frameworks & Backend',
    icon: <Layers className="w-5 h-5" />,
    skills: [
      { name: 'React', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
      { name: 'Tailwind CSS', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
      { name: 'Node.js', color: 'bg-green-600/10 text-green-500 border-green-600/20' },
      { name: 'Express.js', color: 'bg-slate-500/10 text-slate-300 border-slate-500/20' },
      { name: 'OpenCV', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
    ]
  },
  {
    title: 'Tools & Automation',
    icon: <Workflow className="w-5 h-5" />,
    skills: [
      { name: 'Git & GitHub', color: 'bg-slate-100/10 text-slate-200 border-slate-100/20' },
      { name: 'REST APIs', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
      { name: 'Linux', color: 'bg-orange-600/10 text-orange-500 border-orange-600/20' },
      { name: 'Figma', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      { name: 'VS Code', color: 'bg-blue-600/10 text-blue-500 border-blue-600/20' }
    ]
  }
];

const SkillMarquee = ({ skills, direction = 1 }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills]; // Duplicate for smooth looping

  return (
    <div className="flex overflow-hidden py-4 select-none group relative">
      <motion.div
        animate={{
          x: direction > 0 ? [0, -1000] : [-1000, 0]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: 25,
            ease: "linear",
          },
        }}
        className="flex gap-6 whitespace-nowrap"
      >
        {duplicatedSkills.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-opacity-20 ${skill.color}`}
          >
            <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
            <span className="font-bold tracking-wide">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950 relative overflow-hidden">
      {/* Dynamic background element */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-600/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-violet-500">Expertise</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            A comprehensive suite of technologies I leverage to build scalable, high-performance applications and automated systems.
          </p>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6 px-4">
                <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-200 tracking-wide uppercase text-sm">
                  {category.title}
                </h3>
              </div>
              <SkillMarquee skills={category.skills} direction={idx % 2 === 0 ? 1 : -1} />
            </motion.div>
          ))}
        </div>
        
        {/* Soft Skills & Others */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-violet-500/10 rounded-2xl text-violet-400 group-hover:scale-110 transition-transform">
                <UserCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Problem Solving', 'Communication', 'Adaptability', 'Team Collaboration'].map((s, i) => (
                <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-sm font-medium hover:text-indigo-400 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 group-hover:scale-110 transition-transform">
                <Monitor className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-100">Design & UX</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Figma', 'Responsive Design', 'Component-Based Architecture', 'UI/UX Prototyping'].map((s, i) => (
                <span key={i} className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-300 text-sm font-medium hover:text-emerald-400 transition-colors cursor-default">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
