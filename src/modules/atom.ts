import { atom } from 'recoil';
import { FileEnum, FileType, FolderType } from '../types';

const dataState = atom<(FileType | FolderType)[]>({
  key: 'dataState',
  default: [
    {
      name: 'about',
      children: [
        {
          name: 'award',
          type: FileEnum.TEXT,
          data: '',
        },
        {
          name: 'career',
          type: FileEnum.TEXT,
          data: '',
        },
        {
          name: 'link',
          type: FileEnum.TEXT,
          data: '',
        },
      ],
    },
    {
      name: 'project',
      children: [],
    },
    {
      name: 'stuff!',
      children: [],
    },
    {
      name: 'readme',
      type: FileEnum.TEXT,
      data: '',
    },
  ],
});

export { dataState };
