import { createContext, useState, useEffect, PropsWithChildren } from 'react';
import { WebContainer } from '@webcontainer/api';
import { Template } from '../../templates/type';

export const webContainerContext = createContext<{
  webContainer: WebContainer | null;
  template: Template;
}>({
  webContainer: null,
  template: {} as Template,
});

type WebContainerProviderProps = {
  template: Template;
};
export default function WebContainerProvider({
  template,
  children,
}: PropsWithChildren<WebContainerProviderProps>) {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);

  useEffect(() => {
    let webContainerInstance: WebContainer | null = null;
    const initWebContainer = async () => {
      try {
        // This is the first step we need to boot the server ie the webcontainer isntance
        webContainerInstance = await WebContainer.boot();
        // Then we need to mount the files which will  be served to the server
        await webContainerInstance.mount(template.files);
        setWebContainer(webContainerInstance);
      } catch (e) {
        console.log(e);
      }
    };
    initWebContainer();
    // Logic to clean up the webContainer instance when the component is unmounted
  }, [template.files]);

  return (
    <webContainerContext.Provider value={{ webContainer, template }}>
      {children}
    </webContainerContext.Provider>
  );
}
