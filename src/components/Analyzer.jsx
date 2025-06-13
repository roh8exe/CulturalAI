import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, MicOff, Play, Trash2, RefreshCw, FileImage, AlertTriangle, CheckCircle, Info, TrendingUp, Shield, Eye } from 'lucide-react';
import '../styles/Analyzer.css';

const Analyzer = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize Speech Recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setPrompt(prev => prev + ' ' + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        setImageFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const changeImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const clearAll = () => {
    setResults(null);
    setPrompt('');
    removeImage({ preventDefault: () => {}, stopPropagation: () => {} });
  };

  const analyzeContent = async () => {
    if (!image || !prompt.trim()) {
      alert('Please upload an image and enter a prompt');
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const confidenceScore = Math.floor(Math.random() * 30) + 70;
      const riskLevel = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
      const hasIssues = Math.random() > 0.4;
      
      setResults({
        confidenceScore,
        overallRisk: riskLevel,
        contentAnalysis: {
          mainElements: [
            "Traditional cultural clothing and symbols",
            "Contextual background elements", 
            "Facial expressions and body language",
            "Color schemes and artistic composition"
          ],
          description: "Advanced AI analysis has identified multiple cultural and visual elements within the image. The system has processed visual patterns, symbolic representations, and contextual cues to provide comprehensive content assessment."
        },
        riskAssessment: {
          level: riskLevel,
          hasIssues,
          explanation: hasIssues 
            ? "The analysis has identified several elements that may contribute to cultural oversimplification or inappropriate representation. The content appears to rely on surface-level markers without providing deeper contextual understanding, potentially reinforcing stereotypes."
            : "The content representation appears to be handled with appropriate sensitivity. The image demonstrates awareness of cultural nuance and avoids obvious problematic portrayals."
        },
        culturalFindings: hasIssues ? [
          "Oversimplified representation of cultural elements",
          "Potential reinforcement of stereotypical patterns", 
          "Limited contextual depth for authentic understanding",
          "Risk of perpetuating cultural misconceptions",
          "May contribute to reductive cultural narratives"
        ] : [
          "Respectful portrayal of cultural elements",
          "Appropriate contextual representation",
          "Avoids obvious stereotypical markers",
          "Demonstrates cultural awareness"
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  // Icon Components
  const UploadIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const MicIcon = ({ isActive }) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 1C10.3431 1 9 2.34315 9 4V12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12V4C15 2.34315 13.6569 1 12 1Z" fill="currentColor"/>
      <path d="M19 10V12C19 16.4183 15.4183 20 11 20V22H13C13.5523 22 14 22.4477 14 23C14 23.5523 13.5523 24 13 24H11C10.4477 24 10 23.5523 10 23C10 22.4477 10.4477 22 11 22V20C6.58172 20 3 16.4183 3 12V10C3 9.44772 3.44772 9 4 9C4.55228 9 5 9.44772 5 10V12C5 15.3137 7.68629 18 11 18H13C16.3137 18 19 15.3137 19 12V10C19 9.44772 19.4477 9 20 9C20.5523 9 21 9.44772 21 10V12C21 16.4183 17.4183 20 13 20V22H15C15.5523 22 16 22.4477 16 23C16 23.5523 15.5523 24 15 24H13C12.4477 24 12 23.5523 12 23C12 22.4477 12.4477 22 13 22V20C8.58172 20 5 16.4183 5 12V10C5 9.44772 5.44772 9 6 9C6.55228 9 7 9.44772 7 10V12C7 15.3137 9.68629 18 13 18C16.3137 18 19 15.3137 19 12V10Z" fill="currentColor"/>
      {isActive && (
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );

  return (
    <section className="analyzer-section">
      <div className="analyzer-container">
        {/* Header */}
        <div className="analyzer-header">
          <div className="analyzer-badge">
            <span>🔬</span>
            <span>AI-Powered Analysis</span>
          </div>
          
          <h1 className="analyzer-title">Smart Image Analyzer</h1>
          
          <p className="analyzer-description">
            Upload any image and get comprehensive AI analysis for content detection, 
            cultural sensitivity, and bias assessment using advanced machine learning.
          </p>
        </div>

        {/* Upload Section */}
        <div className="upload-section">
          <div className="upload-grid">
            {/* Image Upload Card */}
            <div className="upload-card">
              <div className="card-header">
                <h3>
                  <span>📸</span>
                  Upload Image
                </h3>
                <p className="card-subtitle">Select an image for AI analysis</p>
              </div>
              
              <div 
                className="upload-area" 
                onClick={!image ? () => fileInputRef.current?.click() : undefined}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {image ? (
                  <div className="image-preview">
                    <img src={image} alt="Uploaded content" className="uploaded-image" />
                    <div className="image-overlay">
                      <div className="image-actions">
                        <button 
                          className="action-btn change-btn"
                          onClick={changeImage}
                          title="Change Image"
                        >
                          🔄
                        </button>
                        <button 
                          className="action-btn remove-btn"
                          onClick={removeImage}
                          title="Remove Image"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon-container">
                      <UploadIcon />
                    </div>
                    <h4>Drag & drop or click to upload</h4>
                    <p>JPG, PNG, GIF, WebP up to 10MB</p>
                    <div className="upload-features">
                      <span className="feature-tag">✓ AI Analysis</span>
                      <span className="feature-tag">✓ Fast Processing</span>
                    </div>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </div>
              
              {image && imageFile && (
                <div className="upload-info">
                  <div className="upload-status">
                    <span>✅</span>
                    <span>Image ready for analysis</span>
                  </div>
                  <div className="file-details">
                    <span className="file-name">{imageFile.name}</span>
                    <span className="file-size">{(imageFile.size / 1024 / 1024).toFixed(1)} MB</span>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Input Card */}
            <div className="upload-card prompt-card">
              <div className="card-header">
                <h3>
                  <span>💬</span>
                  Analysis Prompt
                </h3>
                <p className="card-subtitle">Describe what you want to analyze</p>
              </div>
              
              <div className="prompt-input-container">
                <div className="textarea-wrapper">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe what you want to analyze. For example: 'Check this image for cultural sensitivity, inappropriate content, or bias. Look for stereotypes and assess if the representation is respectful...'"
                    className="prompt-input"
                    maxLength={800}
                  />
                  <div className="input-controls">
                    <button 
                      className={`mic-button ${isListening ? 'listening' : ''}`}
                      onClick={isListening ? stopListening : startListening}
                      disabled={isAnalyzing}
                      title={isListening ? "Stop listening" : "Voice input"}
                    >
                      {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                    </button>
                  </div>
                </div>
                
                {isListening && (
                  <div className="listening-indicator">
                    <div className="listening-animation">
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                      <div className="wave"></div>
                    </div>
                    <span>Listening...</span>
                  </div>
                )}
              </div>
              
              <div className="prompt-footer">
                <div className="char-count">
                  <span className={prompt.length > 600 ? 'warning' : ''}>{prompt.length}/800</span>
                </div>
                <div className="suggestion-tags">
                  <button 
                    className="suggestion-tag"
                    onClick={() => setPrompt("Analyze for cultural stereotypes and inappropriate content")}
                  >
                    Cultural Analysis
                  </button>
                  <button 
                    className="suggestion-tag"
                    onClick={() => setPrompt("Check for bias and safety concerns")}
                  >
                    Safety Check
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Action Section */}
          <div className="action-section">
            <div className="action-buttons">
              <button 
                className={`analyze-button primary ${isAnalyzing ? 'analyzing' : ''}`}
                onClick={analyzeContent}
                disabled={isAnalyzing || !image || !prompt.trim()}
              >
                {isAnalyzing ? (
                  <>
                    <div className="loading-spinner"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    <span>Analyze Image</span>
                  </>
                )}
              </button>
              
              {(image || prompt || results) && (
                <button 
                  className="analyze-button secondary"
                  onClick={clearAll}
                  disabled={isAnalyzing}
                >
                  <span>🔄</span>
                  <span>Clear All</span>
                </button>
              )}
            </div>
            
            <div className="analysis-note">
              <span>💡</span>
              <span>Advanced AI analyzes images for cultural sensitivity, bias, and inappropriate content</span>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {results && (
          <div className="results-section">
            <div className="results-header">
              <h3>📊 Analysis Results</h3>
            </div>
            
            {/* Key Metrics */}
            <div className="metrics-overview">
              <div className="metric-card primary">
                <div className="metric-icon">🎯</div>
                <div className="metric-content">
                  <h4>Confidence Score</h4>
                  <div className="metric-value">{results.confidenceScore}%</div>
                  <div className="metric-bar">
                    <div 
                      className="metric-fill" 
                      style={{ width: `${results.confidenceScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">⚡</div>
                <div className="metric-content">
                  <h4>Risk Level</h4>
                  <div className={`risk-badge risk-${results.overallRisk.toLowerCase()}`}>
                    {results.overallRisk}
                  </div>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon">🔍</div>
                <div className="metric-content">
                  <h4>Issues Status</h4>
                  <div className={`status-badge ${results.riskAssessment.hasIssues ? 'detected' : 'clear'}`}>
                    {results.riskAssessment.hasIssues ? 'Issues Found' : 'All Clear'}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Detailed Results */}
            <div className="results-grid">
              {/* Content Analysis */}
              <div className="result-card highlighted">
                <div className="card-header">
                  <div>
                    <div className="card-icon">🔬</div>
                    <h4>Content Analysis</h4>
                  </div>
                  <div className={`severity-indicator ${results.overallRisk.toLowerCase()}`}></div>
                </div>
                <div className="analysis-content">
                  <p>{results.contentAnalysis.description}</p>
                  <div className="content-elements">
                    <h5>Key Elements Identified:</h5>
                    <ul className="elements-list">
                      {results.contentAnalysis.mainElements.map((element, index) => (
                        <li key={index}>
                          <span className="element-marker">•</span>
                          <span>{element}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Risk Assessment */}
              <div className="result-card">
                <div className="card-header">
                  <div>
                    <div className="card-icon">⚠️</div>
                    <h4>Risk Assessment</h4>
                  </div>
                  <div className={`severity-indicator ${results.riskAssessment.level.toLowerCase()}`}></div>
                </div>
                <div className="analysis-content">
                  <p>{results.riskAssessment.explanation}</p>
                  <div className="content-tags">
                    <span className={`content-tag severity-${results.riskAssessment.level.toLowerCase()}`}>
                      Risk: {results.riskAssessment.level}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Cultural Findings */}
              <div className="result-card full-width">
                <div className="card-header">
                  <div>
                    <div className="card-icon">🌍</div>
                    <h4>Key Findings</h4>
                  </div>
                  <div className="count-badge">{results.culturalFindings.length}</div>
                </div>
                <div className="findings-list">
                  {results.culturalFindings.map((item, index) => (
                    <div key={index} className="finding-item">
                      <div className="finding-marker">
                        {results.riskAssessment.hasIssues ? '⚠️' : '✅'}
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Disclaimer */}
            <div className="disclaimer">
              <div className="disclaimer-icon">ℹ️</div>
              <div className="disclaimer-content">
                <p><strong>Notice:</strong> This AI analysis provides preliminary assessment. For comprehensive evaluation, consult with relevant experts and community representatives.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Analyzer;