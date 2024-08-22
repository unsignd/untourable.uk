import styled from 'styled-components';
import { Item } from '../components/Item';
import { ItemType } from '../types';

const Container = styled.div`
  width: 100%;
  height: calc(100% - 40px);

  padding: 40px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 48px);
  grid-template-rows: 72px;
  gap: 80px;
`;

export function Landing() {
  return (
    <Container>
      <Item type={ItemType.FOLDER}>about</Item>
      <Item type={ItemType.FOLDER}>project</Item>
      <Item type={ItemType.FOLDER}>stuff!</Item>
      <Item type={ItemType.FILE}>readme.txt</Item>
    </Container>
  );
}
