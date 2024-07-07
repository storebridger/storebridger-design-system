import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { customMedia } from 'styles/media';
import { Spacing } from 'constants/Spacing';

type ColorTypes = keyof typeof Colors;
type LetterSpacing = 'S1' | 'S2';
type TextAlign =
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'initial'
  | 'inherit';

interface HeaderProps {
  children: string | React.ReactNode;
  color?: ColorTypes;
  colorType?: 'plain' | 'additional' | 'bold' | 'black';
  letterSpacing?: LetterSpacing;
  textAlign?: TextAlign;
}

export const Header3: React.FC<HeaderProps> = styled.h3<HeaderProps>`
  color: ${({ color, colorType, theme }) => {
    if (color) return Colors[color];

    switch (colorType) {
      case 'additional':
        return theme.color.additionalText;
      case 'bold':
        return theme.color.boldText;
      case 'black':
        return theme.color.blackText;
      default:
        return theme.color.text;
    }
  }};
  text-align: ${({ textAlign }) => textAlign};
  letter-spacing: ${({ letterSpacing }) =>
    (letterSpacing && Spacing[letterSpacing]) || Spacing.S0};
  font-size: 1.8rem;
  ${customMedia.lessThan('small')`
  font-size: 1.6rem;
  `}
  margin: 0 !important;
  font-weight: bolder !important;
`;
