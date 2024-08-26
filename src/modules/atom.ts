import { atom } from 'recoil';
import {
  FileEnum,
  FileType,
  FolderType,
  PositionType,
  WindowType,
} from '../types';

const dataState = atom<(FileType | FolderType)[]>({
  key: 'dataState',
  default: [
    {
      name: 'about',
      children: [
        {
          name: 'awards',
          type: FileEnum.TEXT,
          data: `* 2nd Award, 6th Netmarble Game Academy, 2021
* 3rd Award, Software FUTURE&DREAM Challenge, 2023
* 2nd Award, XdHacks Mini Vancouver, 2024
          `,
        },
        {
          name: 'careers',
          type: FileEnum.TEXT,
          data: `* Senior Frontend Developer, Algorix LLC, 2022 - present
* ???, Trajectory, 2024 - present
* ???, Art Our Community, 2024 - present`,
        },
        {
          name: 'links',
          type: FileEnum.TEXT,
          data: `* https://github.com/unsignd/
* https://instagram.com/untourablealbum/
* https://linkedin.com/in/unsignd/`,
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
      data: `welcome to my space!


* ~/about: brief info about me
* ~/projects: projects ive done
* ~/stuff: shits, useful links, etc.


check out freely
have fun :')`,
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
