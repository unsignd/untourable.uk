import styled from 'styled-components';
import { Text } from './Text';
import { useEffect, useState } from 'react';
import { PositionType } from '../types';
import { ReactComponent as CancelSVG } from '../assets/cancel_10.svg';
import { ReactComponent as MinimizeSVG } from '../assets/minimize_10.svg';

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
        <ButtonGroup>
          <Button
            onMouseDown={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
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
    </Container>
  );
}
