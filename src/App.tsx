import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeEditor } from './components/CodeEditor';

export default function App() {
  return (
    <div className="h-dvh p-2">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel className='border border-gray-500 p-2 rounded-[10px]'>
              <div className="h-full">
                <CodeEditor />
              </div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-white" />
            <Panel className='border border-gray-500 p-2 rounded-[10px]'>
              <div className="bg-primary h-full p-2">Console</div>
            </Panel>
            <PanelResizeHandle className="h-2  " />
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 bg-white" />
        <Panel className='border border-gray-500 p-2 rounded-[10px]'>
          <div className="bg-primary h-full p-2">Preview</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
