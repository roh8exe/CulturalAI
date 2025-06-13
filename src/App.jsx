
// src/App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Analyzer from './components/Analyzer';
import About from './components/About';
import WorkProcess from './components/WorkProcess';
import Team from './components/Team';
import Contact from './components/Contact';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'analyzer', 'about', 'work-process', 'team', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App">
      <Header activeSection={activeSection} />
      <main>
        <Home />
        <Analyzer />
        <About />
        <WorkProcess />
        <Team />
        <Contact />
      </main>
    </div>
  );
};

export default App;