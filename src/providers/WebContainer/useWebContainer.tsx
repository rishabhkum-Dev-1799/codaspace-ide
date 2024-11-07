import { useContext } from 'react';

import { webContainerContext } from './WebContainerProvider';

const useWebContainer = () => {
  const context = useContext(webContainerContext);

  if (!context) {
    throw new Error(
      'useWebContainer must be used within a WebContainerProvider',
    );
  }
  return context;
};

export default useWebContainer;
