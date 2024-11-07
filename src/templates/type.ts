import { FileSystemTree } from "@webcontainer/api";

export type CodeFile = {
  content: string;
};

export type Template = {
  files: FileSystemTree;
  entry: string;
  visibleFiles: string[];
};
