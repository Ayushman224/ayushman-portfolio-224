import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Notes from './components/Notes';
import Footer from './components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certifications />
      </main>
      <Footer />
    </>
  );
}

function NotesPage() {
  return (
    <>
      <Navbar />
      <main>
        <Notes />
      </main>
      <Footer />
    </>
  );
}

function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-50 font-sans selection:bg-indigo-500/30">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
