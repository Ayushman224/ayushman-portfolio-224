import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FolderPlus, FilePlus, Folder as FolderIcon, CheckCircle2, Clock, Trash2, X, Lock, ArrowLeft,
  FileText, Upload, Download, Mail, User, MessageSquare, LayoutDashboard, ShieldCheck,
  ChevronRight, Settings, Bell, BellRing, Calendar, Menu, Info, MousePointer2, Plus,
  Pause, Play, Square, Edit2, Save, Import
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

// pdfjs worker setup
const pdfVersion = '5.5.207'; 
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfVersion}/build/pdf.worker.min.mjs`;

const Notes = () => {
  const navigate = useNavigate();
  
  // Notes State
  const [folders, setFolders] = useState(() => {
    const saved = localStorage.getItem('portfolio-notes');
    return saved ? JSON.parse(saved) : [{ id: '1', name: 'Personal Tasks', notes: [] }];
  });
  const [activeFolderId, setActiveFolderId] = useState('1');
  const [isAddingFolder, setIsAddingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [newNoteData, setNewNoteData] = useState({ title: '', content: '', status: 'Under Progress', time: '', subtasks: [] });

  // Digital Notebook State
  const [noteSections, setNoteSections] = useState(() => {
    const saved = localStorage.getItem('portfolio-notebook');
    return saved ? JSON.parse(saved) : [{ id: '1', name: 'General Notes', notes: [] }];
  });
  const [activeSectionId, setActiveSectionId] = useState('1');
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [isAddingPlainNote, setIsAddingPlainNote] = useState(false);
  const [newPlainNoteData, setNewPlainNoteData] = useState({ title: '', content: '' });
  const [editingPlainNoteId, setEditingPlainNoteId] = useState(null);

  // Mobile Sidebar State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);

  // Notification State
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [processedAlerts, setProcessedAlerts] = useState(() => {
    const saved = localStorage.getItem('portfolio-processed-alerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [notificationPermission, setNotificationPermission] = useState(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );

  // Work Timer State
  const [activeWorkTaskId, setActiveWorkTaskId] = useState(() => localStorage.getItem('active-work-task-id') || null);
  const [isTimerPaused, setIsTimerPaused] = useState(() => localStorage.getItem('is-timer-paused') === 'true');
  const [workStartTime, setWorkStartTime] = useState(() => {
    const saved = localStorage.getItem('work-start-time');
    return saved && saved !== "null" ? parseInt(saved) : null;
  });
  const [accumulatedSessionTime, setAccumulatedSessionTime] = useState(() => {
    const saved = localStorage.getItem('accumulated-session-time');
    return saved ? parseInt(saved) : 0;
  });
  const [elapsedSessionTime, setElapsedSessionTime] = useState(0);

  // Helper: Format Duration (ms to H:m:s)
  const formatDuration = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
  };

  // Helper: Detect and highlight links in text
  const renderContentWithLinks = (content) => {
    if (!content) return null;
    
    const boldRegex = /\*\*(.*?)\*\*/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Split by URLs first
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      if (urlRegex.test(part)) {
        return (
          <div key={`link-wrapper-${index}`} className="my-3 p-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl group/link transition-all hover:bg-indigo-500/10">
            <div className="flex items-center gap-2 mb-1.5">
              <Play className="w-3 h-3 text-indigo-400" />
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">External Resource</span>
            </div>
            <a
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-indigo-300 underline underline-offset-4 decoration-indigo-500/30 font-bold transition-all break-all text-xs"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          </div>
        );
      }
      
      // Handle bold text in the non-link parts
      const boldParts = part.split(boldRegex);
      return boldParts.map((bp, bi) => {
        if (bi % 2 === 1) {
          if (bp === "RESOURCE:") return null; // Hide the marker as we use the wrapper
          return <strong key={`bold-${index}-${bi}`} className="text-white font-black">{bp}</strong>;
        }
        return bp;
      });
    });
  };

  // Timer Effect
  useEffect(() => {
    let interval;
    if (activeWorkTaskId && workStartTime && !isTimerPaused) {
      interval = setInterval(() => {
        setElapsedSessionTime(accumulatedSessionTime + (Date.now() - workStartTime));
      }, 1000);
    } else {
      setElapsedSessionTime(accumulatedSessionTime);
    }
    return () => clearInterval(interval);
  }, [activeWorkTaskId, workStartTime, isTimerPaused, accumulatedSessionTime]);

  // Persist Timer
  useEffect(() => {
    if (activeWorkTaskId) {
      localStorage.setItem('active-work-task-id', activeWorkTaskId);
      localStorage.setItem('work-start-time', workStartTime ? workStartTime.toString() : "null");
      localStorage.setItem('is-timer-paused', isTimerPaused.toString());
      localStorage.setItem('accumulated-session-time', accumulatedSessionTime.toString());
    } else {
      localStorage.removeItem('active-work-task-id');
      localStorage.removeItem('work-start-time');
      localStorage.removeItem('is-timer-paused');
      localStorage.removeItem('accumulated-session-time');
    }
  }, [activeWorkTaskId, workStartTime, isTimerPaused, accumulatedSessionTime]);

  const startWorkSession = (taskId) => {
    if (activeWorkTaskId) stopWorkSession();
    setActiveWorkTaskId(taskId);
    setWorkStartTime(Date.now());
    setIsTimerPaused(false);
    setAccumulatedSessionTime(0);
  };

  const pauseWorkSession = () => {
    if (!activeWorkTaskId || isTimerPaused) return;
    setAccumulatedSessionTime(prev => prev + (Date.now() - workStartTime));
    setWorkStartTime(null);
    setIsTimerPaused(true);
  };

  const resumeWorkSession = () => {
    if (!activeWorkTaskId || !isTimerPaused) return;
    setWorkStartTime(Date.now());
    setIsTimerPaused(false);
  };

  const stopWorkSession = () => {
    if (!activeWorkTaskId) return;
    
    const finalElapsed = isTimerPaused ? accumulatedSessionTime : accumulatedSessionTime + (Date.now() - workStartTime);
    setFolders(prev => prev.map(folder => ({
      ...folder,
      notes: folder.notes.map(note => {
        if (note.id === activeWorkTaskId) {
          return { ...note, totalWorkTime: (note.totalWorkTime || 0) + finalElapsed };
        }
        return note;
      })
    })));

    setActiveWorkTaskId(null);
    setWorkStartTime(null);
    setIsTimerPaused(false);
    setAccumulatedSessionTime(0);
    setElapsedSessionTime(0);
  };

  // Dashboard State (Internalized)
  const FALLBACK_RESUME_URL = "https://drive.google.com/file/d/1ylW-F0XY-2A4fm2cT6GkBnnLQjX8YryR/view?usp=drive_link";
  const [resumeUrl, setResumeUrl] = useState(() => localStorage.getItem('portfolio-resume-url') || FALLBACK_RESUME_URL);
  const [resumeName, setResumeName] = useState(() => localStorage.getItem('portfolio-resume-name') || 'Ayushman_Resume.pdf');
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('portfolio-contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('tasks');

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Persist Data
  useEffect(() => {
    localStorage.setItem('portfolio-notes', JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem('portfolio-resume-url', resumeUrl);
    localStorage.setItem('portfolio-resume-name', resumeName);
  }, [resumeUrl, resumeName]);

  useEffect(() => {
    localStorage.setItem('portfolio-contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('portfolio-processed-alerts', JSON.stringify(processedAlerts));
  }, [processedAlerts]);

  useEffect(() => {
    localStorage.setItem('portfolio-notebook', JSON.stringify(noteSections));
  }, [noteSections]);

  // System Notification Handler
  const requestNotificationPermission = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications");
      return;
    }

    Notification.requestPermission().then((permission) => {
      setNotificationPermission(permission);
    });
  };

  const triggerSystemNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body: body,
        icon: "/favicon.ico",
      });
    }
  };

  // Notification Logic - Double Alert System (Instant + 30 Min Snooze)
  useEffect(() => {
    const checkTasks = () => {
      const now = new Date().getTime();
      
      folders.forEach(folder => {
        folder.notes.forEach(note => {
          if (note.time && note.status !== 'Completed') {
            
            // NEW: Silence notifications if we are actively working on this specific project
            if (activeWorkTaskId === note.id) return;

            const taskTime = new Date(note.time).getTime();
            const alertData = processedAlerts.find(a => a.id === note.id);

            // Logic for triggering alerts
            let shouldTrigger = false;
            let newAlertObject = null;

            if (!alertData && taskTime <= now) {
              // Condition 1: First time alert (Instant)
              shouldTrigger = true;
              newAlertObject = { id: note.id, count: 1, lastTriggered: now };
            } else if (alertData && alertData.count === 1 && now >= (alertData.lastTriggered + 30 * 60 * 1000)) {
              // Condition 2: Second alert (30 minutes later)
              shouldTrigger = true;
              newAlertObject = { ...alertData, count: 2, lastTriggered: now };
            }

            if (shouldTrigger && newAlertObject) {
              // A. Trigger UI Toast
              setActiveAlerts(prev => {
                if (prev.some(p => p.id === note.id)) return prev;
                return [...prev, { ...note, folderName: folder.name, alertCount: newAlertObject.count }];
              });
              
              const alertMsg = newAlertObject.count === 1 
                ? `Goal Started: ${note.title}` 
                : `Snooze Reminder (30m): ${note.title}`;

              triggerSystemNotification(alertMsg, `Workspace Hub: In folder ${folder.name}`);

              if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                  type: 'SHOW_NOTIFICATION',
                  title: alertMsg,
                  body: `Review progress in ${folder.name}`
                });
              }

              setProcessedAlerts(prev => {
                const filtered = prev.filter(a => a.id !== note.id);
                return [...filtered, newAlertObject];
              });
            }
          }
        });
      });
    };

    const interval = setInterval(checkTasks, 5000);
    return () => clearInterval(interval);
  }, [folders, processedAlerts, activeWorkTaskId]);

  // Enhanced Security: SHA-256 Hashing
  const ADMIN_HASH = "ab5aa97074c454a0632057e704220d9a6678fbf773a0a5806fc09b8173b07309";

  const hashPassword = async (string) => {
    const utf8 = new TextEncoder().encode(string);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const inputHash = await hashPassword(passwordInput);
    if (inputHash === ADMIN_HASH) {
      setIsAuthenticated(true);
      setAuthError('');
      sessionStorage.setItem('notes-auth', 'true');
    } else {
      setAuthError('Incorrect password');
      setPasswordInput('');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('notes-auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Handlers
  const addFolder = () => {
    if (!newFolderName.trim()) return;
    const newFolder = { id: Date.now().toString(), name: newFolderName, notes: [] };
    setFolders([...folders, newFolder]);
    setNewFolderName('');
    setIsAddingFolder(false);
    setActiveFolderId(newFolder.id);
    setActiveTab('tasks');
    setIsSidebarOpen(false);
  };

  const handleImportPlan = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsImporting(true);

    try {
      let text = '';
      if (file.type === 'application/pdf') {
        const typedarray = new Uint8Array(await file.arrayBuffer());
        const loadingTask = pdfjsLib.getDocument(typedarray);
        const pdf = await loadingTask.promise;
        let fullText = '';
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          let lastY = -1;
          let pageText = '';
          
          // Sort items by vertical position (Y) and then horizontal (X)
          const sortedItems = content.items.sort((a, b) => {
            if (Math.abs(b.transform[5] - a.transform[5]) < 2) return a.transform[4] - b.transform[4];
            return b.transform[5] - a.transform[5];
          });

          for (let item of sortedItems) {
            if (lastY !== -1 && Math.abs(item.transform[5] - lastY) > 5) {
              pageText += '\n';
            }
            pageText += (item.str || ' ');
            lastY = item.transform[5];
          }
          fullText += pageText + '\n---\n'; // Page separator
        }
        text = fullText;
      } else {
        text = await file.text();
      }

      if (!text || !text.trim()) throw new Error("Could not read text.");

      const dayPattern = /\b(?:Day|DAY)\s*(\d+)/i;
      const taskPattern = /(?:📋|Task|TASK)\s*(\d+)/i;
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      
      const rawLines = text.split(/\n/);
      const newFolders = [];
      let currentFolder = null;
      let currentTask = null;

      rawLines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed === '---') return;

        const dayMatch = trimmed.match(dayPattern);
        const taskMatch = trimmed.match(taskPattern);

        if (dayMatch) {
          // New Day marker found
          currentTask = null;
          currentFolder = {
            id: 'fld-' + Date.now() + Math.random().toString(36).substr(2, 4),
            name: trimmed.length < 60 ? trimmed : `Day ${dayMatch[1]}`,
            notes: []
          };
          newFolders.push(currentFolder);
        } 
        else if (taskMatch) {
          // If a Task marker is found without a Day, provide a default folder
          if (!currentFolder) {
            currentFolder = { id: 'fld-gen-' + Date.now(), name: 'Plan Tasks', notes: [] };
            newFolders.push(currentFolder);
          }

          // Create the Task Card
          const deadline = new Date(Date.now() + 12 * 60 * 60 * 1000);
          currentTask = {
            id: 'tsk-' + Math.random().toString(36).substr(2, 9),
            title: trimmed,
            content: '',
            subtasks: [],
            status: 'Under Progress',
            time: deadline.toISOString(),
            totalWorkTime: 0
          };
          currentFolder.notes.push(currentTask);
        } 
        else if (currentTask) {
          // Add details to the active task
          if (trimmed.match(urlRegex)) {
            currentTask.content += `\n**RESOURCE:** ${trimmed}\n`;
          } else {
            const isSubtask = /^[•\-\*\d\.]+/.test(trimmed) || 
                              trimmed.toLowerCase().startsWith('goal:') || 
                              trimmed.toLowerCase().startsWith('action:');

            if (isSubtask) {
              currentTask.subtasks.push({ text: trimmed, completed: false });
            }
            
            let processedLine = trimmed;
            if (processedLine.toLowerCase().startsWith('goal:') || processedLine.toLowerCase().startsWith('action:')) {
              processedLine = `\n**${processedLine}**`;
            }
            currentTask.content += processedLine + '\n';
          }
        }
      });

      if (newFolders.length > 0) {
        setFolders(prev => [...prev, ...newFolders]);
        setActiveFolderId(newFolders[0].id);
        setActiveTab('tasks');
        alert(`Successfully imported ${newFolders.length} days with all tasks and sub-tasks.`);
      } else {
        alert("The PDF was read, but no 'Day' or 'Task' markers were detected. Check the file text content.");
      }
    } catch (error) {
      console.error("Import Error:", error);
      alert("Oops! Failed to import: " + error.message);
    } finally {
      setIsImporting(false);
      e.target.value = '';
    }
  };

  const addNote = () => {
    if (!newNoteData.title) return;
    
    if (editingNoteId) {
      // Logic for editing existing note
      setFolders(prev => prev.map(folder => {
        if (folder.id === activeFolderId) {
          return {
            ...folder,
            notes: folder.notes.map(note => {
              if (note.id === editingNoteId) {
                return { ...note, ...newNoteData };
              }
              return note;
            })
          };
        }
        return folder;
      }));
      setEditingNoteId(null);
    } else {
      // Logic for adding new note
      const newNote = {
        id: Date.now().toString(),
        ...newNoteData,
        totalWorkTime: 0
      };

      setFolders(folders.map(folder => {
        if (folder.id === activeFolderId) {
          return { ...folder, notes: [newNote, ...folder.notes] };
        }
        return folder;
      }));
    }

    setNewNoteData({ title: '', content: '', status: 'Under Progress', time: '', subtasks: [] });
    setIsAddingNote(false);
  };

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setNewNoteData({
      title: note.title,
      content: note.content,
      status: note.status,
      time: note.time,
      subtasks: note.subtasks || []
    });
    setIsAddingNote(true);
  };

  const deleteFolder = (id) => {
    const updatedFolders = folders.filter(f => f.id !== id);
    setFolders(updatedFolders);
    if (activeFolderId === id && updatedFolders.length > 0) setActiveFolderId(updatedFolders[0].id);
  };

  const deleteNote = (folderId, noteId) => {
    setFolders(folders.map(folder => {
      if (folder.id === folderId) {
        return { ...folder, notes: folder.notes.filter(n => n.id !== noteId) };
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
            if (n.id === noteId) return { ...n, status: n.status === 'Completed' ? 'Under Progress' : 'Completed' };
            return n;
          })
        };
      }
      return folder;
    }));
  };

  const toggleSubTask = (folderId, noteId, subTaskIndex) => {
    setFolders(prev => prev.map(folder => {
      if (folder.id === folderId) {
        return {
          ...folder,
          notes: folder.notes.map(note => {
            if (note.id === noteId) {
              const newSubTasks = [...(note.subtasks || [])];
              newSubTasks[subTaskIndex] = {
                ...newSubTasks[subTaskIndex],
                completed: !newSubTasks[subTaskIndex].completed
              };
              return { ...note, subtasks: newSubTasks };
            }
            return note;
          })
        };
      }
      return folder;
    }));
  };

  const dismissAlert = (noteId) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== noteId));
  };

  const formatAMPM = (dateString) => {
    if (!dateString) return "No time set";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true,
      month: 'short',
      day: 'numeric'
    });
  };

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

  const activeFolder = folders.find(f => f.id === activeFolderId);
  const activeSection = noteSections.find(s => s.id === activeSectionId);

  // Notebook Handlers
  const addSection = () => {
    if (!newSectionName.trim()) return;
    const newSection = { id: Date.now().toString(), name: newSectionName, notes: [] };
    setNoteSections([...noteSections, newSection]);
    setNewSectionName('');
    setIsAddingSection(false);
    setActiveSectionId(newSection.id);
    setActiveTab('notebook');
    setIsSidebarOpen(false);
  };

  const deleteSection = (id) => {
    setNoteSections(noteSections.filter(s => s.id !== id));
  };

  const addPlainNote = () => {
    if (!newPlainNoteData.title) return;
    if (editingPlainNoteId) {
      setNoteSections(prev => prev.map(section => {
        if (section.id === activeSectionId) {
          return {
            ...section,
            notes: section.notes.map(n => n.id === editingPlainNoteId ? { ...n, ...newPlainNoteData } : n)
          };
        }
        return section;
      }));
      setEditingPlainNoteId(null);
    } else {
      const newNote = { id: Date.now().toString(), ...newPlainNoteData, timestamp: new Date().toLocaleString() };
      setNoteSections(prev => prev.map(section => {
        if (section.id === activeSectionId) {
          return { ...section, notes: [newNote, ...section.notes] };
        }
        return section;
      }));
    }
    setNewPlainNoteData({ title: '', content: '' });
    setIsAddingPlainNote(false);
  };

  const deletePlainNote = (sectionId, noteId) => {
    setNoteSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return { ...section, notes: section.notes.filter(n => n.id !== noteId) };
      }
      return section;
    }));
  };

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-slate-900/50 p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-800 shadow-2xl max-w-sm sm:max-w-md w-full text-center backdrop-blur-xl">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-indigo-500/20"><ShieldCheck className="w-8 h-8 text-indigo-400" /></div>
          <h2 className="text-xl sm:text-2xl font-black mb-2 text-white uppercase tracking-tighter">Admin Access</h2>
          <p className="text-slate-400 mb-8 text-xs sm:text-sm font-medium leading-relaxed px-2">Secure access for Ayushman Portfolio Workspace.</p>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input type="password" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} placeholder="Access Key" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-slate-200 focus:outline-none focus:border-indigo-500 transition-all text-center font-bold tracking-[0.2em] sm:tracking-[0.3em]" autoFocus />
            {authError && <p className="text-red-400 text-xs sm:text-sm font-bold">{authError}</p>}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-xs sm:text-sm tracking-widest py-4 rounded-2xl transition-all shadow-xl">Authorize Access</button>
          </form>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 pt-24 sm:pt-28 pb-12 px-2 sm:px-6 lg:px-8">
      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsAddingNote(true)}
        className="md:hidden fixed bottom-8 right-6 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-indigo-600/40 z-[45] active:scale-95 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Internal Notification Toasts */}
      <div className="fixed top-24 right-4 z-[100] flex flex-col gap-4 pointer-events-none w-full max-w-[400px] px-4 sm:px-0">
        <AnimatePresence>
          {activeAlerts.map(alert => (
            <motion.div key={alert.id} initial={{ opacity: 0, x: 50, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 20, scale: 0.9 }} className="pointer-events-auto bg-slate-900/95 border-l-4 border-l-indigo-500 border border-slate-800 p-4 sm:p-5 rounded-2xl shadow-2xl backdrop-blur-xl flex gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center shrink-0"><BellRing className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-400 animate-bounce" /></div>
              <div className="flex-1">
                <p className="text-[9px] sm:text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Time to Start</p>
                <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{alert.title}</h4>
                <p className="text-[10px] sm:text-xs text-slate-400 line-clamp-1 italic mb-2">In {alert.folderName}</p>
                <button onClick={() => dismissAlert(alert.id)} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase text-slate-300 rounded-lg transition-all">Dismiss</button>
              </div>
              <button onClick={() => dismissAlert(alert.id)} className="text-slate-500 hover:text-white transition-colors"><X className="w-4 h-4" /></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col min-h-screen pb-12">
        {notificationPermission === 'default' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-4 sm:mb-6 bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mx-2 sm:mx-0">
            <div className="flex items-center gap-3"><Info className="w-5 h-5 text-indigo-400 shrink-0" /><p className="text-[10px] sm:text-xs font-bold text-slate-300 text-center sm:text-left">Enable <span className="text-white">Push Notifications</span> for background alerts.</p></div>
            <button onClick={requestNotificationPermission} className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg">Confirm</button>
          </motion.div>
        )}

        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 px-2 sm:px-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 active:scale-95 transition-all"><Menu className="w-6 h-6" /></button>
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-1">
                <div className="hidden sm:flex w-12 h-12 bg-indigo-500/10 rounded-2xl items-center justify-center border border-indigo-500/20"><LayoutDashboard className="w-6 h-6 text-indigo-400" /></div>
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Workspace <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400">Hub</span></h1>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[10px]">Studio Administration Portal</p>
            </div>
          </div>
          <button onClick={() => navigate('/')} className="hidden sm:flex items-center gap-3 px-6 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-300 font-black uppercase text-xs tracking-widest shadow-xl"><ArrowLeft className="w-4 h-4" /> Exit Studio</button>
        </div>

        {/* Unified Main Card */}
        <div className="flex-1 bg-slate-900/30 rounded-[2rem] sm:rounded-[3rem] border border-slate-800/50 backdrop-blur-md overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
          
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden" />
            )}
          </AnimatePresence>

          {/* Unified Sidebar Layout */}
          <div className={`fixed md:relative inset-y-0 left-0 w-[280px] sm:w-72 bg-slate-950/98 md:bg-slate-950/40 border-r border-slate-800 transition-transform duration-300 z-50 md:z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-6 flex flex-col gap-8 h-full overflow-y-auto custom-scrollbar">
              <div className="flex md:hidden justify-between items-center px-2">
                <span className="text-xl font-black text-white uppercase tracking-tighter">Workspace Menu</span>
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-500 active:scale-95"><X className="w-7 h-7" /></button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Tasks</span>
                  <div className="flex items-center gap-1">
                    <label className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all cursor-pointer group/import flex items-center gap-2">
                      <Import className="w-3.5 h-3.5" />
                      <span className="hidden group-hover/import:block text-[8px] font-black uppercase">Import Plan</span>
                      <input type="file" accept=".pdf,.txt" className="hidden" onChange={handleImportPlan} disabled={isImporting}/>
                    </label>
                    <button onClick={() => setIsAddingFolder(true)} className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400 hover:scale-110 active:scale-90 transition-all"><FolderPlus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {isAddingFolder && (
                    <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-2xl border border-indigo-500/50"><input autoFocus type="text" className="w-full bg-transparent border-none text-sm text-slate-200 focus:outline-none font-bold" placeholder="Folder Name" value={newFolderName} onChange={(e) => setNewFolderName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addFolder()}/><button onClick={() => setIsAddingFolder(false)} className="text-slate-500"><X className="w-4 h-4" /></button></div>
                  )}
                  {folders.map(folder => (
                    <div key={folder.id} onClick={() => { setActiveFolderId(folder.id); setActiveTab('tasks'); setIsSidebarOpen(false); }} className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${activeTab === 'tasks' && activeFolderId === folder.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                      <div className="flex items-center gap-3 truncate">
                        <FolderIcon className={`w-4 h-4 shrink-0 ${(activeTab === 'tasks' && activeFolderId === folder.id) ? 'fill-white/20' : 'fill-slate-500/20'}`} />
                        <span className="truncate text-sm font-bold">{folder.name}</span>
                        {folder.notes.length > 0 && <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md ${activeTab === 'tasks' && activeFolderId === folder.id ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-500'}`}>{folder.notes.length}d</span>}
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); deleteFolder(folder.id); }} className={`p-1 transition-all ${activeTab === 'tasks' && activeFolderId === folder.id ? 'opacity-40 hover:opacity-100' : 'opacity-0 group-hover:opacity-100 hover:text-red-400'}`}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Notes</span>
                  <button onClick={() => setIsAddingSection(true)} className="p-1.5 bg-violet-500/10 rounded-lg text-violet-400 hover:scale-110 active:scale-90 transition-all"><Plus className="w-4 h-4" /></button>
                </div>
                <div className="space-y-1.5">
                  {isAddingSection && (
                    <div className="flex items-center gap-2 p-3 bg-slate-900 rounded-2xl border border-violet-500/50"><input autoFocus type="text" className="w-full bg-transparent border-none text-sm text-slate-200 focus:outline-none font-bold" placeholder="Section Name" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addSection()}/><button onClick={() => setIsAddingSection(false)} className="text-slate-500"><X className="w-4 h-4" /></button></div>
                  )}
                  {noteSections.map(section => (
                    <div key={section.id} onClick={() => { setActiveSectionId(section.id); setActiveTab('notebook'); setIsSidebarOpen(false); }} className={`group flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-all ${activeTab === 'notebook' && activeSectionId === section.id ? 'bg-violet-600 text-white' : 'text-slate-400 hover:bg-slate-800/50'}`}>
                      <div className="flex items-center gap-3 truncate"><FileText className={`w-4 h-4 shrink-0 ${(activeTab === 'notebook' && activeSectionId === section.id) ? 'fill-white/20' : 'fill-slate-500/20'}`} /><span className="truncate text-sm font-bold">{section.name}</span></div>
                      <button onClick={(e) => { e.stopPropagation(); deleteSection(section.id); }} className={`p-1 transition-all ${activeTab === 'notebook' && activeSectionId === section.id ? 'opacity-40 hover:opacity-100' : 'opacity-0 group-hover:opacity-100 hover:text-red-400'}`}><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2">Management Portal</span>
                <div className="space-y-1.5 text-slate-400">
                  <button onClick={() => { setActiveTab('resume'); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3.5 p-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'resume' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}><ShieldCheck className="w-4 h-4" /> Resume Portal</button>
                  <button onClick={() => { setActiveTab('contacts'); setIsSidebarOpen(false); }} className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-bold transition-all text-sm ${activeTab === 'contacts' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800/50'}`}><div className="flex items-center gap-3.5"><Mail className="w-4 h-4" /> Inquiry Log</div>{contacts.length > 0 && <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'contacts' ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-400'}`}>{contacts.length}</span>}</button>
                  <a href="https://calandar-alpha.vercel.app/" target="_blank" rel="noopener noreferrer" className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl font-bold transition-all text-sm text-slate-400 hover:bg-slate-800/50">
                    <Calendar className="w-4 h-4" /> Schedule Meetings
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800/50 bg-slate-950/20 mt-auto"><div className="flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-500"><User className="w-4 h-4" /></div><div className="flex-1 overflow-hidden"><p className="text-[10px] font-black text-white uppercase truncate">Ayushman Tripathi</p><p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Admin Role</p></div><Settings className="w-4 h-4 text-slate-700 pointer-hover" /></div></div>
          </div>

          <div className="flex-1 flex flex-col bg-slate-950/10 relative h-full">
            <AnimatePresence mode="wait">
              {activeTab === 'tasks' ? (
                <motion.div key={activeFolderId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col h-full">
                  {activeFolder ? (
                    <>
                      <div className="p-4 sm:p-8 border-b border-slate-800/50 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 bg-slate-950/30 backdrop-blur-xl">
                        <div><h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3 uppercase tracking-tight">{activeFolder.name}<span className="text-[9px] sm:text-[10px] font-black text-slate-600 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">{activeFolder.notes.length} Tasks</span></h3></div>
                        <button onClick={() => setIsAddingNote(true)} className="hidden sm:flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-2xl transition-all text-xs font-black uppercase tracking-widest shadow-xl"><FilePlus className="w-4 h-4" /> Create task</button>
                      </div>

                      <div className="flex-1 p-4 sm:p-8">
                        {isAddingNote && (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900/98 border border-indigo-500/40 rounded-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 mb-8 shadow-2xl backdrop-blur-3xl sticky top-0 z-10 mx-1">
                            <input autoFocus type="text" placeholder="Title" className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-3.5 sm:py-4 mb-4 sm:mb-6 text-slate-100 focus:outline-none focus:border-indigo-500 font-bold text-base sm:text-lg" value={newNoteData.title} onChange={(e) => setNewNoteData({...newNoteData, title: e.target.value})}/>
                            <textarea placeholder="Task details..." className="w-full bg-slate-950 border border-slate-800 rounded-xl sm:rounded-2xl px-5 sm:px-6 py-4 sm:py-5 mb-6 sm:mb-8 text-slate-300 focus:outline-none focus:border-indigo-500 min-h-[100px] sm:min-h-[120px] resize-none text-sm leading-relaxed" value={newNoteData.content} onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})}/>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
                              <div className="space-y-3">
                                <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2"><Calendar className="w-4 h-4 text-indigo-400" /> Start Time</label>
                                <div className="space-y-2">
                                  <input type="datetime-local" className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl sm:rounded-[1.5rem] px-4 py-3 sm:px-6 sm:py-4 text-sm font-black text-white focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer" value={newNoteData.time} onChange={(e) => setNewNoteData({...newNoteData, time: e.target.value})}/>
                                  <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/5 rounded-lg border border-indigo-500/10"><Clock className="w-3 h-3 text-indigo-400" /><span className="text-[9px] font-black text-indigo-300 uppercase truncate">{newNoteData.time ? formatAMPM(newNoteData.time) : "Not Scheduled"}</span></div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <label className="text-[10px] sm:text-[11px] font-black text-slate-500 uppercase tracking-wider ml-1 flex items-center gap-2"><Settings className="w-4 h-4 text-amber-400" /> Goal Priority</label>
                                <select className="w-full bg-slate-950 border-2 border-slate-800 rounded-xl sm:rounded-[1.5rem] px-4 py-3 sm:px-6 sm:py-4 text-xs font-black uppercase text-indigo-400 appearance-none focus:outline-none focus:border-indigo-500" value={newNoteData.status} onChange={(e) => setNewNoteData({...newNoteData, status: e.target.value})}><option value="Under Progress">Under Progress</option><option value="Completed">Completed</option></select>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4"><button onClick={addNote} className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase text-[10px] tracking-widest py-4 rounded-xl sm:rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2">{editingNoteId ? <Save className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />} {editingNoteId ? 'Update Task' : 'Confirm Task'}</button><button onClick={() => { setIsAddingNote(false); setEditingNoteId(null); setNewNoteData({ title: '', content: '', status: 'Under Progress', time: '', subtasks: [] }); }} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-black uppercase text-[10px] tracking-widest py-4 rounded-xl sm:rounded-2xl transition-all">Cancel</button></div>
                          </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 pb-20 sm:pb-0">
                          {activeFolder.notes.map(note => (
                            <motion.div layout key={note.id} className={`p-5 sm:p-6 rounded-[1.8rem] sm:rounded-[2.5rem] border-2 transition-all group flex flex-col ${note.status === 'Completed' ? 'bg-slate-900/30 border-emerald-500/5' : 'bg-slate-900/60 border-slate-800/80 hover:border-indigo-500/30 shadow-xl'}`}>
                              <div className="flex justify-between items-start mb-3 sm:mb-4 gap-4">
                                <h4 className={`font-black text-base sm:text-lg tracking-tight leading-tight ${note.status === 'Completed' ? 'text-slate-600 line-through' : 'text-slate-100'}`}>{note.title}</h4>
                                <div className="flex items-center gap-2">
                                  {note.status !== 'Completed' && (
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); startEditing(note); }}
                                      className="p-2 bg-slate-800/50 hover:bg-indigo-500/20 rounded-xl text-slate-500 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/30"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button onClick={(e) => { e.stopPropagation(); deleteNote(activeFolder.id, note.id); }} className="p-2 sm:p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl sm:rounded-2xl transition-all border border-red-500/20"><Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /></button>
                                </div>
                              </div>
                              <div className="flex-1 overflow-y-auto max-h-40 sm:max-h-48 pr-2 custom-scrollbar-thin mb-6">
                                <p className={`text-xs sm:text-sm leading-relaxed ${note.status === 'Completed' ? 'text-slate-600' : 'text-slate-400'} whitespace-pre-wrap mb-4`}>
                                  {renderContentWithLinks(note.content)}
                                </p>
                                
                                {note.subtasks && note.subtasks.length > 0 && (
                                  <div className="space-y-2">
                                    {note.subtasks.map((st, idx) => (
                                      <div 
                                        key={idx} 
                                        onClick={() => toggleSubTask(activeFolder.id, note.id, idx)}
                                        className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${st.completed ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-slate-800/30 border-slate-700/50 hover:border-indigo-500/40'}`}
                                      >
                                        <div className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${st.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600'}`}>
                                          {st.completed && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`text-[11px] font-bold leading-tight ${st.completed ? 'text-slate-500 line-through' : 'text-slate-200'}`}>
                                          {st.text}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-3 sm:space-y-4 pt-4 border-t border-slate-800/40">
                                {note.time && (
                                  <div className={`flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider ${new Date(note.time) < new Date() && note.status !== 'Completed' ? 'text-red-500' : 'text-slate-500'}`}>
                                    <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {formatAMPM(note.time)}
                                  </div>
                                )}
                                
                                {/* Work Timer UI */}
                                <div className="flex flex-col gap-2 pt-2">
                                  {activeWorkTaskId === note.id ? (
                                    <div className="flex flex-col gap-2 bg-indigo-500/10 border border-indigo-500/30 p-3 rounded-xl">
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                          <div className={`w-2 h-2 rounded-full ${isTimerPaused ? 'bg-amber-500' : 'bg-red-500 animate-ping'}`} />
                                          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                            {isTimerPaused ? 'Paused' : 'Live'}: {formatDuration(elapsedSessionTime + (note.totalWorkTime || 0))}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex gap-2">
                                        {isTimerPaused ? (
                                          <button onClick={resumeWorkSession} className="flex-1 text-[9px] font-black text-white bg-emerald-600 py-1.5 rounded-lg uppercase tracking-tighter flex items-center justify-center gap-1">
                                            <Play className="w-3 h-3" /> Resume
                                          </button>
                                        ) : (
                                          <button onClick={pauseWorkSession} className="flex-1 text-[9px] font-black text-white bg-amber-600 py-1.5 rounded-lg uppercase tracking-tighter flex items-center justify-center gap-1">
                                            <Pause className="w-3 h-3" /> Pause
                                          </button>
                                        )}
                                        <button onClick={stopWorkSession} className="flex-1 text-[9px] font-black text-white bg-red-600 py-1.5 rounded-lg uppercase tracking-tighter flex items-center justify-center gap-1">
                                          <Square className="w-3 h-3" /> Stop
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="flex items-center justify-between bg-slate-800/30 p-3 rounded-xl border border-slate-800/50 group/timer">
                                      <span className="text-[10px] font-bold text-slate-500 uppercase">Worked: {formatDuration(note.totalWorkTime || 0)}</span>
                                      <button 
                                        onClick={() => startWorkSession(note.id)} 
                                        className="text-[9px] font-black text-indigo-400 hover:text-white uppercase tracking-tighter flex items-center gap-1 transition-colors"
                                      >
                                        <Play className="w-3 h-3" /> Start Tasks
                                      </button>
                                    </div>
                                  )}
                                </div>

                                <button onClick={() => toggleNoteStatus(activeFolder.id, note.id)} className={`w-full flex items-center justify-center gap-2 text-[9px] font-black uppercase py-2.5 sm:py-3 rounded-xl sm:rounded-[1rem] transition-all border ${note.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-indigo-500/5 text-indigo-400 border-indigo-500/20'}`}>{note.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />} {note.status}</button>

                              </div>
                            </motion.div>
                          ))}
                          {activeFolder.notes.length === 0 && !isAddingNote && (
                            <div className="col-span-full h-48 sm:h-64 border-2 border-dashed border-slate-800 rounded-[2rem] sm:rounded-[3rem] flex flex-col items-center justify-center text-slate-700 text-center p-6 opacity-40"><FilePlus className="w-8 h-8 sm:w-12 sm:h-12 mb-3" /><p className="font-black uppercase tracking-widest text-[10px]">Folder is empty</p></div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-800 h-full"><LayoutDashboard className="w-16 h-16 mb-4 opacity-10" /><p className="font-black uppercase tracking-[0.2em] text-[10px]">Select a folder</p></div>
                  )}
                </motion.div>
              ) : activeTab === 'notebook' ? (
                <motion.div key={activeSectionId} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col h-full">
                  {activeSection ? (
                    <>
                      <div className="p-4 sm:p-8 border-b border-slate-800/50 flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 bg-slate-950/30 backdrop-blur-xl">
                        <div><h3 className="text-lg sm:text-2xl font-black text-white flex items-center gap-2 sm:gap-3 uppercase tracking-tight">{activeSection.name}<span className="text-[9px] sm:text-[10px] font-black text-slate-600 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800">{activeSection.notes.length} Workspace</span></h3></div>
                        <button onClick={() => setIsAddingPlainNote(true)} className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white px-5 py-3 rounded-2xl transition-all text-xs font-black uppercase tracking-widest shadow-xl"><Plus className="w-4 h-4" /> New Note</button>
                      </div>

                      <div className="flex-1 p-4 sm:p-8">
                        {isAddingPlainNote && (
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-900 border border-violet-500/40 rounded-[2.5rem] p-8 mb-8 shadow-2xl backdrop-blur-3xl sticky top-0 z-10">
                            <input autoFocus type="text" placeholder="Note Title" className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 mb-6 text-slate-100 focus:outline-none focus:border-violet-500 font-bold text-lg" value={newPlainNoteData.title} onChange={(e) => setNewPlainNoteData({...newPlainNoteData, title: e.target.value})}/>
                            <textarea placeholder="Write your thoughts..." className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-5 mb-8 text-slate-300 focus:outline-none focus:border-violet-500 min-h-[200px] resize-none text-sm leading-relaxed" value={newPlainNoteData.content} onChange={(e) => setNewPlainNoteData({...newPlainNoteData, content: e.target.value})}/>
                            <div className="flex gap-4">
                              <button onClick={() => { setIsAddingPlainNote(false); setEditingPlainNoteId(null); setNewPlainNoteData({ title: '', content: '' }); }} className="flex-1 bg-slate-800 py-4 rounded-2xl text-slate-400 font-black uppercase text-[10px] tracking-widest">Cancel</button>
                              <button onClick={addPlainNote} className="flex-[2] bg-violet-600 py-4 rounded-2xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl">{editingPlainNoteId ? 'Update Note' : 'Save Note'}</button>
                            </div>
                          </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {activeSection.notes.map(note => (
                            <motion.div key={note.id} layout className="bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-[2.5rem] hover:border-violet-500/30 transition-all group flex flex-col shadow-xl">
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <h4 className="text-lg sm:text-xl font-black text-slate-100 tracking-tight leading-tight mb-2">{note.title}</h4>
                                  <span className="text-[9px] font-mono text-slate-600 italic uppercase">{note.timestamp}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button onClick={() => { setEditingPlainNoteId(note.id); setNewPlainNoteData({ title: note.title, content: note.content }); setIsAddingPlainNote(true); }} className="p-2.5 bg-slate-800/50 text-slate-500 hover:text-violet-400 rounded-xl transition-all"><Edit2 className="w-4 h-4" /></button>
                                  <button onClick={() => deletePlainNote(activeSection.id, note.id)} className="p-2.5 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all border border-red-500/20"><Trash2 className="w-4 h-4" /></button>
                                </div>
                              </div>
                              <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap flex-1 break-words">
                                {renderContentWithLinks(note.content)}
                              </div>
                            </motion.div>
                          ))}
                          {activeSection.notes.length === 0 && !isAddingPlainNote && (
                            <div className="col-span-full h-64 border-2 border-dashed border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-slate-700 text-center opacity-40"><MessageSquare className="w-12 h-12 mb-4" /><p className="font-black uppercase tracking-widest text-[10px]">No notes in this section</p></div>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-800 h-full"><FilePlus className="w-16 h-16 mb-4 opacity-10" /><p className="font-black uppercase tracking-[0.2em] text-[10px]">Select a section</p></div>
                  )}
                </motion.div>
              ) : activeTab === 'resume' ? (
                <motion.div key="resume" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 sm:p-16 h-full flex flex-col justify-center items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mb-6"><FileText className="w-10 h-10 sm:w-12 sm:h-12 text-indigo-400" /></div>
                  <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 uppercase tracking-tighter">Resume <span className="text-indigo-500">Portal</span></h2>
                  <p className="text-slate-400 text-xs sm:text-base mb-10 max-w-xs sm:max-w-sm mx-auto font-medium leading-relaxed">Update your public resume asset instantly.</p>
                  <div className="max-w-md mx-auto w-full">
                    {resumeUrl ? (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="p-5 sm:p-6 bg-slate-900 border border-slate-800 rounded-2xl flex items-center gap-4 text-left"><div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0"><CheckCircle2 className="w-6 h-6 text-emerald-500" /></div><div><div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Status: Active</div><div className="text-slate-100 font-bold text-sm truncate max-w-[150px] sm:max-w-[250px]">{resumeName}</div></div></div>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4"><a href={resumeUrl} download={resumeName} className="flex items-center justify-center gap-2 bg-slate-800 py-3.5 sm:py-4 rounded-xl text-xs font-black uppercase text-slate-200">Preview</a><button onClick={removeResume} className="bg-red-500/10 text-red-500 py-3.5 sm:py-4 rounded-xl text-xs font-black uppercase border border-red-500/20">Delete</button></div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-3 sm:border-4 border-dashed border-slate-800 hover:border-indigo-500/40 rounded-[2rem] sm:rounded-[3rem] p-10 sm:p-16 cursor-pointer bg-slate-950/40 active:scale-98 transition-all"><Upload className="w-12 h-12 text-slate-800 mb-4 transition-transform group-active:-translate-y-1" /><span className="text-slate-600 font-black uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">Select Resume File</span><input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResumeUpload}/></label>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="contacts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 sm:p-8 h-full flex flex-col overflow-y-auto custom-scrollbar">
                  <h2 className="text-xl sm:text-3xl font-black text-white uppercase tracking-tighter mb-6 sm:mb-8 text-left">Inquiry <span className="text-indigo-500">Log</span></h2>
                  <div className="space-y-4 sm:space-y-6 pb-20 sm:pb-0">
                    {contacts.length === 0 ? (
                      <div className="bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl p-12 text-center flex flex-col justify-center items-center opacity-40"><Mail className="w-12 h-12 text-slate-800 mb-4" /><p className="text-slate-600 font-black uppercase tracking-widest text-[10px]">Log is empty</p></div>
                    ) : (
                      contacts.map(contact => (
                        <div key={contact.id} className="bg-slate-900/50 border border-slate-800 rounded-[1.5rem] sm:rounded-2xl p-5 sm:p-8 hover:border-indigo-500/30 shadow-xl transition-all">
                          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4 sm:mb-6">
                            <div className="flex flex-col gap-1.5"><div className="flex items-center gap-2"><User className="w-4 h-4 text-indigo-400" /><span className="text-sm font-black text-slate-100">{contact.name}</span></div><div className="flex items-center gap-2"><Mail className="w-4 h-4 text-violet-400" /><span className="text-[10px] sm:text-xs font-bold text-slate-400 truncate max-w-[200px]">{contact.email}</span></div></div>
                            <div className="flex items-center justify-between sm:justify-end gap-4"><span className="text-[9px] sm:text-[10px] text-slate-600 font-mono italic">{contact.timestamp}</span><button onClick={() => deleteContact(contact.id)} className="p-2 text-red-500/40 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button></div>
                          </div>
                          <div className="bg-slate-950 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-slate-800 inset-shadow-inner text-left">
                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                              {renderContentWithLinks(contact.message)}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notes;
