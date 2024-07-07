import { Colors, Dimensions, Spacing } from 'constants';
import styled from 'styled-components';
import { Text } from '../Typography';

interface Props {
  flex?: number;
  justifyContent?: string;
  width?: Dimensions;
  minWidth?: Dimensions;
  maxWidth?: Dimensions;
  padding?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingX?: Spacing;
  paddingY?: Spacing;
  gap?: Spacing;
}

const TD = styled.td<Props>`
  display: flex;
  align-items: center;

  ${({ flex }) => `flex: ${flex ? flex : 1};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`};

  ${({ width }) => width && `width: ${width};`}
  ${({ minWidth }) => `min-width: ${minWidth ? minWidth : '10rem;'};`}
    ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth};`}
    ${({ padding }) => padding && `padding: ${padding};`}
    ${({ paddingX }) =>
    `
      padding-left: ${paddingX ? paddingX : '1rem'}; 
      padding-right: ${paddingX ? paddingX : '1rem'};
  `}
    ${({ paddingY }) =>
    paddingY && `padding-top: ${paddingY}; padding-bottom: ${paddingY};`}
    ${({ paddingTop }) => paddingTop && `padding-top: ${paddingTop};`}
    ${({ paddingRight }) => paddingRight && `padding-right: ${paddingRight};`}
    ${({ paddingBottom }) =>
    paddingBottom && `padding-bottom: ${paddingBottom};`}
    ${({ paddingLeft }) => paddingLeft && `padding-left: ${paddingLeft};`}


    ${({ gap }) => `gap: ${gap ? gap : '0'};`}
    position: relative;
`;

export const THeadCell = styled(TD)`
  height: 100%;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.blackText};
  font-weight: 700;
  border-bottom: 1px solid #e9eaeb;
`;

export const TCell = styled(TD)`
  height: 100%;
  border-bottom: 1px solid #e9eaeb;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.color.text};
`;

export const TCheckCell = styled.span<{ width?: string }>`
  height: 100%;
  ${({ width }) => `width: ${width ? width : '3rem'};`}
  display: flex;
  align-items: center;
`;

export const TCellText = styled(Text)<{
  isLink?: boolean;
  onClick?: () => void;
  overflow?: string;
  useEllipsis?: boolean;
}>`
  max-width: 100%;
  overflow: hidden;
  font-size: 1.4rem;

  ${({ useEllipsis }) =>
    useEllipsis && ' text-overflow: ellipsis; white-space: nowrap;'}
  ${({ isLink }) =>
    isLink &&
    `color: ${Colors.BLUE600}; text-decoration: underline; cursor: pointer;`}
`;
