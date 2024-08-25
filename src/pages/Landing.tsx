import styled from 'styled-components';
import { Item } from '../components/Item';
import { useRecoilState } from 'recoil';
import { dataState, pointState, windowListState } from '../modules/atom';
import { isFile } from '../utils';
import { FileEnum, PositionType } from '../types';
import { Window } from '../components/Window';
import { useState } from 'react';

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
  const [ogPosition, setOgPosition] = useState<PositionType>();

  const [data] = useRecoilState(dataState);
  const [windowList, setWindowList] = useRecoilState(windowListState);
  const [point, setPoint] = useRecoilState(pointState);

  return (
    <Container
      onMouseMove={(event) => {
        if (point) {
          const newPosition = {
            x:
              (ogPosition?.x ??
                windowList.find((window) => window.id === point.id)!.position
                  .x) +
              event.pageX -
              point.position.x,
            y:
              (ogPosition?.y ??
                windowList.find((window) => window.id === point.id)!.position
                  .x) +
              event.pageY -
              point.position.y,
          };

          setWindowList([
            ...windowList.filter((window) => window.id !== point.id),
            {
              ...windowList.find((window) => window.id === point.id)!,
              position: newPosition,
            },
          ]);

          if (!ogPosition) {
            setOgPosition(newPosition);
          }
        }
      }}
      onMouseUp={() => {
        setOgPosition(undefined);
        setPoint(undefined);
      }}
    >
      {data.map((data) => (
        <Item
          type={data}
          onDoubleClick={() =>
            !isFile(data)
              ? setWindowList([
                  ...windowList,
                  {
                    id: windowList.length,
                    folder: {
                      name: data.name,
                      children: data.children,
                    },
                    position: {
                      x: 0,
                      y: 0,
                    },
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
