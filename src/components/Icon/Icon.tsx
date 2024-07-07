import React from 'react';
import sprite from 'assets/icons/heroics/sprite.svg';
import { ColorType, Colors } from 'constants/Colors';
import styled from 'styled-components';
import { Dimensions } from 'constants/Dimensions';
import { IconName } from './type';

export interface IconProps {
  iconName: IconName;
  color?: ColorType | boolean;
  size?: 'D8' | 'D12' | 'D16' | 'D20' | 'D24' | 'D32' | 'D40';
  onClick?: () => void;
  rotate?: number;
}

interface SVGProps {
  children: React.ReactNode;
  xmlns: string;
  color?: ColorType;
  size?: 'D8' | 'D12' | 'D16' | 'D20' | 'D24' | 'D32' | 'D40';
  rotate?: number;
}

export const Icon = ({ iconName, color, size }: IconProps) => {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      color={color as ColorType}
      size={size}
    >
      <use href={sprite + `#${iconName}`} />
    </SVG>
  );
};

export const IconButton = ({
  iconName,
  color,
  size,
  onClick,
  rotate,
}: IconProps) => {
  return (
    <Div onClick={onClick}>
      <SVG
        xmlns="http://www.w3.org/2000/svg"
        color={color as ColorType}
        size={size}
        rotate={rotate}
      >
        <use href={sprite + `#${iconName}`} />
      </SVG>
    </Div>
  );
};

const SVG: React.FC<SVGProps> = styled.svg<SVGProps>`
  fill: ${({ color, theme }) => (color ? Colors[color] : theme.color.icon)};
  stroke: ${({ color, theme }) => (color ? Colors[color] : theme.color.icon)};
  height: ${({ size }) => (size && Dimensions[size]) || Dimensions.D24};
  width: ${({ size }) => (size && Dimensions[size]) || Dimensions.D24};
  transform: ${({ rotate }) => (rotate ? `rotate(${rotate}deg)` : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;

  path {
    fill: ${({ color, theme }) =>
      (color && color) || theme.color.icon} !important;
    stroke: ${({ color, theme }) =>
      (color && color) || theme.color.icon} !important;
  }

  stop {
    stop-color: ${({ color, theme }) =>
      (color && color) || theme.color.icon} !important;
    stroke: ${({ color, theme }) =>
      (color && color) || theme.color.icon} !important;
  }
`;

const Div = styled('div')`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
`;
