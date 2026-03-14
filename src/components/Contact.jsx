import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Retrieve existing notes
    const savedNotes = localStorage.getItem('portfolio-notes');
    let folders = savedNotes ? JSON.parse(savedNotes) : [];

    // Check if 'Contacts' folder exists
    let contactsFolder = folders.find(f => f.name.toLowerCase() === 'contacts');
    
    if (!contactsFolder) {
      contactsFolder = {
        id: 'contacts-' + Date.now().toString(),
        name: 'Contacts',
        notes: []
      };
      folders.push(contactsFolder);
    }

    // Add new note to the Contacts folder
    const newNote = {
      id: Date.now().toString(),
      title: `Message from ${formData.name} (${formData.email})`,
      content: formData.message,
      status: 'Under Progress'
    };

    // Update the folder structure
    folders = folders.map(folder => {
      if (folder.id === contactsFolder.id) {
        return {
          ...folder,
          notes: [newNote, ...folder.notes]
        };
      }
      return folder;
    });

    // Save back to local storage
    localStorage.setItem('portfolio-notes', JSON.stringify(folders));

    // Reset form and show success state
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-900/40 relative">
      <div className="max-w-3xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">07.</span> Get In Touch
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>

          <div className="bg-slate-950/50 p-8 rounded-2xl border border-slate-800 shadow-xl">
            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-200 mb-2">Message Sent!</h3>
                <p className="text-slate-400">Thanks for reaching out. Your message has been saved to the workspace notes.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-400">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-400">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-400">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Hello Ayushman, I'd like to talk about..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors resize-none placeholder:text-slate-600"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 py-4 px-6 rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
