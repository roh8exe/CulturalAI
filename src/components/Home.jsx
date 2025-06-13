import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [activeAnalysis, setActiveAnalysis] = useState(0);

  // Sample bias detection data for the illustration
  const biasDetections = [
    {
      type: "Gender Stereotype",
      confidence: "High (94%)",
      confidenceClass: "confidence-high",
      icon: "👩‍💼"
    },
    {
      type: "Cultural Assumption",
      confidence: "Medium (76%)",
      confidenceClass: "confidence-medium",
      icon: "🌍"
    },
    {
      type: "Age Bias",
      confidence: "Low (23%)",
      confidenceClass: "confidence-low",
      icon: "👴"
    }
  ];

  const analysisItems = [
    "Analyzing context...",
    "Cultural patterns detected",
    "Bias probability: 87%",
    "Generating recommendations"
  ];

  useEffect(() => {
    // Cycle through analysis items
    const interval = setInterval(() => {
      setActiveAnalysis((prev) => (prev + 1) % analysisItems.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const scrollToAnalyzer = () => {
    const element = document.getElementById('analyzer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="home-wrapper" id="home">
      {/* Hero Section Only */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
            <div className="shape shape-5"></div>
          </div>
        </div>
        
        <div className="container">
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <h1 className="hero-title">
                Breaking <span className="gradient-text">Cultural Stereotypes</span> with Advanced AI
              </h1>
              
              <p className="hero-description">
                Our cutting-edge artificial intelligence analyzes images, text, and multimedia content 
                to identify cultural biases, stereotypes, and discriminatory patterns, fostering 
                awareness and promoting inclusive communication across diverse communities.
              </p>
              
              <div className="hero-actions">
                <button className="cta-primary" onClick={scrollToAnalyzer}>
                  <span>Start Analysis</span>
                  <span>🚀</span>
                </button>
              </div>
              
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">250K+</span>
                  <span className="stat-label">Content Analyzed</span>
                </div>
                <div className="stat">
                  <span className="stat-number">97.3%</span>
                  <span className="stat-label">Accuracy Rate</span>
                </div>
                <div className="stat">
                  <span className="stat-number">120+</span>
                  <span className="stat-label">Cultural Contexts</span>
                </div>
                <div className="stat">
                  <span className="stat-number">45+</span>
                  <span className="stat-label">Languages</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="main-illustration">
                <div className="illustration-bg"></div>
                
                {/* Enhanced Bias Detection Interface */}
                <div className="bias-detector">
                  <div className="detector-header">
                    <div className="status-indicator"></div>
                    <span className="detector-title">Bias Analysis Engine</span>
                  </div>
                  
                  <div className="bias-items">
                    {biasDetections.map((bias, index) => (
                      <div key={index} className="bias-item">
                        <span className="bias-icon">{bias.icon}</span>
                        <div className="bias-text">
                          <span className="bias-type">{bias.type}</span>
                          <span className={`bias-confidence ${bias.confidenceClass}`}>
                            {bias.confidence}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Floating Analysis Elements */}
                <div className="analysis-elements">
                  {analysisItems.map((item, index) => (
                    <div 
                      key={index} 
                      className={`analysis-item analysis-${index + 1}`}
                      style={{
                        opacity: activeAnalysis === index ? 1 : 0.6,
                        transform: activeAnalysis === index ? 'scale(1.05)' : 'scale(1)'
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;