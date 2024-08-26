import styled from 'styled-components';
import { Text } from './Text';
import { FileType, FolderType } from '../types';
import { ReactComponent as FileSVG } from '../assets/file_40.svg';
import { ReactComponent as FolderSVG } from '../assets/folder_40.svg';
import { isFile } from '../utils';
import { HTMLAttributes, ReactNode } from 'react';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;

  type: FileType | FolderType;
}

const Container = styled.div`
  width: 68px;
  height: 80px;

  padding: 8px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 8px;

  cursor: pointer;

  &:hover {
    gap: 9px;

    border: 1px dotted #808080;

    & * {
      margin-top: -1px;
    }
  }
`;

const FileName = styled(Text)`
  width: 120px;

  text-align: center;

  overflow-wrap: anywhere;
  pointer-events: none;
`;

export function Item({ children, type, ...props }: ItemProps) {
  return (
    <Container {...props}>
      {isFile(type) ? <FileSVG /> : <FolderSVG />}
      <FileName>{children}</FileName>
    </Container>
  );
}
