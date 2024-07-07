import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Colors } from 'constants/Colors';
import { FontSize } from 'constants/FontSize';

interface Props {
  to: string;
  children: React.ReactNode;
  color?: keyof typeof Colors;
  size?: keyof typeof FontSize;
  target?: string;
}

export function TextLink({ to, children, color, size, target }: Props) {
  return (
    <StyledLink to={to} color={color} size={size} target={target}>
      {children}
    </StyledLink>
  );
}

const StyledLink = styled(Link)<Props>`
  text-decoration: none;
  font-size: ${({ size }) => (size && FontSize[size]) || 'inherit'};
  color: ${({ color, theme }) =>
    (color && Colors[color]) || theme.color.primary};

  &:hover {
    opacity: 0.9;
  }
`;
