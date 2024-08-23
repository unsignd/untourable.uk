import { FileType, FolderType } from '../types';

export const isFile = (type: FileType | FolderType): type is FileType => {
  return (type as FileType).data !== undefined;
};
