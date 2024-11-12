import { useEffect, useRef, useState } from 'react';
import { Terminal as XTerminal } from '@xterm/xterm';
import { FitAddon } from 'xterm-addon-fit';
import '@xterm/xterm/css/xterm.css';

import useWebContainer from '../../providers/WebContainer';

const Terminal = () => {
  const { webContainer } = useWebContainer();
  const [terminal, setTerminal] = useState<XTerminal | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const fitAddonRef = useRef<FitAddon | null>(null);

  //  the use Effect for the resizing observer
  useEffect(() => {
    const resizeObserver = new ResizeObserver(()=>{
        if (fitAddonRef.current){
            fitAddonRef.current.fit()
        }
    });

    if (terminalRef.current) {
      resizeObserver.observe(terminalRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);
  useEffect(() => {
    // creating the basic instance of the terminal object
    const terminalInstance = new XTerminal({ convertEol: true });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;
    // attaching the terminal to the div
    if (terminalRef.current) {
      terminalInstance.loadAddon(fitAddon);
      terminalInstance.open(terminalRef.current);
      fitAddon.fit();
      setTerminal(terminalInstance);
    }
    //Disposing the terminal ref when the component is unmounted or the use Effect is again rendered
    return () => {
      terminalInstance.dispose();
      setTerminal(null);
    };
  }, [terminalRef]);

  //   creating. the useEffect to handle the webcontainer instance
  useEffect(() => {
    if (!webContainer || !terminal) return;
    // handling the webcontainer instance
    const startShell = async () => {
      // Here we are using spawn to start the rserver process we also provides us the shell type it should start along with providing terminal size as the extra parameters
      const shellProcess = await webContainer.spawn('jsh', [], {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });
      //   Here we are piping all the output from the server to the terminal in terms of the writeable stream and we are wiriting it on to the terminal
      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        }),
      );
      //    Here we are creating the input stream object of the server and we are using obsrver method whenever the user writes it into the terminal the same data is written into the inpout of the server
      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });
      //   In end we are the returning the shell Process
      return shellProcess;

      /**The shell Process has following properties attached to it which are
       * Output: The output stream of the shell process
       * Input: The input stream of the shell process
       * kill: The method to quit the shell process\
       * exit: The command to exit the shell Process
       *
       */
    };
    startShell();
  }, [webContainer, terminal]);
  return (
    <div className="h-full border-2 border-white">
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
};

export default Terminal;
