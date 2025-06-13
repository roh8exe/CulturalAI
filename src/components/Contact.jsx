import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Twitter, Linkedin, Github, Youtube, Globe } from 'lucide-react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    
    const googleScriptURL = "https://script.google.com/macros/s/AKfycbw5HxxBkUp2GU45IwyUuNRmPLeCHIl1sPQFKfRWqioZWTVK-3EO-Tzcvf2rlu2Blef15Q/exec";

    try {
      const response = await fetch(googleScriptURL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setIsSubmitted(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      alert("Error sending message.");
      console.error("Error:", error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* Feedback Form Section */}
        <div className="feedback-section">
          <h2 className="section-title">Feedback Form</h2>
          
          {isSubmitted && (
            <div className="success-message">
              <CheckCircle size={20} />
              <span>Message Sent Successfully!</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="contact-form enhanced-form">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input enhanced-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input enhanced-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-textarea enhanced-input"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`analyze-button enhanced-button ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>

        {/* Profile/Info Section */}
        <div className="profile-section enhanced-profile-section">
          <div className="profile-content">
            {/* Address */}
            <div className="address-info">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p>Indian Institute of Technology Gandhinagar</p>
              <p>Palaj, Gandhinagar – 382355, Gujarat</p>
            </div>

            {/* Social Media Links */}
            <div className="social-section">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="social-links">
                <a href="https://x.com/lingoiitgn" className="social-link twitter" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </a>
                <a href="https://www.linkedin.com/company/lingo-labs-iitgn/" className="social-link linkedin" target="_blank" rel="noopener noreferrer">
                  <Linkedin />
                </a>
                <a href="https://github.com/lingo-iitgn" className="social-link github" target="_blank" rel="noopener noreferrer">
                  <Github />
                </a>
                <a href="https://www.youtube.com/@LingoResearchGroupIITGN" className="social-link youtube" target="_blank" rel="noopener noreferrer">
                  <Youtube />
                </a>
                <a href="https://lingo.iitgn.ac.in/" className="social-link website" target="_blank" rel="noopener noreferrer">
                  <Globe />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;