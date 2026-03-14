import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderPlus, FilePlus, Folder as FolderIcon, CheckCircle2, Clock, Trash2, X, Lock } from 'lucide-react';

const Notes = () => {
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('portfolio-notes');
    if (saved) {
      return JSON.parse(saved);
    }
    return [{ id: '1', name: 'Personal Tasks', notes: [] }];
  });

  const [activeFolderId, setActiveFolderId] = useState('1');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteData, setNewNoteData] = useState({ title: '', content: '', status: 'Under Progress' });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

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
    localStorage.setItem('portfolio-notes', JSON.stringify(folders));
  }, [folders]);

  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder = {
      id: Date.now().toString(),
      name: newFolderName,
      notes: []
    };
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsAddingFolder(false);
    setActiveFolderId(newFolder.id);
  };

  const addNote = () => {
    if (!newNoteData.title.trim()) return;
    setFolders(folders.map(folder => {
      if (folder.id === activeFolderId) {
        return {
          ...folder,
          notes: [...folder.notes, { ...newNoteData, id: Date.now().toString() }]
        };
      }
      return folder;
    }));
    setNewNoteData({ title: '', content: '', status: 'Under Progress' });
    setIsAddingNote(false);
  };

  const deleteFolder = (id) => {
    const updatedFolders = folders.filter(f => f.id !== id);
    setFolders(updatedFolders);
    if (activeFolderId === id) {
      setActiveFolderId(updatedFolders.length > 0 ? updatedFolders[0].id : null);
    }
  };

  const deleteNote = (folderId, noteId) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          notes: folder.notes.filter(n => n.id !== noteId)
        };
      }
      return folder;
    }));
  };

  const toggleNoteStatus = (folderId, noteId) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          notes: folder.notes.map(n => {
            if (n.id === noteId) {
              return { ...n, status: n.status === 'Completed' ? 'Under Progress' : 'Completed' };
            }
            return n;
          })
        };
      }
      return folder;
    }));
  };

  const activeFolder = folders.find(f => f.id === activeFolderId);

  if (!isAuthenticated) {
    return (
      <section id="notes" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950 min-h-[600px] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-200">Protected Workspace</h2>
          <p className="text-slate-400 mb-8 text-sm">Please enter the password to access your notes.</p>
          
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-indigo-500 transition-colors text-center font-medium tracking-widest placeholder:tracking-normal"
                autoFocus
              />
              {authError && <p className="text-red-400 text-sm mt-3 font-medium">{authError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-colors shadow-lg shadow-indigo-600/20"
            >
              Unlock Notes
            </button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="notes" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950 relative min-h-[600px]">
      <div className="max-w-6xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 flex items-center gap-4">
            <span className="text-indigo-500 font-mono text-2xl">06.</span> Workspace Notes
            <div className="h-px bg-slate-800 flex-1 mt-2"></div>
          </h2>

          <div className="flex flex-col md:flex-row gap-0 h-[600px] bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
            {/* Sidebar - Folders */}
            <div className="w-full md:w-64 bg-slate-950/80 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shrink-0">
              <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-semibold text-slate-300">Folders</h3>
                <button 
                  onClick={() => setIsAddingFolder(true)}
                  className="p-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 rounded-md text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  <FolderPlus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
                {isAddingFolder && (
                  <div className="flex items-center gap-2 p-2 bg-slate-900 rounded-lg border border-indigo-500/50">
                    <input 
                      autoFocus
                      type="text"
                      className="w-full bg-transparent border-none text-sm text-slate-200 focus:outline-none placeholder:text-slate-600"
                      placeholder="Folder name..."
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addFolder()}
                    />
                    <button onClick={() => setIsAddingFolder(false)} className="text-slate-500 hover:text-slate-300 p-1">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                
                {folders.map(folder => (
                  <div 
                    key={folder.id}
                    className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${activeFolderId === folder.id ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' : 'text-slate-400 border border-transparent hover:bg-slate-800/80 hover:text-slate-200'}`}
                    onClick={() => setActiveFolderId(folder.id)}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FolderIcon className={`w-4 h-4 shrink-0 ${activeFolderId === folder.id ? 'fill-indigo-500/20' : ''}`} />
                      <span className="truncate text-sm font-medium">{folder.name}</span>
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }}
                      className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/10 rounded hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Area - Notes */}
            <div className="flex-1 flex flex-col bg-slate-950/20 relative">
              {activeFolder ? (
                <>
                  <div className="p-4 md:p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-md z-10">
                    <div className="flex items-center gap-3 text-slate-200">
                      <FolderIcon className="w-5 h-5 text-indigo-400 fill-indigo-400/20" />
                      <h3 className="font-bold text-lg">{activeFolder.name}</h3>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{activeFolder.notes.length} notes</span>
                    </div>
                    <button
                      onClick={() => setIsAddingNote(true)}
                      className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors text-sm font-semibold shadow-lg shadow-indigo-600/20"
                    >
                      <FilePlus className="w-4 h-4" />
                      Add Note
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 scroll-smooth">
                    {isAddingNote && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-slate-900 border border-indigo-500/30 rounded-xl p-5 mb-6 shadow-2xl"
                      >
                        <input
                          autoFocus
                          type="text"
                          placeholder="Task or Note Title"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 mb-4 text-slate-200 focus:outline-none focus:border-indigo-500 font-semibold"
                          value={newNoteData.title}
                          onChange={(e) => setNewNoteData({...newNoteData, title: e.target.value})}
                        />
                        <textarea
                          placeholder="Note descriptions, details, or checklists..."
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 mb-4 text-slate-300 focus:outline-none focus:border-indigo-500 min-h-[120px] resize-y text-sm leading-relaxed"
                          value={newNoteData.content}
                          onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})}
                        />
                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-slate-400">Status:</span>
                            <select 
                              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 focus:outline-none focus:border-indigo-500"
                              value={newNoteData.status}
                              onChange={(e) => setNewNoteData({...newNoteData, status: e.target.value})}
                            >
                              <option value="Under Progress">Under Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                          
                          <div className="flex gap-3 w-full sm:w-auto">
                            <button 
                              onClick={() => setIsAddingNote(false)}
                              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors flex-1 sm:flex-none"
                            >
                              Cancel
                            </button>
                            <button 
                              onClick={addNote}
                              className="px-6 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors flex-1 sm:flex-none shadow-lg shadow-indigo-600/20"
                            >
                              Save Task
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <AnimatePresence>
                        {activeFolder.notes.map(note => (
                          <motion.div
                            key={note.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            layout
                            className={`border rounded-xl p-5 group transition-all duration-300 flex flex-col shadow-lg
                              ${note.status === 'Completed' 
                                ? 'bg-slate-900/50 border-emerald-500/20 hover:border-emerald-500/40' 
                                : 'bg-slate-900/90 border-slate-700 hover:border-indigo-500/50'
                              }`}
                          >
                            <div className="flex justify-between items-start mb-3 gap-4">
                              <h4 className={`font-semibold text-lg ${note.status === 'Completed' ? 'text-slate-400 line-through decoration-slate-600' : 'text-slate-100'}`}>
                                {note.title}
                              </h4>
                              <button 
                                onClick={() => deleteNote(activeFolder.id, note.id)}
                                className="text-slate-500 bg-slate-800/50 hover:bg-red-500/10 p-1.5 rounded-md hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            
                            <p className={`text-sm mb-6 whitespace-pre-wrap flex-1 leading-relaxed ${note.status === 'Completed' ? 'text-slate-500' : 'text-slate-300'}`}>
                              {note.content}
                            </p>
                            
                            <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 mt-auto">
                              <button
                                onClick={() => toggleNoteStatus(activeFolder.id, note.id)}
                                className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                                  note.status === 'Completed' 
                                    ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 ring-1 ring-emerald-500/20 hover:ring-emerald-500/40' 
                                    : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 ring-1 ring-amber-500/20 hover:ring-amber-500/40'
                                }`}
                              >
                                {note.status === 'Completed' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                                {note.status}
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      
                      {!isAddingNote && activeFolder.notes.length === 0 && (
                        <div className="col-span-full py-20 text-center flex flex-col items-center justify-center text-slate-500">
                          <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-4">
                            <FolderIcon className="w-8 h-8 opacity-40 text-indigo-400" />
                          </div>
                          <p className="font-medium text-slate-400">No notes in this folder yet</p>
                          <p className="text-sm mt-2 opacity-80">Click the "Add Note" button to start populating this workspace.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-500">
                  <FolderIcon className="w-16 h-16 mb-4 opacity-20" />
                  <p>Select or create a folder to view notes</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Notes;
