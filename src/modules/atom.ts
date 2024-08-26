import { atom } from 'recoil';
import {
  FileEnum,
  FileType,
  FolderType,
  PositionType,
  WindowType,
} from '../types';
import { readme } from '../assets/raw';

const dataState = atom<(FileType | FolderType)[]>({
  key: 'dataState',
  default: [
    {
      name: 'aboutasdfasdfadf',
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
      name: 'stuff',
      children: [],
    },
    {
      name: 'readme',
      type: FileEnum.TEXT,
      data: readme,
    },
  ],
});

const windowListState = atom<WindowType[]>({
  key: 'windowState',
  default: [],
});

const pointState = atom<
  | {
      id: number;
      position: PositionType;
    }
  | undefined
>({
  key: 'pointState',
  default: undefined,
});

export { dataState, windowListState, pointState };
