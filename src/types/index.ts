export type PositionType = {
  x: number;
  y: number;
};

export enum FileEnum {
  TEXT,
  IMAGE,
  VIDEO,
}

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
  folder: FolderType;
  position: PositionType;
  isDeceased?: boolean;
};
