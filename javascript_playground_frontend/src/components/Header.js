import React from 'react';

// PUBLIC_INTERFACE
const Header = ({ theme, onToggleTheme, onExecute, onSave, onShare, isExecuting }) => {
  /**
   * Header component containing brand logo, title, and action buttons.
   * @param {string} theme - Current theme (light/dark)
   * @param {function} onToggleTheme - Function to toggle theme
   * @param {function} onExecute - Function to execute code
   * @param {function} onSave - Function to save code
   * @param {function} onShare - Function to share code
   * @param {boolean} isExecuting - Whether code is currently executing
   */
  
  return (
    <header className="header">
      <div className="header-brand">
        <div className="header-logo">
          JS
        </div>
        <h1 className="header-title">JavaScript Playground</h1>
      </div>
      
      <div className="header-actions">
        <button 
          className="btn btn-primary" 
          onClick={onExecute}
          disabled={isExecuting}
          title="Run JavaScript code (Ctrl+Enter)"
        >
          {isExecuting ? (
            <>
              <div className="spinner"></div>
              Running...
            </>
          ) : (
            <>
              ▶️ Run
            </>
          )}
        </button>
        
        <button 
          className="btn btn-secondary" 
          onClick={onSave}
          title="Save code snippet"
        >
          💾 Save
        </button>
        
        <button 
          className="btn btn-accent" 
          onClick={onShare}
          title="Share code snippet"
        >
          🔗 Share
        </button>
        
        <button 
          className="theme-toggle" 
          onClick={onToggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
