import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeEditor } from './components/CodeEditor';

import WebContainerProvider from './providers/WebContainer/WebContainerProvider';
import { VITE_REACT_TEMPLATE } from './templates/react-vite';
import { Terminal } from './components/terminal';
import { Preview } from './components/Preview';
export default function App() {
  return (
    <WebContainerProvider template={VITE_REACT_TEMPLATE}>
      <div className="h-dvh p-2">
        <PanelGroup direction="horizontal">
          <Panel>
            <PanelGroup direction="vertical">
              <Panel className=" border border-gray-500 p-2">
                <div className="h-full">
                  <CodeEditor />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-white" />
              <Panel className="border border-gray-500 overflow-hidden">
                <div className="h-full bg-primary py-[10px]">
                  <Terminal />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-white" />
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="w-2 bg-gray-700" />
          <Panel className="border border-gray-50 text-white bg-white/70">
            <Preview />
          </Panel>
        </PanelGroup>
      </div>
    </WebContainerProvider>
  );
}
