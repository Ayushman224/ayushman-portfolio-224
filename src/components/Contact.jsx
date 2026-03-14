import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Send, CheckCircle2, Mail, MapPin, Phone, MessageSquare, ArrowLeft } from 'lucide-react';

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const savedNotes = localStorage.getItem('portfolio-notes');
    let folders = savedNotes ? JSON.parse(savedNotes) : [];
    let contactsFolder = folders.find(f => f.name.toLowerCase() === 'contacts');
    
    if (!contactsFolder) {
      contactsFolder = { id: 'contacts-' + Date.now().toString(), name: 'Contacts', notes: [] };
      folders.push(contactsFolder);
    }

    const newNote = {
      id: Date.now().toString(),
      title: `Message from ${formData.name}`,
      metadata: `Email: ${formData.email}`,
      content: formData.message,
      status: 'Under Progress',
      timestamp: new Date().toLocaleString()
    };

    folders = folders.map(folder => {
      if (folder.id === contactsFolder.id) {
        return { ...folder, notes: [newNote, ...folder.notes] };
      }
      return folder;
    });

    localStorage.setItem('portfolio-notes', JSON.stringify(folders));
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Dynamic Ambient Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-20 bg-slate-950"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Contact Info Side */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 rounded-xl text-slate-400 hover:text-slate-200 transition-all group mb-8 w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Connect</span>
          </h1>
          <p className="text-xl text-slate-400 mb-12 max-w-md leading-relaxed">
            Have a project in mind or just want to say hi? I'm always open to discussing new opportunities and creative ideas.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Email Me</div>
                <div className="text-lg text-slate-200 font-medium">ayushmantripathi224@gmail.com</div>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-violet-400 group-hover:bg-violet-500/10 group-hover:border-violet-500/30 transition-all">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Call Me</div>
                <div className="text-lg text-slate-200 font-medium">+91 8318007109</div>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Based In</div>
                <div className="text-lg text-slate-200 font-medium">India</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Side */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="relative"
        >
          <div className="bg-slate-900/40 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <MessageSquare className="w-40 h-40" />
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center relative z-10"
              >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-8 border border-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Message sent!</h3>
                <p className="text-slate-400 text-lg">I will connect with you soon. Thank you for contacting.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-slate-700"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none placeholder:text-slate-700"
                      placeholder="Hi Ayushman, I have an inquiry about..."
                    ></textarea>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 py-5 px-8 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                  Send Transmission
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
