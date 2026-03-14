import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/40 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">01.</span> About Me
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>
          
          <div className="text-lg text-slate-300 leading-relaxed space-y-6">
            <p>
              I am a dedicated Software Developer with a strong foundation in modern technologies. My expertise initially grew around crafting scalable, high-performance front-end web applications, but I have since expanded my horizons into building robust automated workflows and backend systems.
            </p>
            <p>
              While I specialize in clean UI implementation using <span className="text-indigo-400 font-medium">React</span> and <span className="text-indigo-400 font-medium">Tailwind CSS</span>, I am also deeply engaged in writing <span className="text-indigo-400 font-medium">Python</span> automation scripts to streamline processes. Additionally, I am actively learning and applying backend development (such as Node.js and SQL architectures) to construct seamless, full-stack ecosystems.
            </p>
            <p>
              I am passionate about problem-solving, writing clean and maintainable code, and continuously adapting to new challenges in the ever-evolving tech landscape. Let's work together to build something amazing!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
