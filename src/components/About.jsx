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
              I am a dedicated **Software Developer** with a passion for building elegant, functional, and user-centric digital solutions. My expertise lies in crafting scalable, high-performance web applications that leverage modern front-end technologies to deliver seamless user experiences.
            </p>
            <p>
              I specialize in robust UI implementation using <span className="text-indigo-400 font-medium">React</span> and <span className="text-indigo-400 font-medium">Tailwind CSS</span>, while maintaining a strong focus on clean architecture and efficient state management. Beyond the frontend, I am proficient in <span className="text-indigo-400 font-medium">Python</span> for automation and am actively expanding my full-stack capabilities with **Node.js** and **SQL**.
            </p>
            <p>
              With a background in **Computer Science & Engineering**, I combine technical rigor with a creative approach to problem-solving. Whether it's developing real-time dashboards or implementing complex biometric security systems, I thrive on turning ideas into high-impact reality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
