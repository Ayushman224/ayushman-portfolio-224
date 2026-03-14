import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      role: 'Associate Web Developer (Intern)',
      company: 'Rabbit Invest',
      period: 'Oct 2025 – Feb 2026',
      points: [
        'Developed and optimized a production mutual fund platform with Distributor and Customer portals using React and Tailwind CSS.',
        'Implemented core investment features including Buy Fund, Redeem, Switch Portfolio, fund filters, and real-time NAV charts via REST APIs.',
        'Worked with SQL databases to validate mutual fund data, perform ISIN-based lookups, compare datasets, and generate operational reports.',
        'Assisted in backend workflows by querying tables, fixing data inconsistencies, and supporting API integrations with database layers.',
        'Improved performance and scalability by refactoring components into reusable modules and reducing unnecessary re-renders.',
        'Enhanced UI/UX using Figma-based designs, optimized Excel report downloads, and followed Git/GitHub workflows in production releases.'
      ]
    }
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/40 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">History</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            My professional journey and impact in the software development industry.
          </p>
        </motion.div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                <div className="md:hidden absolute left-0 top-2 w-3 h-3 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <div className="md:hidden absolute left-[5px] top-5 bottom-0 w-px bg-slate-800"></div>

                <div className="md:grid md:grid-cols-[1fr_3fr] gap-8">
                  <div className="mb-4 md:mb-0 md:text-right">
                    <h3 className="text-xl font-bold text-slate-200">{exp.role}</h3>
                    <div className="text-indigo-400 font-medium text-lg mb-2">{exp.company}</div>
                    <div className="flex items-center md:justify-end gap-2 text-slate-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>
                  </div>
                  
                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-slate-700 transition-colors">
                    <ul className="space-y-4">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-3 text-slate-300 leading-relaxed">
                          <span className="text-indigo-500 mt-1 shrink-0">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default Experience;
