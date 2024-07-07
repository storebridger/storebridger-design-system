import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { FontSize } from 'constants/FontSize';
import { Spacing } from 'constants/Spacing';

type ColorTypes = keyof typeof Colors;
type FontSizeTypes = keyof typeof FontSize;
type LineHeight = 'D0' | 'D16' | 'D20' | 'D24';
type LetterSpacing = 'S1' | 'S2';
type TextAlign =
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'initial'
  | 'inherit';

export interface TextProps {
  children: string | React.ReactNode;
  color?: ColorTypes | boolean;
  colorType?: 'plain' | 'additional' | 'bold' | 'black' | 'primary';
  size?: FontSizeTypes;
  lineHeight?: LineHeight;
  letterSpacing?: LetterSpacing;
  textAlign?: TextAlign;
  whiteSpace?: 'normal' | 'nowrap';
  overflow?: 'hidden' | 'auto';
  textOverflow?: 'ellipsis' | 'inherit';
  strikeThrough?: boolean;
  fontStyle?: string;
  onClick?: () => void;
}

export interface BoldTextProps extends TextProps {
  weight?: 200 | 400 | 500 | 600 | 800 | 1000 | 'bolder';
}

const selectColorType = (theme, colorType?: string) => {
  switch (colorType) {
    case 'additional':
      return theme.color.additionalText;
    case 'bold':
      return theme.color.boldText;
    case 'black':
      return theme.color.blackText;
    case 'primary':
      return theme.color.primary;
    default:
      return theme.color.text;
  }
};

export const Text = styled.p<TextProps>`
  color: ${({ color, colorType, theme }) => {
    if (color) return Colors[color] || selectColorType(theme, colorType);
    return selectColorType(theme, colorType);
  }};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing && Spacing[letterSpacing]};
  font-size: ${({ size }) => (size && FontSize[size]) || FontSize['F16']};
  line-height: ${({ lineHeight }) => lineHeight && Spacing[lineHeight]};
  text-align: ${({ textAlign }) => textAlign};
  margin: 0 !important;
  overflow: ${({ overflow }) => overflow};
  text-overflow: ${({ textOverflow }) => textOverflow};
  white-space: ${({ whiteSpace }) => whiteSpace};
  background: transparent;
  text-decoration: ${({ strikeThrough }) =>
    strikeThrough ? `line-through` : `none`};
  font-style: ${({ fontStyle }) => fontStyle || `none`};
  ${({ onClick }) => onClick && 'cursor: pointer;'}
`;

export const BoldText = styled.strong<BoldTextProps>`
  display: block;
  color: ${({ color, colorType, theme }) => {
    if (color) return Colors[color];

    return selectColorType(theme, colorType);
  }};
  letter-spacing: ${({ letterSpacing }) =>
    letterSpacing && Spacing[letterSpacing]};
  font-size: ${({ size }) => (size && FontSize[size]) || FontSize['F16']};
  line-height: ${({ lineHeight }) => lineHeight && Spacing[lineHeight]};
  text-align: ${({ textAlign }) => textAlign};

  margin: 0 !important;
  background: transparent;
  font-weight: ${({ weight }) => (weight ? weight : 'bold')} !important;
  width: fit-content;
`;
