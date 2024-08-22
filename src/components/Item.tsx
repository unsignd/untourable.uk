import styled from 'styled-components';
import { Text } from './Text';
import { ItemType } from '../types';
import { ReactComponent as FileSVG } from '../assets/file.svg';
import { ReactComponent as FolderSVG } from '../assets/folder.svg';

const Container = styled.div`
  width: 68px;
  height: 92px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    border: 1px dotted #808080;
  }
`;

const FileName = styled(Text)`
  width: 120px;

  text-align: center;

  overflow-wrap: anywhere;
`;

export function Item({ children, type }: { children: string; type: ItemType }) {
  return (
    <Container>
      {{ [ItemType.FILE]: <FileSVG />, [ItemType.FOLDER]: <FolderSVG /> }[type]}
      <FileName>{children}</FileName>
    </Container>
  );
}
