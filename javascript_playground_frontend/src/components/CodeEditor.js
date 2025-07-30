import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

// PUBLIC_INTERFACE
const CodeEditor = ({ code, onChange, theme }) => {
  /**
   * Code editor component using Monaco Editor with JavaScript syntax highlighting.
   * @param {string} code - Current code content  
   * @param {function} onChange - Function called when code changes
   * @param {string} theme - Current theme (light/dark)
   */
  
  const editorRef = useRef(null);

  // PUBLIC_INTERFACE
  const handleEditorDidMount = (editor, monaco) => {
    /**
     * Configures the editor after it mounts.
     */
    editorRef.current = editor;
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      // Trigger code execution via custom event
      window.dispatchEvent(new CustomEvent('executeCode'));
    });

    // Configure editor options
    editor.updateOptions({
      fontSize: 14,
      lineHeight: 20,
      minimap: { enabled: false },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      folding: true,
      lineNumbers: 'on',
      renderWhitespace: 'boundary',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: true,
    });
  };

  // Listen for execute code events
  useEffect(() => {
    const handleExecuteCode = () => {
      // This will be handled by the parent App component
      document.dispatchEvent(new CustomEvent('requestCodeExecution'));
    };

    window.addEventListener('executeCode', handleExecuteCode);
    return () => window.removeEventListener('executeCode', handleExecuteCode);
  }, []);

  const editorTheme = theme === 'dark' ? 'vs-dark' : 'light';

  return (
    <div className="code-editor">
      <div className="editor-header">
        <h3 className="editor-title">📝 Code Editor</h3>
        <div className="editor-info">
          <span title="Press Ctrl+Enter to run code">⌨️ Ctrl+Enter to run</span>
        </div>
      </div>
      
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={onChange}
          onMount={handleEditorDidMount}
          theme={editorTheme}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
