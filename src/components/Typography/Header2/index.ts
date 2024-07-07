import { Colors } from 'constants/Colors';
import { Spacing } from 'constants/Spacing';
import styled from 'styled-components';
import { customMedia } from 'styles/media';

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

export const Header2: React.FC<HeaderProps> = styled.h2<HeaderProps>`
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
  font-size: 2.4rem;
  font-weight: bolder;
  ${customMedia.lessThan('small')`
  font-size: 2rem;
  `}
  margin: 0 !important;
  line-height: 1;
`;
