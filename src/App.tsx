import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { CodeEditor } from './components/CodeEditor';

export default function App() {
  return (
    <div className="h-dvh p-2">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel className="rounded-[10px] border border-gray-500 p-2">
              <div className="h-full">
                <CodeEditor />
              </div>
            </Panel>
            <PanelResizeHandle className="h-2 bg-white" />
            <Panel className="rounded-[10px] border border-gray-500 p-2">
              <div className="h-full bg-primary p-2">Console</div>
            </Panel>
            <PanelResizeHandle className="h-2  " />
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 bg-white" />
        <Panel className="rounded-[10px] border border-gray-500 p-2">
          <div className="h-full bg-primary p-2">Preview</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
