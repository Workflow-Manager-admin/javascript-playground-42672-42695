import React from 'react';

// PUBLIC_INTERFACE
const Footer = () => {
  /**
   * Footer component with credits and useful links.
   */
  
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>© 2024 JavaScript Playground</span>
        <span>•</span>
        <span>Built with React & Monaco Editor</span>
      </div>
      
      <div className="footer-links">
        <a 
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          📚 JS Docs
        </a>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          🐙 GitHub
        </a>
        <a 
          href="https://reactjs.org" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-link"
        >
          ⚛️ React
        </a>
      </div>
    </footer>
  );
};

export default Footer;
