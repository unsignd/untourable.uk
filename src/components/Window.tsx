import styled from 'styled-components';
import { Text } from './Text';
import { useState } from 'react';
import { FileEnum, WindowType } from '../types';
import { ReactComponent as CancelSVG } from '../assets/cancel_10.svg';
import { ReactComponent as MinimizeSVG } from '../assets/minimize_10.svg';
import { Item } from './Item';
import { isFile } from '../utils';
import { useRecoilState } from 'recoil';
import { pointState, windowListState } from '../modules/atom';

const Container = styled.div<{
  $x: number;
  $y: number;
  $isMinimized: boolean;
}>`
  width: 640px;
  height: ${(props) => (props.$isMinimized ? 41 : 400)}px;

  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;

  background-color: #000;
  border: 1px solid #808080;

  transition: height 50ms ease;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  border-bottom: 1px solid #808080;

  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;

  &:active {
    cursor: grabbing;
    cursor: -moz-grabbing;
    cursor: -webkit-grabbing;
  }
`;

const TitleText = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  flex-shrink: 0;
`;

const Button = styled.button`
  width: 20px;
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #fff;
  background-color: #000;
  border: 1px solid #808080;

  cursor: pointer;

  &:hover {
    color: #000;
    background-color: #fff;
    border: none;
  }
`;

const TextContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);

  padding: 10px;
`;

const FinderContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);

  padding: 40px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 68px);
  grid-template-rows: 72px;
  gap: 80px;
`;

export function Window({ id, name, data, position }: WindowType) {
  const [isMinimized, setIsMinimzed] = useState<boolean>(false);

  const [windowList, setWindowList] = useRecoilState(windowListState);
  const [, setPoint] = useRecoilState(pointState);

  return (
    <Container $x={position.x} $y={position.y} $isMinimized={isMinimized}>
      <HeaderContainer
        onMouseDown={(event) =>
          setPoint({
            id,
            position: {
              x: event.pageX,
              y: event.pageY,
            },
          })
        }
      >
        <TitleText>{name}</TitleText>
        <ButtonGroup>
          <Button
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();

              setIsMinimzed(!isMinimized);
            }}
          >
            <MinimizeSVG />
          </Button>
          <Button
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => {
              event.stopPropagation();

              setWindowList([
                ...windowList.filter((window) => window.id !== id),
                {
                  ...windowList.find((window) => window.id === id)!,
                  isDeceased: true,
                },
              ]);
            }}
          >
            <CancelSVG />
          </Button>
        </ButtonGroup>
      </HeaderContainer>
      {isFile(data) ? (
        <TextContainer>
          <Text>{data.data}</Text>
        </TextContainer>
      ) : (
        <FinderContainer>
          {data.children.map((child) => (
            <Item
              type={child}
              onDoubleClick={() => {
                if (!isFile(child)) {
                  setWindowList([
                    ...windowList.filter((window) => window.id !== id),
                    {
                      ...windowList.find((window) => window.id === id)!,
                      name: `${name}/${child.name}`,
                      data: {
                        name: child.name,
                        children: child.children,
                      },
                    },
                  ]);
                }
              }}
            >
              {child.name}
              {isFile(child)
                ? {
                    [FileEnum.TEXT]: '.txt',
                    [FileEnum.IMAGE]: '.png',
                    [FileEnum.VIDEO]: '.mp4',
                  }[child.type]
                : ''}
            </Item>
          ))}
        </FinderContainer>
      )}
    </Container>
  );
}
