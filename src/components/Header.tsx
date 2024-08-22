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

  border-bottom: 1px solid #808080;
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
      <Text>HTTPS://UNTOURABLE.UK/</Text>
      <Text>{time}</Text>
    </Container>
  );
}
