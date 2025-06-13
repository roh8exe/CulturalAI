// src/components/Home.jsx
import React from 'react';
import '../styles/Home.css';

const Home = () => {
  const scrollToAnalyzer = () => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="home-section">
      <div className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Breaking Cultural Stereotypes with AI</h1>
            <p>
              Our advanced AI analyzes images and text to identify cultural stereotypes, 
              promoting awareness and understanding across different cultures and communities.
            </p>
            <button className="cta-button" onClick={scrollToAnalyzer}>
              Try Our Analyzer
            </button>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">🌍</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;