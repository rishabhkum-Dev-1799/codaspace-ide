import { useState } from 'react';
import { Editor } from '@monaco-editor/react';
import { VITE_REACT_TEMPLATE } from '../../templates/react-vite';
import FileTabs from './FileTabs';

function CodeEditor() {
  const [activeFile, setActiveFile] = useState<string>(
    VITE_REACT_TEMPLATE.entryFile,
  );

  const currentFile = VITE_REACT_TEMPLATE.files[activeFile];

  // component functions
  const onFileChange = (fileName: string) => {
    setActiveFile(() => fileName);
  };
  return (
    <div className="h-full ">
      <FileTabs
        activeFile={activeFile}
        onFileChange={onFileChange}
        files={VITE_REACT_TEMPLATE.visibleFiles}
      />
      <Editor
        theme="vs-dark"
        path={activeFile}
        defaultValue={currentFile.content}
      />
    </div>
  );
}

export default CodeEditor;
