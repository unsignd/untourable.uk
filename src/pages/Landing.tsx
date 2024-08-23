import styled from 'styled-components';
import { Item } from '../components/Item';
import { useRecoilState } from 'recoil';
import { dataState } from '../modules/atom';
import { isFile } from '../utils';
import { FileEnum } from '../types';

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
  const [data] = useRecoilState(dataState);

  return (
    <Container>
      {data.map((data) => (
        <Item type={data}>
          {data.name}
          {isFile(data)
            ? {
                [FileEnum.TEXT]: '.txt',
                [FileEnum.IMAGE]: '.png',
                [FileEnum.VIDEO]: '.mp4',
              }[data.type]
            : ''}
        </Item>
      ))}
    </Container>
  );
}
