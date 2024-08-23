import { atom } from 'recoil';
import { FileEnum, FileType, FolderType } from '../types';

const dataState = atom<(FileType | FolderType)[]>({
  key: 'dataState',
  default: [
    {
      name: 'about',
      children: [
        {
          name: 'awards',
          type: FileEnum.TEXT,
          data: '',
        },
        {
          name: 'careers',
          type: FileEnum.TEXT,
          data: '',
        },
        {
          name: 'links',
          type: FileEnum.TEXT,
          data: '',
        },
      ],
    },
    {
      name: 'projects',
      children: [
        {
          name: 'projects',
          children: [],
        },
      ],
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

const windowListState = atom<FolderType[]>({
  key: 'windowState',
  default: [],
});

export { dataState, windowListState };
