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
  grid-template-columns: repeat(auto-fill, 68px);
  grid-template-rows: 80px;
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
          if (!ogPosition) {
            setOgPosition(
              windowList.find((window) => window.id === point.id)!.position
            );
          } else {
            const newPosition = {
              x: ogPosition!.x + event.pageX - point.position.x,
              y: ogPosition!.y + event.pageY - point.position.y,
            };

            setWindowList([
              ...windowList.filter((window) => window.id !== point.id),
              {
                ...windowList.find((window) => window.id === point.id)!,
                position: newPosition,
              },
            ]);
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
          onDoubleClick={(event) =>
            setWindowList([
              ...windowList,
              {
                id: windowList.length,
                name: `~/${data.name}${
                  isFile(data)
                    ? {
                        [FileEnum.TEXT]: '.txt',
                        [FileEnum.IMAGE]: '.png',
                        [FileEnum.VIDEO]: '.mp4',
                      }[data.type]
                    : ''
                }`,
                data: isFile(data)
                  ? {
                      name: data.name,
                      type: data.type,
                      data: data.data,
                    }
                  : {
                      name: data.name,
                      children: data.children,
                    },
                position: {
                  x: event.clientX,
                  y: event.clientY,
                },
              },
            ])
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
      {windowList
        .filter((window) => !window.isDeceased)
        .map((window) => (
          <Window {...window} />
        ))}
    </Container>
  );
}
