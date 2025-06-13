// src/components/Header.jsx
import React from 'react';

const Header = ({ activeSection }) => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h2>CulturalAI</h2>
        </div>
        <nav className="nav">
          <ul>
            <li>
              <a 
                href="#home" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('home');
                }} 
                className={activeSection === 'home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#analyzer" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('analyzer');
                }} 
                className={activeSection === 'analyzer' ? 'active' : ''}
              >
                Analyzer
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }} 
                className={activeSection === 'about' ? 'active' : ''}
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#work-process" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('work-process');
                }} 
                className={activeSection === 'work-process' ? 'active' : ''}
              >
                Work Process
              </a>
            </li>
            <li>
              <a 
                href="#team" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('team');
                }} 
                className={activeSection === 'team' ? 'active' : ''}
              >
                Our Team
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }} 
                className={activeSection === 'contact' ? 'active' : ''}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;