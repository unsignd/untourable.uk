import styled from 'styled-components';
import { Text } from './Text';
import { useEffect, useState } from 'react';
import { PositionType } from '../types';

const Container = styled.div<{
  $x: number;
  $y: number;
}>`
  width: 640px;
  height: 400px;

  position: absolute;
  top: ${(props) => props.$y}px;
  left: ${(props) => props.$x}px;

  background-color: #000;
  border: 1px solid #808080;
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

export function Window() {
  const [, setStartPosition] = useState<PositionType>();
  const [position, setPosition] = useState<PositionType>({
    x: 0,
    y: 0,
  });
  const [, setTempPosition] = useState<PositionType>(position);

  useEffect(() => {
    const mouseMoveHandle = (event: MouseEvent) => {
      setStartPosition((startPosition) => {
        if (startPosition) {
          setTempPosition((tempPosition) => {
            setPosition({
              x: tempPosition.x + event.pageX - startPosition.x,
              y: tempPosition.y + event.pageY - startPosition.y,
            });

            return tempPosition;
          });
        } else {
          setPosition((position) => {
            setTempPosition(position);

            return position;
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
    <Container $x={position.x} $y={position.y}>
      <HeaderContainer
        onMouseDown={(event) =>
          setStartPosition({
            x: event.pageX,
            y: event.pageY,
          })
        }
      >
        <Text>./about</Text>
      </HeaderContainer>
    </Container>
  );
}
