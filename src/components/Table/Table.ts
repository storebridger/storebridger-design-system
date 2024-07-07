import styled from 'styled-components';
import { Spacing, SpacingType } from '../../constants/Spacing';

const Table = styled.table<{
  paddingX?: SpacingType;
  paddingY?: SpacingType;
  padding?: SpacingType;
}>`
  flex: 1;
  width: 100%;
  height: max-content;
  table-layout: auto;
  position: relative;
  ${({ padding }) => padding && `padding: ${Spacing[padding]};`}
  ${({ paddingX }) =>
    paddingX &&
    `padding-left: ${Spacing[paddingX]}; padding-right: ${Spacing[paddingX]};`}
    ${({ paddingY }) =>
    paddingY &&
    `padding-top: ${Spacing[paddingY]}; padding-bottom: ${Spacing[paddingY]};`}
`;

export default Table;
