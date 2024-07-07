import { ColorType, Colors } from 'constants';
import { Dimensions } from 'constants/Dimensions';
import styled, { keyframes } from 'styled-components';

interface Props extends SvgProps {
  color?: ColorType;
  size?: 'D1' | 'D2' | 'D4' | 'D6' | 'D8' | 'D12' | 'D16' | 'D20' | 'D24';
}

export const CirclePath = (props: Props) => (
  <Svg viewBox="-24 -24 48 48" small={props.small} size={props.size}>
    <Circle
      cx="0"
      cy="0"
      r="20"
      fill="none"
      strokeWidth="4"
      color={props.color}
    ></Circle>
  </Svg>
);

const speed = 1.5;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100, 150;
    stroke-dashoffset: -24;
  }
  100% {
    stroke-dasharray: 0, 150;
    stroke-dashoffset: -124;
  }
`;

interface SvgProps {
  small?: boolean;
  size?: 'D1' | 'D2' | 'D4' | 'D6' | 'D8' | 'D12' | 'D16' | 'D20' | 'D24';
}

const Svg = styled.svg<SvgProps>`
  animation: ${rotate} ${speed * 1.75}s linear infinite;
  height: ${p => (p.small ? '1.25rem' : '3rem')};
  width: ${p => (p.small ? '1.25rem' : p.size ? Dimensions[p.size] : '3rem')};
  transform-origin: center;
`;

const Circle = styled.circle<{ color?: ColorType }>`
  animation: ${dash} ${speed}s ease-in-out infinite;
  stroke: ${({ color, theme }) =>
    color ? Colors[color] : theme.color.primary};
  stroke-linecap: round;
`;
