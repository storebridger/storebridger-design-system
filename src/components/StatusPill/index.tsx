import { Colors, ColorType } from 'constants/Colors';
import styled from 'styled-components';
import { Spacing, SpacingType } from 'constants/Spacing';
import { Dimensions, DimensionType } from '../../constants/Dimensions';

interface Props {
  statusText: string;
  backgroundColor: ColorType;
  textColor: ColorType;
  padding?: SpacingType;
  paddingX?: SpacingType;
  paddingY?: SpacingType;
  width?: DimensionType;
}

const StatusPill = (props: Props) => {
  return (
    <Pill {...props}>
      <span>{props.statusText}</span>
    </Pill>
  );
};

const Pill = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: max-content;
  background-color: ${({ backgroundColor }) => Colors[backgroundColor]};
  color: ${({ textColor }) => Colors[textColor]};
  padding: ${({ padding }) =>
    `${Spacing[padding || 'S1']} ${Spacing[padding || 'S8']}`};
  ${({ paddingX }) =>
    paddingX &&
    `padding-left: ${Spacing[paddingX]}; padding-right: ${Spacing[paddingX]};`}
  ${({ paddingY }) =>
    paddingY &&
    `padding-top: ${Spacing[paddingY]}; padding-bottom: ${Spacing[paddingY]};`}
    border-radius: 20px;
  ${({ width }) => width && `width: ${Dimensions[width]};`}
`;

export default StatusPill;
