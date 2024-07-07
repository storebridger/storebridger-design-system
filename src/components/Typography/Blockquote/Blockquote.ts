import styled from 'styled-components';

export const Blockquote = styled.blockquote`
  font-size: 13px;
  font-style: italic;
  margin-bottom: 0;
  text-align: ${p => p.theme.direction.left};
  ${p => p.theme.direction['padding-left']}: 10px;
  ${p => p.theme.direction['border-left']}: 3px solid ${({ theme }) =>
    theme.color.primary};
`;
