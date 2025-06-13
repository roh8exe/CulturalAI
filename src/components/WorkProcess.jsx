import React from 'react';
import '../styles/WorkProcess.css';

const WorkProcess = () => {
  const processSteps = [
    { 
      number: 1, 
      title: "Upload & Input", 
      description: "Upload your image and provide a descriptive prompt about the content you want to analyze for cultural sensitivity", 
      icon: "📤"
    },
    { 
      number: 2, 
      title: "AI Analysis", 
      description: "Our advanced AI model processes the image and text to identify potential stereotypes and cultural biases using machine learning", 
      icon: "🧠"
    },
    { 
      number: 3, 
      title: "Comprehensive Report", 
      description: "Receive detailed analysis including confidence scores, bias detection levels, and cultural sensitivity insights", 
      icon: "📊"
    }
  ];

  return (
    <section id="work-process" className="work-process-section">
      <div className="section-container work-process-container">
        <h2 className="section-title work-process-title">How It Works</h2>
        
        <p className="work-process-subtitle">
          Our advanced AI technology follows a systematic approach to identify cultural stereotypes and biases with precision and cultural sensitivity
        </p>
        
        <div className="process-grid">
          {processSteps.map((step, index) => (
            <div key={index} className="process-step">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="technical-section">
          <div className="tech-header">
            <h3 className="technical-title">Our Technology</h3>
            <p className="tech-subtitle">
              Powered by cutting-edge AI and machine learning technologies designed for cultural sensitivity
            </p>
          </div>
          
          <div className="tech-features">
            <div className="tech-feature">
              <div className="tech-icon-wrapper">
                <div className="tech-icon">🖼️</div>
              </div>
              <div className="tech-content">
                <h4>Computer Vision</h4>
                <p>Advanced image processing algorithms analyze visual elements, facial expressions, clothing, and cultural symbols with high precision</p>
              </div>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon-wrapper">
                <div className="tech-icon">📝</div>
              </div>
              <div className="tech-content">
                <h4>Natural Language Processing</h4>
                <p>State-of-the-art NLP models process text prompts to understand context, sentiment, and identify potential cultural biases</p>
              </div>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon-wrapper">
                <div className="tech-icon">🌍</div>
              </div>
              <div className="tech-content">
                <h4>Cultural Intelligence</h4>
                <p>Comprehensive database containing cultural nuances, traditions, and sensitivity markers from diverse global communities</p>
              </div>
            </div>
            
            <div className="tech-feature">
              <div className="tech-icon-wrapper">
                <div className="tech-icon">🎯</div>
              </div>
              <div className="tech-content">
                <h4>Bias Detection Engine</h4>
                <p>Sophisticated machine learning models trained on diverse datasets to identify subtle forms of cultural stereotypes and harmful biases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;