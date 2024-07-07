import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { Spacing } from 'constants/Spacing';
import { Dimensions } from 'constants/Dimensions';
import { Radius } from 'constants/Radius';

type FlexDirection = 'row' | 'column';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type FlexGrow = number | 'initial' | 'inherit' | 'unset' | 'auto';
type SpacingTypes = keyof typeof Spacing;
type ColorTypes = keyof typeof Colors;
type RadiusTypes = keyof typeof Radius;
type DimensionTypes = keyof typeof Dimensions;
type BorderWidthType = 'D1' | 'D2';
type JustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

interface BorderRadius {
  all?: RadiusTypes;
  topRight?: RadiusTypes;
  bottomRight?: RadiusTypes;
  bottomLeft?: RadiusTypes;
  topLeft?: RadiusTypes;
}

interface Border {
  style?: 'solid' | 'dashed';
  color?: ColorTypes;
  all?: BorderWidthType;
  top?: BorderWidthType;
  right?: BorderWidthType;
  bottom?: BorderWidthType;
  left?: BorderWidthType;
}

interface BoxProps {
  children?: React.ReactNode;
  flexWrap?: FlexWrap;
  flexGrow?: FlexGrow;
  flexDirection?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  gap?: SpacingTypes;
  flex?: number;
  isResponsiveRow?: boolean;
  background?: ColorTypes;
  boxShadow?: SpacingTypes;
  margin?: SpacingTypes;
  marginTop?: SpacingTypes;
  marginRight?: SpacingTypes;
  marginBottom?: SpacingTypes;
  marginLeft?: SpacingTypes;
  padding?: SpacingTypes;
  paddingTop?: SpacingTypes;
  paddingRight?: SpacingTypes;
  paddingBottom?: SpacingTypes;
  paddingLeft?: SpacingTypes;
  paddingX?: SpacingTypes;
  paddingY?: SpacingTypes;
  marginX?: SpacingTypes;
  marginY?: SpacingTypes;
  borderRadius?: RadiusTypes | BorderRadius;
  border?: Border;
  width?: DimensionTypes;
  maxWidth?: DimensionTypes;
  minWidth?: DimensionTypes;
  height?: DimensionTypes;
  maxHeight?: DimensionTypes;
  minHeight?: DimensionTypes;
  cursor?: string;
  onClick?: () => void;
}

export const Box: React.FC<BoxProps> = styled.div<BoxProps>`
  ${({ width }) => width && `width: ${Dimensions[width]};`}
  ${({ minWidth }) => minWidth && `min-width: ${Dimensions[minWidth]};`}
  ${({ maxWidth }) => maxWidth && `max-width: ${Dimensions[maxWidth]};`}
  ${({ height }) => height && `height: ${Dimensions[height]};`}
  ${({ minHeight }) => minHeight && `min-height: ${Dimensions[minHeight]};`}
  ${({ maxHeight }) => maxHeight && `max-height: ${Dimensions[maxHeight]};`}

  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'column'};
  ${({ gap }) => gap && `gap: ${Spacing[gap]};`}
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent};`}
  ${({ alignItems }) => alignItems && `align-items: ${alignItems};`}
  ${({ flexWrap }) => flexWrap && `flex-wrap: ${flexWrap};`}
  ${({ flexGrow }) => flexGrow && `flex-grow: ${flexGrow};`}
  ${({ flex }) => flex && `flex: ${flex};`}

  ${({ isResponsiveRow }) => isResponsiveRow && 'flex-wrap: wrap'};
  ${({ background }) =>
    background && `background-color: ${Colors[background]};`}
  ${({ cursor }) => cursor && `cursor: ${cursor};`}

  ${({ margin }) => margin && `margin: ${Spacing[margin]};`}
  ${({ marginTop }) => marginTop && `margin-top: ${Spacing[marginTop]};`}
  ${({ marginRight }) =>
    marginRight && `margin-right: ${Spacing[marginRight]};`}
  ${({ marginBottom }) =>
    marginBottom && `margin-bottom: ${Spacing[marginBottom]};`}
  ${({ marginLeft }) => marginLeft && `margin-left: ${Spacing[marginLeft]};`}
  ${({ marginX }) =>
    marginX &&
    `margin-left: ${Spacing[marginX]}; margin-right: ${Spacing[marginX]};`}
  ${({ marginY }) =>
    marginY &&
    `margin-top: ${Spacing[marginY]}; margin-bottom: ${Spacing[marginY]};`}

  ${({ padding }) => padding && `padding: ${Spacing[padding]};`}
  ${({ paddingTop }) => paddingTop && `padding-top: ${Spacing[paddingTop]};`}
  ${({ paddingRight }) =>
    paddingRight && `padding-right: ${Spacing[paddingRight]};`}
  ${({ paddingBottom }) =>
    paddingBottom && `padding-bottom: ${Spacing[paddingBottom]};`}
  ${({ paddingLeft }) =>
    paddingLeft && `padding-left: ${Spacing[paddingLeft]};`}
  ${({ paddingX }) =>
    paddingX &&
    `padding-left: ${Spacing[paddingX]}; padding-right: ${Spacing[paddingX]};`}
  ${({ paddingY }) =>
    paddingY &&
    `padding-top: ${Spacing[paddingY]}; padding-bottom: ${Spacing[paddingY]};`}
  ${({ onClick }) => onClick && 'cursor: pointer;'}
  ${({ borderRadius }) => {
    if (!borderRadius) return;
    if (typeof borderRadius === 'string')
      return `border-radius: ${Radius[borderRadius]};`;

    if (borderRadius.all) return `border-radius: ${Radius[borderRadius.all]};`;

    if (borderRadius.topRight)
      return `border-top-right-radius: ${Radius[borderRadius.topRight]};`;
    if (borderRadius.bottomRight)
      return `border-bottom-right-radius: ${Radius[borderRadius.bottomRight]};`;
    if (borderRadius.bottomLeft)
      return `border-bottom-left-radius: ${Radius[borderRadius.bottomLeft]};`;
    if (borderRadius.topLeft)
      return `border-top-left-radius: ${Radius[borderRadius.topLeft]};`;
  }}

  ${({ border, theme }) => {
    if (!border) return;

    const borderStyle = border.style || 'solid';
    const borderColor = border.color ? border.color : theme.color.border;

    if (typeof border === 'string')
      return `border: ${Dimensions[border]} ${borderStyle} ${borderColor};`;

    if (border.all)
      return `border: ${Dimensions[border.all]} ${borderStyle} ${borderColor};`;

    if (border.top)
      return `border-top: ${
        Dimensions[border.top]
      } ${borderStyle} ${borderColor};`;

    if (border.right)
      return `border-right: ${
        Dimensions[border.right]
      } ${borderStyle} ${borderColor};`;
    if (border.bottom)
      return `border-bottom: ${
        Dimensions[border.bottom]
      } ${borderStyle} ${borderColor};`;
    if (border.left)
      return `border-left: ${
        Dimensions[border.left]
      } ${borderStyle} ${borderColor};`;
  }}
`;

export const ColoredBox = styled(Box)`
  background: ${({ background, theme }) =>
    background ? Colors[background] : theme.color.background};
`;
