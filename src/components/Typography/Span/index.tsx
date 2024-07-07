import styled from 'styled-components';
import { Colors } from 'constants/Colors';

interface Props {
  color?: keyof typeof Colors;
}

export const Span = styled.span<Props>`
  color: ${({ color }) => (color ? Colors[color] : 'black')};
  font-size: inherit;
  cursor: pointer;
`;
