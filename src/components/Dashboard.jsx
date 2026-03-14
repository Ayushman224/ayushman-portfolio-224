import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Upload, Download, Trash2, CheckCircle2, 
  ArrowLeft, Lock, Mail, User, Clock, MessageSquare,
  LayoutDashboard, ShieldCheck
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [resumeUrl, setResumeUrl] = useState(() => localStorage.getItem('portfolio-resume-url') || '');
  const [resumeName, setResumeName] = useState(() => localStorage.getItem('portfolio-resume-name') || '');
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('portfolio-contacts');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState('resume'); // 'resume' or 'contacts'

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === 'notes') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password');
      setPasswordInput('');
    }
  };

  useEffect(() => {
    localStorage.setItem('portfolio-resume-url', resumeUrl);
    localStorage.setItem('portfolio-resume-name', resumeName);
  }, [resumeUrl, resumeName]);

  useEffect(() => {
    localStorage.setItem('portfolio-contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setResumeUrl(event.target.result);
      setResumeName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setResumeUrl('');
    setResumeName('');
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800 shadow-2xl max-w-md w-full text-center backdrop-blur-xl"
        >
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-black mb-2 text-white uppercase tracking-tighter">Admin Control</h2>
          <p className="text-slate-400 mb-8 text-sm font-medium">Authentication required to access management tools.</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              placeholder="Enter Access Key"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-center font-bold tracking-[0.3em]"
              autoFocus
            />
            {authError && <p className="text-red-400 text-sm font-bold">{authError}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-indigo-600/20"
            >
              Authorize
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
              <LayoutDashboard className="w-10 h-10 text-indigo-500" />
              Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">Hub</span>
            </h1>
            <p className="text-slate-500 font-medium mt-2 uppercase tracking-widest text-xs">Resume & Contact Administration</p>
          </div>
          
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-2xl text-slate-300 transition-all group font-bold"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Exit to Home
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 space-y-2">
            <button 
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'resume' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-900 border border-slate-800'}`}
            >
              <FileText className="w-5 h-5" />
              Resume Mgmt
            </button>
            <button 
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl font-bold transition-all ${activeTab === 'contacts' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900/50 text-slate-400 hover:bg-slate-900 border border-slate-800'}`}
            >
              <Mail className="w-5 h-5" />
              Inquiries
              <span className="ml-auto bg-slate-950/50 px-2 py-0.5 rounded-full text-[10px]">{contacts.length}</span>
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {activeTab === 'resume' ? (
                <motion.div 
                  key="resume"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center"
                >
                  <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-indigo-500/20">
                    <FileText className="w-10 h-10 text-indigo-400" />
                  </div>
                  <h2 className="text-3xl font-black text-white mb-4 uppercase">Resume Portal</h2>
                  <p className="text-slate-400 mb-12 max-w-sm mx-auto leading-relaxed">Your uploaded resume will be instantly accessible for download on the main portfolio page.</p>

                  <div className="max-w-md mx-auto">
                    {resumeUrl ? (
                      <div className="space-y-6">
                        <div className="p-6 bg-slate-950 border border-emerald-500/20 rounded-3xl flex items-center gap-5">
                          <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
                            <CheckCircle2 className="w-6 h-6" />
                          </div>
                          <div className="flex-1 text-left overflow-hidden">
                            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live Asset</div>
                            <div className="text-slate-200 font-bold truncate">{resumeName}</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <a 
                            href={resumeUrl} 
                            download={resumeName}
                            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 py-4 rounded-2xl transition-all font-black uppercase text-xs tracking-widest"
                          >
                            <Download className="w-4 h-4" /> Preview
                          </a>
                          <button 
                            onClick={removeResume}
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 py-4 rounded-2xl transition-all font-black uppercase text-xs tracking-widest border border-red-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-800 hover:border-indigo-500/50 rounded-[2.5rem] p-16 cursor-pointer transition-all group bg-slate-950/30">
                        <Upload className="w-14 h-14 text-slate-700 group-hover:text-indigo-500 mb-6 transition-colors" />
                        <span className="text-slate-400 font-black uppercase tracking-widest text-xs">Deploy New Resume</span>
                        <input 
                          type="file" 
                          accept=".pdf,.doc,.docx" 
                          className="hidden" 
                          onChange={handleResumeUpload}
                        />
                      </label>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="contacts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Client Inquiries</h2>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">{contacts.length} Total</span>
                  </div>

                  {contacts.length === 0 ? (
                    <div className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-16 text-center">
                      <div className="w-20 h-20 bg-slate-800/50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Mail className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">No transmissions received yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-4">
                      {contacts.map((contact) => (
                        <motion.div 
                          layout
                          key={contact.id}
                          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:border-indigo-500/30 transition-all group"
                        >
                          <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-4 flex-1">
                              <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                                  <User className="w-3.5 h-3.5 text-indigo-400" />
                                  <span className="text-sm font-bold text-slate-200">{contact.name}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                                  <Mail className="w-3.5 h-3.5 text-violet-400" />
                                  <span className="text-sm font-bold text-slate-400">{contact.email}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                                  <span className="text-xs font-bold text-slate-500">{contact.timestamp}</span>
                                </div>
                              </div>
                              
                              <div className="bg-slate-950/50 p-5 rounded-2xl border border-slate-800/50 relative">
                                <MessageSquare className="absolute top-4 right-4 w-4 h-4 text-slate-800 pointer-events-none" />
                                <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-wrap">{contact.message}</p>
                              </div>
                            </div>
                            
                            <div className="flex md:flex-col justify-end gap-2">
                              <button 
                                onClick={() => deleteContact(contact.id)}
                                className="p-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-2xl transition-all border border-red-500/10"
                                title="Delete Transmission"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
