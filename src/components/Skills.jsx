import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'JavaScript', 'Python', 'SQL', 'HTML5', 'CSS3']
  },
  {
    title: 'Frameworks & Backend',
    skills: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'OpenCV']
  },
  {
    title: 'Tools & Automation',
    skills: ['Python Automation Scripts', 'Git & GitHub', 'REST APIs', 'Linux', 'VS Code']
  },
  {
    title: 'Design & Architecture',
    skills: ['Figma', 'Responsive Design', 'Component-Based Architecture']
  },
  {
    title: 'Soft Skills',
    skills: ['Problem Solving', 'Communication', 'Adaptability', 'Team Collaboration']
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">02.</span> Technical Skills
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-indigo-500/50 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-4 text-indigo-400">{category.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, sIndex) => (
                    <span 
                      key={sIndex} 
                      className="px-3 py-1 bg-slate-950 text-slate-300 rounded-full text-sm border border-slate-800"
                    >
                      {skill}
                    </span>
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

export default Skills;
