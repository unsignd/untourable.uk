import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const Container = styled.p`
  color: #fff;

  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.5px;
  text-transform: uppercase;
`;

export function Text({ children, ...props }: TextProps) {
  return <Container {...props}>{children}</Container>;
}
