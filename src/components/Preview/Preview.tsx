import { useEffect, useRef } from 'react';
import useWebContainer from '../../providers/WebContainer';

const Preview = () => {
  const { webContainer } = useWebContainer();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  //    handling the side effects
  useEffect(() => {
    if (!webContainer || !iframeRef.current) return;
    webContainer.on('server-ready',(_,url)=>{
        iframeRef.current!.src = url
    })
  }, [webContainer]);
  return (
    <iframe ref={iframeRef} className="h-full w-full text-white" src="loading.html" />
  );
};

export default Preview;
