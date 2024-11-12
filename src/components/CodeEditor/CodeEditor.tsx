import { useState } from 'react';
import { Editor } from '@monaco-editor/react';

import { VITE_REACT_TEMPLATE } from '../../templates/react-vite';
import FileTabs from './FileTabs';
import { getLanguageFromFileName } from './getLanguageFromFileName';
import useWebContainer from '../../providers/WebContainer';
import { FileNode } from '@webcontainer/api';

function CodeEditor() {
  const {webContainer} = useWebContainer();
  const [activeFile, setActiveFile] = useState<string>(
    VITE_REACT_TEMPLATE.entry,
  );

  const currentFile = VITE_REACT_TEMPLATE.files[activeFile] as FileNode;

  // component functions
  const onFileChange = (fileName: string) => {
    setActiveFile(() => fileName);
  };

  const onhandleCodeChange = async(content:string)=>{
      if (!webContainer) return;
      await webContainer.fs.writeFile(activeFile,content)
  }
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
        onChange={value=>onhandleCodeChange(value || "")}
        defaultValue={currentFile?.file?.contents as string}
        defaultLanguage={getLanguageFromFileName(activeFile)}
      />
    </div>
  );
}

export default CodeEditor;
