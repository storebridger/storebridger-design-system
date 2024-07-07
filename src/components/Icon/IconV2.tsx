import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Colors, ColorType } from '../../constants';
import React, { lazy, Suspense } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { LucideProps } from 'lucide-react';
import { logger } from 'utils/logger';
import { Dimensions } from '../../constants/Dimensions';

// Find icon names here https://lucide.dev/icons/

export type IconV2Name = keyof typeof dynamicIconImports;

export interface IconV2Props extends Omit<LucideProps, 'ref'> {
  name: keyof typeof dynamicIconImports;
  color?: ColorType;
  size?: 'D8' | 'D12' | 'D16' | 'D20' | 'D24' | 'D32' | 'D48';
  onClick?: () => void;

  [x: string]: any;
}

enum LucideIconSize {
  D8 = 8,
  D12 = 12,
  D16 = 16,
  D20 = 20,
  D24 = 24,
  D32 = 32,
  D48 = 48,
}

const Icon = ({ name, color, size, ...props }: IconV2Props) => {
  const theme = React.useContext(ThemeContext);
  const iconColor = color ? Colors[color] : theme.color.icon;

  if (!dynamicIconImports.hasOwnProperty(name)) {
    logger.warn(`Icon with name ${name} does not exist`);
    return <FallbackComponent size={size} />;
  }

  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={<FallbackComponent size={size} />}>
      <LucideIcon
        {...props}
        color={iconColor}
        cursor={props.onClick ? 'pointer' : 'default'}
        size={LucideIconSize[size || 'D24']}
        onClick={() => props.onClick && props.onClick()}
      />
    </Suspense>
  );
};

const FallbackComponent = styled.div<Pick<IconV2Props, 'size'>>`
  background-color: transparent;
  ${({ size }) =>
    size
      ? `height: ${Dimensions[size]}; width: ${Dimensions[size]};`
      : 'height: 24px; width: 24px;'}
`;

export default Icon;
