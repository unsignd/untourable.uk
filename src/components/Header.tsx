import styled from 'styled-components';
import { Text } from './Text';
import { useEffect, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 40px;

  padding: 0 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;

  border-bottom: 1px solid #808080;
`;

const TitleText = styled(Text)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TimeText = styled(Text)`
  text-size-adjust: none;
  flex-shrink: 0;
`;

export function Header() {
  const [time, setTime] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      <TitleText>{window.location.href.toUpperCase()}</TitleText>
      <TimeText>{time}</TimeText>
    </Container>
  );
}
