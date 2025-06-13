import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <h1>About Us</h1>
        <div className="about-content">
          <div className="about-box">
            <h2>Our Mission</h2>
            <p>
              CulturalAI is dedicated to promoting cultural awareness and understanding through advanced 
              artificial intelligence technology. We believe that by identifying and analyzing cultural stereotypes, 
              we can help create a more inclusive and respectful global community.
            </p>
          </div>
          
          <div className="about-box">
            <h2>What We Do</h2>
            <p>
              Our platform uses cutting-edge machine learning algorithms to analyze visual and textual content for cultural stereotypes and biases. 
              We provide detailed insights that help individuals and organizations understand the cultural implications of their content.
            </p>
          </div>
          
          <div className="about-box">
            <h2>Why It Matters</h2>
            <p>
              In our interconnected world, cultural sensitivity is more important than ever. 
              Stereotypes can perpetuate harmful biases and create barriers between communities. 
              Our AI tool helps identify these issues before they cause harm, promoting better cross-cultural communication.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;