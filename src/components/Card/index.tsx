import styled from 'styled-components';
import { Dimensions } from 'constants/Dimensions';
import { Spacing } from 'constants/Spacing';
import { Radius } from 'constants/Radius';

type FlexDirection = 'row' | 'column';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexGrow = number | 'initial' | 'inherit' | 'unset' | 'auto';
type DimensionTypes = keyof typeof Dimensions;
type SpacingTypes = keyof typeof Spacing;
type RadiusTypes = keyof typeof Radius;
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

const DEFAULT_SPACING = '0px';

interface CardProps {
  children: React.ReactNode;
  flexWrap?: FlexWrap;
  flexGrow?: FlexGrow;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: SpacingTypes;
  isResponsiveRow?: boolean;
  flex?: number;
  radius?: RadiusTypes;
  borderTopRadius?: RadiusTypes;
  removeTopShadow?: boolean;

  padding?: SpacingTypes;
  paddingTop?: SpacingTypes;
  paddingRight?: SpacingTypes;
  paddingBottom?: SpacingTypes;
  paddingLeft?: SpacingTypes;

  width?: DimensionTypes;
  maxWidth?: DimensionTypes;
  minWidth?: DimensionTypes;
  height?: DimensionTypes;
  maxHeight?: DimensionTypes;
  minHeight?: DimensionTypes;
  marginBottom?: DimensionTypes;
  paddingX?: SpacingTypes;
  paddingY?: SpacingTypes;

  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';

  onClick?: () => void;
}

export const Card = (props: CardProps) => {
  const { children, ...rest } = props;
  return <Component {...rest}>{children}</Component>;
};

const Component: React.FC<CardProps> = styled.div<CardProps>`
  ${({ flex }) => flex && `flex: ${flex};`}
  background-color: ${({ theme }) => theme.color.background};
  border-radius: ${({ radius }) => (radius ? Radius[radius] : '5px')};
  ${({ borderTopRadius }) =>
    borderTopRadius && `border-top-left-radius: ${Radius[borderTopRadius]};`}
  ${({ borderTopRadius }) =>
    borderTopRadius && `border-top-right-radius: ${Radius[borderTopRadius]};`}
  box-shadow: ${({ theme }) => theme.shadow.small};
  ${({ removeTopShadow }) =>
    removeTopShadow && `clip-path: inset(0 -10px -10px -10px);`}
  color: inherit;
  width: ${({ width }) => (width && Dimensions[width]) || 'auto'};
  max-width: ${({ maxWidth }) => (maxWidth && Dimensions[maxWidth]) || 'auto'};
  margin-bottom: ${({ marginBottom }) =>
    marginBottom && Dimensions[marginBottom]};
  height: ${({ height }) => (height && Dimensions[height]) || 'auto'};
  max-height: ${({ maxHeight }) =>
    (maxHeight && Dimensions[maxHeight]) || 'auto'};
  min-height: ${({ minHeight }) =>
    (minHeight && Dimensions[minHeight]) || 'auto'};

  display: flex;
  flex-direction: ${props => props.flexDirection || 'column'};
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  flex-wrap: ${props => props.flexWrap};
  flex-grow: ${props => props.flexGrow};
  ${({ isResponsiveRow }) => isResponsiveRow && 'flex-wrap: wrap'};
  gap: ${props => Spacing[`${props.gap}`] || DEFAULT_SPACING};

  padding: ${({ padding }) => padding && Spacing[padding]};
  padding-top: ${({ paddingTop }) => paddingTop && Spacing[paddingTop]};
  padding-right: ${({ paddingRight }) => paddingRight && Spacing[paddingRight]};
  padding-bottom: ${({ paddingBottom }) =>
    paddingBottom && Spacing[paddingBottom]};
  padding-left: ${({ paddingLeft }) => paddingLeft && Spacing[paddingLeft]};

  ${({ paddingX }) =>
    paddingX &&
    `padding-left: ${Spacing[paddingX]};padding-right: ${Spacing[paddingX]};`}
  ${({ paddingY }) =>
    paddingY &&
    `padding-top: ${Spacing[paddingY]};padding-bottom: ${Spacing[paddingY]};`}

  overflow: ${({ overflow }) => overflow};
`;
