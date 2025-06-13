import React, { useState, useRef, useEffect } from 'react';
import { Upload, Mic, MicOff, Play, Trash2, RefreshCw, FileImage, AlertTriangle, CheckCircle, Info, TrendingUp, Shield, Eye, Zap, Brain, Target } from 'lucide-react';
import '../styles/Analyzer.css';

const Analyzer = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [expandedCard, setExpandedCard] = useState(null);
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
    setExpandedCard(null);
    removeImage({ preventDefault: () => {}, stopPropagation: () => {} });
  };

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const analyzeContent = async () => {
    if (!image || !prompt.trim()) {
      alert('Please upload an image and enter a prompt');
      return;
    }

    setIsAnalyzing(true);
    setExpandedCard(null);
    
    // Simulate API call with realistic delay
    setTimeout(() => {
      const confidenceScore = Math.floor(Math.random() * 30) + 70;
      const riskLevel = ["Low", "Medium", "High"][Math.floor(Math.random() * 3)];
      const hasIssues = Math.random() > 0.4;
      const processingTime = (Math.random() * 2 + 1).toFixed(1);
      
      setResults({
        confidenceScore,
        overallRisk: riskLevel,
        processingTime,
        elementsDetected: Math.floor(Math.random() * 15) + 8,
        contentAnalysis: {
          mainElements: [
            "Traditional cultural clothing and symbols",
            "Contextual background elements", 
            "Facial expressions and body language",
            "Color schemes and artistic composition"
          ],
          description: "Advanced AI analysis has identified multiple cultural and visual elements within the image. The system has processed visual patterns, symbolic representations, and contextual cues to provide comprehensive content assessment.",
          tags: ["Cultural Content", "Visual Elements", "Symbolic Representation"]
        },
        riskAssessment: {
          level: riskLevel,
          hasIssues,
          score: Math.floor(Math.random() * 40) + 60,
          explanation: hasIssues 
            ? "The analysis has identified several elements that may contribute to cultural oversimplification or inappropriate representation."
            : "The content representation appears to be handled with appropriate sensitivity and cultural awareness.",
          categories: [
            { name: "Cultural Sensitivity", score: Math.floor(Math.random() * 30) + 70, status: hasIssues ? "Warning" : "Clear" },
            { name: "Stereotype Risk", score: Math.floor(Math.random() * 40) + 60, status: hasIssues ? "Medium" : "Low" },
            { name: "Contextual Accuracy", score: Math.floor(Math.random() * 35) + 65, status: "Good" }
          ]
        },
        culturalFindings: hasIssues ? [
          { type: "warning", text: "Oversimplified representation of cultural elements" },
          { type: "warning", text: "Potential reinforcement of stereotypical patterns" },
          { type: "info", text: "Limited contextual depth for authentic understanding" },
          { type: "warning", text: "Risk of perpetuating cultural misconceptions" }
        ] : [
          { type: "success", text: "Respectful portrayal of cultural elements" },
          { type: "success", text: "Appropriate contextual representation" },
          { type: "success", text: "Avoids obvious stereotypical markers" },
          { type: "info", text: "Demonstrates cultural awareness" }
        ],
        technicalDetails: {
          imageSize: `${imageFile.width || 1920}x${imageFile.height || 1080}`,
          fileSize: (imageFile.size / 1024 / 1024).toFixed(1),
          format: imageFile.type?.split('/')[1]?.toUpperCase() || 'JPEG',
          colorProfile: "sRGB"
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRiskColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'warning': return '⚠️';
      case 'error': return '❌';
      default: return 'ℹ️';
    }
  };

  return (
    <section id="analyzer" className="analyzer-section">
      <div className="analyzer-container">
        {/* Enhanced Header */}
        <div className="analyzer-header">
          <div className="analyzer-badge">
            <Brain size={16} />
            <span>AI-Powered Analysis</span>
            <div className="badge-glow"></div>
          </div>
          
          <h1 className="analyzer-title">
            <span className="title-gradient">Smart Image Analyzer</span>
            <div className="title-underline"></div>
          </h1>
          
          <p className="analyzer-description">
            Upload any image and get comprehensive AI analysis for content detection, 
            cultural sensitivity, and bias assessment using advanced machine learning algorithms.
          </p>

          <div className="feature-highlights">
            <div className="feature-item">
              <Zap size={16} />
              <span>Real-time Analysis</span>
            </div>
            <div className="feature-item">
              <Shield size={16} />
              <span>Cultural Sensitivity</span>
            </div>
            <div className="feature-item">
              <Target size={16} />
              <span>Bias Detection</span>
            </div>
          </div>
        </div>

        {/* Enhanced Upload Section */}
        <div className="upload-section">
          <div className="upload-grid">
            {/* Image Upload Card */}
            <div className="upload-card image-card">
              <div className="card-header">
                <div className="header-content">
                  <div className="card-icon">
                    <FileImage size={20} />
                  </div>
                  <div>
                    <h3>Upload Image</h3>
                    <p className="card-subtitle">Select an image for AI analysis</p>
                  </div>
                </div>
                <div className="card-status">
                  {image ? <CheckCircle size={20} className="status-success" /> : <Upload size={20} className="status-pending" />}
                </div>
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
                          <RefreshCw size={16} />
                        </button>
                        <button 
                          className="action-btn remove-btn"
                          onClick={removeImage}
                          title="Remove Image"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <div className="upload-icon-container">
                      <Upload size={32} />
                      <div className="upload-pulse"></div>
                    </div>
                    <h4>Drag & drop or click to upload</h4>
                    <p>Supports JPG, PNG, GIF, WebP up to 10MB</p>
                    <div className="upload-features">
                      <span className="feature-tag">
                        <Zap size={12} />
                        AI Analysis
                      </span>
                      <span className="feature-tag">
                        <Brain size={12} />
                        Smart Processing
                      </span>
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
                    <CheckCircle size={16} />
                    <span>Ready for analysis</span>
                  </div>
                  <div className="file-details">
                    <div className="file-name">{imageFile.name}</div>
                    <div className="file-meta">
                      <span>{(imageFile.size / 1024 / 1024).toFixed(1)} MB</span>
                      <span>•</span>
                      <span>{imageFile.type?.split('/')[1]?.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Prompt Input Card */}
            <div className="upload-card prompt-card">
              <div className="card-header">
                <div className="header-content">
                  <div className="card-icon">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h3>Analysis Prompt</h3>
                    <p className="card-subtitle">Describe what you want to analyze</p>
                  </div>
                </div>
                <div className="card-status">
                  {prompt.trim() ? <CheckCircle size={20} className="status-success" /> : <Info size={20} className="status-pending" />}
                </div>
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
                      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                      {isListening && <div className="mic-pulse"></div>}
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
                    <span>Listening for input...</span>
                  </div>
                )}
              </div>
              
              <div className="prompt-footer">
                <div className="char-count">
                  <span className={prompt.length > 600 ? 'warning' : ''}>{prompt.length}/800 characters</span>
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

          {/* Enhanced Action Section */}
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
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Brain size={20} />
                    <span>Start Analysis</span>
                  </>
                )}
              </button>
              
              {(image || prompt || results) && (
                <button 
                  className="analyze-button secondary"
                  onClick={clearAll}
                  disabled={isAnalyzing}
                >
                  <RefreshCw size={18} />
                  <span>Clear All</span>
                </button>
              )}
            </div>
            
            <div className="analysis-note">
              <Info size={16} />
              <span>Advanced AI technology for comprehensive image analysis and cultural sensitivity assessment</span>
            </div>
          </div>
        </div>

        {/* Compact Results Section */}
        {results && (
          <div className="results-section">
            <div className="results-header">
              <div className="results-title">
                <Target size={24} />
                <h3>Analysis Complete</h3>
              </div>
              <div className="results-summary">
                <div className="summary-item">
                  <span className="summary-label">Processed in</span>
                  <span className="summary-value">{results.processingTime}s</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Elements detected</span>
                  <span className="summary-value">{results.elementsDetected}</span>
                </div>
              </div>
            </div>
            
            {/* Compact Key Metrics */}
            <div className="metrics-compact">
              <div className="metric-item primary">
                <div className="metric-header">
                  <TrendingUp size={18} />
                  <span>Confidence</span>
                </div>
                <div className="metric-value-large">{results.confidenceScore}%</div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill" 
                    style={{ width: `${results.confidenceScore}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="metric-item">
                <div className="metric-header">
                  <Shield size={18} />
                  <span>Risk Level</span>
                </div>
                <div className={`risk-badge compact risk-${results.overallRisk.toLowerCase()}`}>
                  {results.overallRisk}
                </div>
              </div>
              
              <div className="metric-item">
                <div className="metric-header">
                  <Eye size={18} />
                  <span>Status</span>
                </div>
                <div className={`status-badge compact ${results.riskAssessment.hasIssues ? 'detected' : 'clear'}`}>
                  {results.riskAssessment.hasIssues ? 'Issues Found' : 'All Clear'}
                </div>
              </div>
            </div>
            
            {/* Compact Results Cards */}
            <div className="results-compact">
              {/* Content Analysis Card */}
              <div className="result-card-compact">
                <div className="card-compact-header" onClick={() => toggleCard('content')}>
                  <div className="card-compact-title">
                    <Brain size={18} />
                    <span>Content Analysis</span>
                    <div className="analysis-tags">
                      {results.contentAnalysis.tags.map((tag, index) => (
                        <span key={index} className="analysis-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="card-toggle">
                    <div className={`toggle-icon ${expandedCard === 'content' ? 'expanded' : ''}`}>
                      <TrendingUp size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="card-compact-preview">
                  <p>{results.contentAnalysis.description.substring(0, 120)}...</p>
                </div>
                
                {expandedCard === 'content' && (
                  <div className="card-compact-details">
                    <div className="content-elements-compact">
                      <h5>Key Elements:</h5>
                      <div className="elements-grid">
                        {results.contentAnalysis.mainElements.map((element, index) => (
                          <div key={index} className="element-chip">
                            <span className="element-dot"></span>
                            <span>{element}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Risk Assessment Card */}
              <div className="result-card-compact">
                <div className="card-compact-header" onClick={() => toggleCard('risk')}>
                  <div className="card-compact-title">
                    <Shield size={18} />
                    <span>Risk Assessment</span>
                    <div className="risk-score" style={{ color: getRiskColor(results.riskAssessment.level) }}>
                      {results.riskAssessment.score}/100
                    </div>
                  </div>
                  <div className="card-toggle">
                    <div className={`toggle-icon ${expandedCard === 'risk' ? 'expanded' : ''}`}>
                      <AlertTriangle size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="card-compact-preview">
                  <p>{results.riskAssessment.explanation}</p>
                </div>
                
                {expandedCard === 'risk' && (
                  <div className="card-compact-details">
                    <div className="risk-categories">
                      {results.riskAssessment.categories.map((category, index) => (
                        <div key={index} className="risk-category-item">
                          <div className="category-info">
                            <span className="category-name">{category.name}</span>
                            <span className={`category-status status-${category.status.toLowerCase()}`}>
                              {category.status}
                            </span>
                          </div>
                          <div className="category-score">
                            <div className="score-bar">
                              <div 
                                className="score-fill" 
                                style={{ width: `${category.score}%` }}
                              ></div>
                            </div>
                            <span>{category.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Cultural Findings Card */}
              <div className="result-card-compact">
                <div className="card-compact-header" onClick={() => toggleCard('findings')}>
                  <div className="card-compact-title">
                    <Eye size={18} />
                    <span>Key Findings</span>
                    <div className="findings-count">{results.culturalFindings.length}</div>
                  </div>
                  <div className="card-toggle">
                    <div className={`toggle-icon ${expandedCard === 'findings' ? 'expanded' : ''}`}>
                      <Info size={16} />
                    </div>
                  </div>
                </div>
                
                <div className="card-compact-preview">
                  <div className="findings-summary">
                    {results.culturalFindings.slice(0, 2).map((finding, index) => (
                      <div key={index} className="finding-preview">
                        <span className="finding-icon">{getStatusIcon(finding.type)}</span>
                        <span className="finding-text">{finding.text.substring(0, 50)}...</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {expandedCard === 'findings' && (
                  <div className="card-compact-details">
                    <div className="findings-list-compact">
                      {results.culturalFindings.map((finding, index) => (
                        <div key={index} className={`finding-item-compact finding-${finding.type}`}>
                          <div className="finding-marker">{getStatusIcon(finding.type)}</div>
                          <span className="finding-text">{finding.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Technical Details Compact */}
            <div className="technical-details-compact">
              <h4>Technical Details</h4>
              <div className="tech-grid">
                <div className="tech-item">
                  <span className="tech-label">Resolution</span>
                  <span className="tech-value">{results.technicalDetails.imageSize}</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">File Size</span>
                  <span className="tech-value">{results.technicalDetails.fileSize} MB</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Format</span>
                  <span className="tech-value">{results.technicalDetails.format}</span>
                </div>
                <div className="tech-item">
                  <span className="tech-label">Color Profile</span>
                  <span className="tech-value">{results.technicalDetails.colorProfile}</span>
                </div>
              </div>
            </div>
            
            {/* Compact Disclaimer */}
            <div className="disclaimer-compact">
              <AlertTriangle size={16} />
              <span>
                <strong>Notice:</strong> This AI analysis provides preliminary assessment. 
                For comprehensive evaluation, consult with relevant experts.
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Analyzer;