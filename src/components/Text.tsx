import styled from 'styled-components';

const Container = styled.p`
  color: #fff;

  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.5px;
  text-transform: uppercase;
`;

export function Text({ children, ...props }: { children: string }) {
  return <Container {...props}>{children}</Container>;
}
