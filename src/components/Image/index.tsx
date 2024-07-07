import styled from 'styled-components';
import { Dimensions } from 'constants/Dimensions';
import { Radius } from 'constants/Radius';

type DimensionType = keyof typeof Dimensions;
type RadiusType = keyof typeof Radius;

interface ImageProps {
  src: string;
  alt?: string;
  height?: DimensionType;
  width?: DimensionType;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  center?: boolean;
  borderRadius?: RadiusType;
}

export const Image = (props: ImageProps) => {
  return (
    <div
      style={{
        marginLeft: props.center ? 'auto' : 0,
        marginRight: props.center ? 'auto' : 0,
        width: Dimensions[`${props.width || 'full'}`],
        height: Dimensions[`${props.height || 'full'}`],
        objectFit: props.objectFit,
        borderRadius: props.borderRadius
          ? Radius[`${props.borderRadius}`]
          : '5px',
        overflow: 'hidden',
      }}
    >
      <Component src={props.src} alt={props.alt} />
    </div>
  );
};

const Component: React.FC<ImageProps> = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
`;
