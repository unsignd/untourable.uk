import styled from 'styled-components';
import { Text } from './Text';
import { FileType, FolderType } from '../types';
import { ReactComponent as FileSVG } from '../assets/file_48.svg';
import { ReactComponent as FolderSVG } from '../assets/folder_48.svg';
import { isFile } from '../utils';
import { ReactNode } from 'react';

const Container = styled.div`
  width: 68px;
  height: 92px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  cursor: pointer;

  &:hover {
    border: 1px dotted #808080;
  }
`;

const FileName = styled(Text)`
  width: 120px;

  text-align: center;

  overflow-wrap: anywhere;
  pointer-events: none;
`;

export function Item({
  children,
  type,
}: {
  children: ReactNode;
  type: FileType | FolderType;
}) {
  return (
    <Container>
      {isFile(type) ? <FileSVG /> : <FolderSVG />}
      <FileName>{children}</FileName>
    </Container>
  );
}
