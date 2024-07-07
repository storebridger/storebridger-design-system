import * as React from 'react';
import { Box } from 'components/Box';
import { Icon } from 'components/Icon';
import styled from 'styled-components';
import { Dimensions } from 'constants/Dimensions';
import { Spacing } from 'constants/Spacing';
import { motion as m } from 'framer-motion';

type DimensionTypes = keyof typeof Dimensions;
type SpacingTypes = keyof typeof Spacing;

interface ModalProps {
  children: React.ReactNode;
  isOverlay?: boolean;
  width?: DimensionTypes;
  maxWidth?: DimensionTypes;
  minWidth?: DimensionTypes;
  height?: DimensionTypes;
  maxHeight?: DimensionTypes;
  minHeight?: DimensionTypes;
  paddingX?: SpacingTypes;
  paddingY?: SpacingTypes;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  onClose: () => void;
  overLayClose?: boolean;
  closeIcon?: boolean;
}

interface OverlayProps {
  overlay: boolean;
  onClick: () => void;
}

export const ImageModal = (props: ModalProps) => {
  const { children, isOverlay = true, closeIcon = true, ...rest } = props;

  const onOverlayClose = () => {
    if (props.overLayClose) {
      props.onClose();
    }
  };

  let modalPropsWithAnimation = {
    ...rest,
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <ImageOverlayBackground
        onClick={onOverlayClose}
        overlay={isOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <ImageComponent {...modalPropsWithAnimation}>
          {closeIcon && (
            <Box
              flexDirection="row"
              width="full"
              justifyContent="flex-end"
              paddingTop="S16"
              paddingRight="S16"
            >
              <IconButton onClick={props.onClose}>
                <Icon iconName="x-mark" color="GRAY900" />
              </IconButton>
            </Box>
          )}
          {children}
        </ImageComponent>
      </ImageOverlayBackground>
    </>
  );
};

const ImageComponent: React.FC<ModalProps> = styled(m.div)<ModalProps>`
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.shadow.small};
  color: inherit;
  width: ${({ width }) => (width && Dimensions[width]) || 'auto'};
  max-width: ${({ maxWidth }) => (maxWidth && Dimensions[maxWidth]) || 'auto'};
  min-width: ${({ minWidth }) => (minWidth && Dimensions[minWidth]) || 'auto'};
  height: ${({ height }) => (height && Dimensions[height]) || 'auto'};
  max-height: ${({ maxHeight }) =>
    (maxHeight && Dimensions[maxHeight]) || 'auto'};
  min-height: ${({ minHeight }) =>
    (minHeight && Dimensions[minHeight]) || 'auto'};
`;

const ImageOverlayBackground = styled(m.div)<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100%;
  background: ${props =>
    props.overlay ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const IconButton = styled(Box)`
  width: fit-content;
  cursor: pointer;
`;
