export const getLanguageFromFileName = (fileName: string) => {
  const extension = fileName.split('.').pop();
  switch (extension) {
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'json':
      return 'json';
    case 'html':
        return 'html';
    default:
        return 'plaintext';
  }
};
