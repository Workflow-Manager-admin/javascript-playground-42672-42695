import React from 'react';

// PUBLIC_INTERFACE
const OutputPanel = ({ output, isExecuting, theme, onClearOutput }) => {
  /**
   * Output panel component to display code execution results.
   * @param {string} output - The execution output to display
   * @param {boolean} isExecuting - Whether code is currently executing
   * @param {string} theme - Current theme (light/dark)
   * @param {function} onClearOutput - Function to clear output
   */

  const renderOutput = () => {
    if (isExecuting) {
      return (
        <div className="output-executing">
          <div className="spinner"></div>
          Executing code...
        </div>
      );
    }

    if (!output) {
      return (
        <div className="output-placeholder">
          Click "Run" to execute your JavaScript code and see the output here.
          <br /><br />
          💡 <strong>Tips:</strong>
          <br />• Use console.log() to print values
          <br />• Try console.error() for error messages  
          <br />• Use console.warn() and console.info() for different message types
          <br />• Press Ctrl+Enter to run code quickly
        </div>
      );
    }

    return <div className="output-text">{output}</div>;
  };

  return (
    <div className="output-panel-container">
      <div className="output-header">
        <h3 className="output-title">📊 Output</h3>
        <div className="output-actions">
          <button 
            className="btn btn-secondary"
            onClick={onClearOutput}
            title="Clear output"
            style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
          >
            🗑️ Clear
          </button>
        </div>
      </div>
      
      <div className="output-content">
        {renderOutput()}
      </div>
    </div>
  );
};

export default OutputPanel;
