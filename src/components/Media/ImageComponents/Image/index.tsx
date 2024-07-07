import styled from 'styled-components';
import { Dimensions } from 'constants/Dimensions';
import { Radius } from 'constants/Radius';
import { Colors } from 'constants/Colors';

interface ImageProps {
  src: string;
  alt?: string;
  height?: Dimensions;
  width?: Dimensions;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  center?: boolean;
  radius?: Radius;
  background?: Colors;
  showBorder?: boolean;
}

export const Image = ({
  src,
  alt,
  height,
  width,
  objectFit,
  center,
  radius,
  background,
  showBorder,
}: ImageProps) => {
  return (
    <Component
      height={height}
      width={width}
      objectFit={objectFit}
      center={center}
      radius={radius}
      background={background}
      showBorder={showBorder}
    >
      <Img src={src} alt={alt} loading="lazy" />
    </Component>
  );
};

interface ComponentProps {
  height?: Dimensions;
  width?: Dimensions;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  center?: boolean;
  radius?: Radius;
  background?: Colors;
  showBorder?: boolean;
}

const Component = styled.span<ComponentProps>`
  display: block;
  ${({ width }) => `width: ${width ? width : Dimensions.full};`}
  ${({ height }) => `height: ${height ? height : Dimensions.full};`}
    ${({ center }) => center && 'margin-left: auto; margin-right: auto;'}
    ${({ objectFit }) => objectFit && `object-fit:${objectFit};`}
    ${({ radius }) => `border-radius:${radius};`}
    ${({ background }) => background && `background-color: ${background};`}
    ${({ showBorder }) => showBorder && `border: 1px solid ${Colors.GRAY100};`}
    overflow: hidden;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
