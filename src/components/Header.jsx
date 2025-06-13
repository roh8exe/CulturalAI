import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo Section - Left Side */}
        <div className="logo-section">
          <div className="logo">
            <div className="logo-icon">
              <span className="logo-symbol">🧠</span>
            </div>
            <h1 className="logo-text">CultureAI</h1>
          </div>
        </div>

        {/* Navigation Section - Centered Left */}
        <div className="nav-section">
          <nav className="nav">
            <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
              <li className="nav-item">
                <a 
                  href="#home" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('home');
                  }} 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                >
                  <span className="nav-text">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#analyzer" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('analyzer');
                  }} 
                  className={`nav-link ${activeSection === 'analyzer' ? 'active' : ''}`}
                >
                  <span className="nav-text">Analyzer</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#about" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('about');
                  }} 
                  className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
                >
                  <span className="nav-text">About Us</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#work-process" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('work-process');
                  }} 
                  className={`nav-link ${activeSection === 'work-process' ? 'active' : ''}`}
                >
                  <span className="nav-text">Work Process</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#team" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('team');
                  }} 
                  className={`nav-link ${activeSection === 'team' ? 'active' : ''}`}
                >
                  <span className="nav-text">Our Team</span>
                </a>
              </li>
              <li className="nav-item">
                <a 
                  href="#contact" 
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }} 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                >
                  <span className="nav-text">Contact</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;