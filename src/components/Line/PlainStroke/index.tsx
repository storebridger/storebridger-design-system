import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { Dimensions, DimensionType } from 'constants/Dimensions';

interface IDivider {
  width?: DimensionType;
  thickness?: 'D1' | 'D2' | 'D4';
}

export const PlainStroke = styled.hr<IDivider>`
  width: ${({ width }) => width && Dimensions[width]};
  border: ${({ thickness }) =>
      thickness ? Dimensions[thickness] : Dimensions.D1}
    solid ${Colors.GRAY400};
`;
