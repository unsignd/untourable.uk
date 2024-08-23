import styled from 'styled-components';
import { Item } from '../components/Item';
import { useRecoilState } from 'recoil';
import { dataState, windowListState } from '../modules/atom';
import { isFile } from '../utils';
import { FileEnum } from '../types';
import { Window } from '../components/Window';

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
  const [windowList, setWindowList] = useRecoilState(windowListState);

  return (
    <Container>
      {data.map((data) => (
        <Item
          type={data}
          onDoubleClick={(event) =>
            !isFile(data)
              ? setWindowList([
                  ...windowList,
                  {
                    name: data.name,
                    children: data.children,
                  },
                ])
              : undefined
          }
        >
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
      {windowList.map((window) => (
        <Window {...window} />
      ))}
    </Container>
  );
}
