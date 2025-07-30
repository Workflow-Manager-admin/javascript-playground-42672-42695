import React, { useState, useEffect } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';
import OutputPanel from './components/OutputPanel';
import Header from './components/Header';
import Footer from './components/Footer';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component for the JavaScript playground.
   * Manages theme, code execution, and overall layout.
   */
  const [theme, setTheme] = useState('light');
  const [code, setCode] = useState('// Welcome to JavaScript Playground!\nconsole.log("Hello, World!");\n\n// Try writing some JavaScript code here\nconst greeting = "Welcome to the playground!";\nconsole.log(greeting);');
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    /**
     * Toggles between light and dark themes.
     */
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const executeCode = React.useCallback(async () => {
    /**
     * Executes JavaScript code in a sandboxed environment and captures output.
     */
    setIsExecuting(true);
    setOutput('');

    try {
      // Create a sandboxed execution environment
      const logs = [];
      const errors = [];

      const mockConsole = {
        log: (...args) => logs.push(`LOG: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`),
        error: (...args) => errors.push(`ERROR: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`),
        warn: (...args) => logs.push(`WARN: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`),
        info: (...args) => logs.push(`INFO: ${args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' ')}`)
      };

      // Execute code in a try-catch block
      try {
        // Create a function to execute the code with mock console
        const executeFunction = new Function('console', code);
        executeFunction(mockConsole);
      } catch (executionError) {
        errors.push(`EXECUTION ERROR: ${executionError.message}`);
      }

      // Combine logs and errors for output
      const allOutput = [...logs, ...errors];
      setOutput(allOutput.length > 0 ? allOutput.join('\n') : 'Code executed successfully (no output)');

    } catch (error) {
      setOutput(`SYSTEM ERROR: ${error.message}`);
    } finally {
      setIsExecuting(false);
    }
  }, [code]);

  // PUBLIC_INTERFACE
  const saveCode = () => {
    /**
     * Saves the current code to localStorage.
     */
    const timestamp = new Date().toISOString();
    const savedSnippets = JSON.parse(localStorage.getItem('jsPlaygroundSnippets') || '[]');
    const newSnippet = {
      id: Date.now(),
      code,
      timestamp,
      name: `Snippet ${savedSnippets.length + 1}`
    };
    
    savedSnippets.push(newSnippet);
    localStorage.setItem('jsPlaygroundSnippets', JSON.stringify(savedSnippets));
    
    // Simple feedback (could be enhanced with toast notifications)
    alert('Code snippet saved!');
  };

  // PUBLIC_INTERFACE
  const shareCode = () => {
    /**
     * Shares the current code via URL or clipboard.
     */
    const encodedCode = encodeURIComponent(code);
    const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodedCode}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'JavaScript Playground Code',
        text: 'Check out this JavaScript code!',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('Share link copied to clipboard!');
      }).catch(() => {
        prompt('Copy this link to share:', shareUrl);
      });
    }
  };

  // PUBLIC_INTERFACE
  const clearOutput = () => {
    /**
     * Clears the output panel.
     */
    setOutput('');
  };

  // Load code from URL parameters on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('code');
    if (sharedCode) {
      try {
        setCode(decodeURIComponent(sharedCode));
      } catch (error) {
        console.error('Failed to load shared code:', error);
      }
    }
  }, []);

  // Handle custom events from child components
  useEffect(() => {
    const handleExecuteRequest = () => {
      executeCode();
    };

    document.addEventListener('requestCodeExecution', handleExecuteRequest);

    return () => {
      document.removeEventListener('requestCodeExecution', handleExecuteRequest);
    };
  }, [executeCode]);

  return (
    <div className="App">
      <Header 
        theme={theme} 
        onToggleTheme={toggleTheme}
        onExecute={executeCode}
        onSave={saveCode}
        onShare={shareCode}
        isExecuting={isExecuting}
      />
      
      <main className="main-content">
        <PanelGroup direction="horizontal" className="panel-group">
          <Panel defaultSize={50} minSize={30} className="editor-panel">
            <CodeEditor 
              code={code}
              onChange={setCode}
              theme={theme}
            />
          </Panel>
          
          <PanelResizeHandle className="panel-resize-handle" />
          
          <Panel defaultSize={50} minSize={30} className="output-panel">
            <OutputPanel 
              output={output}
              isExecuting={isExecuting}
              theme={theme}
              onClearOutput={clearOutput}
            />
          </Panel>
        </PanelGroup>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
