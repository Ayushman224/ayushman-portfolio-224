import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const Education = () => {
  const educations = [
    {
      degree: 'Bachelor of Engineering in Computer Science & Engineering',
      institution: 'Chandigarh University',
      year: '2021–2025',
      grade: 'CGPA: 7.29'
    },
    {
      degree: 'Intermediate (CBSE)',
      institution: 'RPM Public School, Gorakhpur',
      year: '2020',
      grade: ''
    },
    {
      degree: 'Matriculation (CBSE)',
      institution: 'St. Xavier’s Public School, Gorakhpur',
      year: '2018',
      grade: ''
    }
  ];

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/40 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">05.</span> Education
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>

          <div className="space-y-6">
            {educations.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-indigo-500/30 transition-colors"
              >
                <div className="flex gap-4">
                  <div className="mt-1 hidden sm:block">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-1">{edu.degree}</h3>
                    <div className="text-slate-400 font-medium">{edu.institution}</div>
                    {edu.grade && <div className="text-indigo-400 mt-2 font-mono text-sm">{edu.grade}</div>}
                  </div>
                </div>
                <div className="text-slate-500 font-mono text-sm sm:pl-16 md:pl-0 shrink-0">
                  {edu.year}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
