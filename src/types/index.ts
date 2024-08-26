export enum FileEnum {
  TEXT,
  IMAGE,
  VIDEO,
}

export type PositionType = {
  x: number;
  y: number;
};

export type FileType = {
  name: string;
  type: FileEnum;
  data: string;
};

export type FolderType = {
  name: string;
  children: (FileType | FolderType)[];
};

export type WindowType = {
  id: number;
  name: string;
  data: FileType | FolderType;
  position: PositionType;
  isDeceased?: boolean;
};
