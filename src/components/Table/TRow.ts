import { Dimensions } from 'constants';
import styled from 'styled-components';

interface Props {
  height?: Dimensions;
  maxHeight?: Dimensions;
  minHeight?: Dimensions;
  showBorder?: boolean;
}

const TRow = styled.tr<Props>`
  display: flex;
  align-items: center;

  ${({ showBorder }) => showBorder && `border-bottom: 1px solid #e9eaeb;`}
  ${({ height }) => `height: ${height ? height : '5rem'};`}
    ${({ minHeight }) => minHeight && `min-height: ${minHeight};`}
    ${({ maxHeight }) => maxHeight && `max-height: ${maxHeight};`}
    td:last-child,
    th:last-child {
    border-right: none;
  }
`;

export default TRow;
