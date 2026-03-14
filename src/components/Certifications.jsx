import { motion } from 'framer-motion';
import { Award, ShieldCheck, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'Programming in Java',
    issuer: 'Chandigarh University',
    year: '2024',
    description: 'Mastered Object-Oriented Programming (OOP), complex Data Structures, and Algorithms with practical implementation in scalable systems.',
    color: 'border-orange-500/30'
  },
  {
    title: 'Full Stack Software Development',
    issuer: 'IBM via Coursera',
    year: '2023',
    description: 'Acquired hands-on experience in full-stack architecture, specializing in front-end (React, HTML, CSS, JavaScript) and robust back-end (Node.js, SQL) technologies.',
    color: 'border-blue-500/30'
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/20 border-t border-slate-900">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Certifications</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            Validation of my technical expertise and commitment to continuous professional growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-1 rounded-[2rem] bg-gradient-to-br from-slate-800 to-transparent group hover:from-slate-700 transition-all duration-500`}
            >
              <div className={`h-full bg-slate-950/80 backdrop-blur-xl rounded-[1.9rem] p-8 border ${cert.color} group-hover:bg-slate-900 transition-all duration-500`}>
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 bg-slate-900/50 rounded-2xl text-amber-500">
                    <Award className="w-8 h-8" />
                  </div>
                  <div className="p-2 bg-slate-800/50 rounded-lg text-slate-500">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-black text-slate-100 mb-2">{cert.title}</h3>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sm font-bold text-amber-400/80">{cert.issuer}</span>
                  <span className="text-xs text-slate-600 font-mono italic">| {cert.year}</span>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-8">
                  {cert.description}
                </p>
                
                <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-slate-100 px-6 py-3 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
                  Verify Credentials
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
