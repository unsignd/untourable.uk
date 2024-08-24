import styled from 'styled-components';
import { Text } from './Text';
import { useEffect, useState } from 'react';
import { FileEnum, PositionType, WindowType } from '../types';
import { ReactComponent as CancelSVG } from '../assets/cancel_10.svg';
import { ReactComponent as MinimizeSVG } from '../assets/minimize_10.svg';
import { Item } from './Item';
import { isFile } from '../utils';
import { useRecoilState } from 'recoil';
import { windowListState } from '../modules/atom';

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

  transition: height 100ms ease;
  overflow: hidden;
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

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

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
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

const BodyContainer = styled.div`
  width: 100%;
  height: calc(100% - 40px);

  padding: 40px;

  display: grid;
  grid-template-columns: repeat(auto-fill, 48px);
  grid-template-rows: 72px;
  gap: 80px;
`;

export function Window({ id, folder, position, isDeceased }: WindowType) {
  const [, setTempWindow] = useState<WindowType>({
    id,
    folder,
    position,
    isDeceased,
  });
  const [, setStartPosition] = useState<PositionType>();
  const [, setTempPosition] = useState<PositionType>(position);
  const [isMinimized, setIsMinimzed] = useState<boolean>(false);

  const [windowList, setWindowList] = useRecoilState(windowListState);

  useEffect(() => {
    const mouseMoveHandle = (event: MouseEvent) => {
      setStartPosition((startPosition) => {
        if (startPosition) {
          setTempPosition((tempPosition) => {
            setTempWindow((window) => {
              setWindowList([
                ...windowList.filter((window) => window.id !== id),
                {
                  id: window.id,
                  folder: window.folder,
                  position: {
                    x: tempPosition.x + event.pageX - startPosition.x,
                    y: tempPosition.y + event.pageY - startPosition.y,
                  },
                  isDeceased: window.isDeceased,
                },
              ]);

              return {
                id: window.id,
                folder: window.folder,
                position: {
                  x: tempPosition.x + event.pageX - startPosition.x,
                  y: tempPosition.y + event.pageY - startPosition.y,
                },
                isDeceased: window.isDeceased,
              };
            });

            return tempPosition;
          });
        } else {
          setTempWindow((window) => {
            setTempPosition(window.position);

            return window;
          });
        }

        return startPosition;
      });
    };

    const mouseUpHandle = () => {
      setStartPosition(undefined);
    };

    window.addEventListener('mousemove', mouseMoveHandle);
    window.addEventListener('mouseup', mouseUpHandle);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandle);
      window.removeEventListener('mouseup', mouseUpHandle);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container $x={position.x} $y={position.y} $isMinimized={isMinimized}>
      <HeaderContainer
        onMouseDown={(event) =>
          setStartPosition({
            x: event.pageX,
            y: event.pageY,
          })
        }
      >
        <Text>{folder.name}</Text>
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
            onClick={(event) => event.stopPropagation()}
          >
            <CancelSVG />
          </Button>
        </ButtonGroup>
      </HeaderContainer>
      <BodyContainer>
        {folder.children.map((data) => (
          <Item
            type={data}
            onDoubleClick={() => {
              if (!isFile(data)) {
                setTempWindow((window) => {
                  setWindowList([
                    ...windowList.filter((window) => window.id !== id),
                    {
                      id: window.id,
                      folder: {
                        name: data.name,
                        children: data.children,
                      },
                      position: window.position,
                      isDeceased: window.isDeceased,
                    },
                  ]);

                  return {
                    id: window.id,
                    folder: {
                      name: data.name,
                      children: data.children,
                    },
                    position: window.position,
                    isDeceased: window.isDeceased,
                  };
                });
              }
            }}
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
      </BodyContainer>
    </Container>
  );
}
