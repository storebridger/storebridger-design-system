import * as React from 'react';
import { Box } from 'components/Box';
import { IconV2 } from 'components/Icon';
import styled from 'styled-components';
import { customMedia } from 'styles/media';
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
  headerComponent?: React.ReactNode;
}

interface OverlayProps {
  overlay: boolean;
  onClick: () => void;
}

export const Modal = (props: ModalProps) => {
  const {
    children,
    isOverlay = true,
    closeIcon = true,
    headerComponent,
    ...rest
  } = props;

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
    onClick: e => {
      e.stopPropagation();
    },
  };

  return (
    <>
      <OverlayBackground
        onClick={onOverlayClose}
        overlay={isOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Component {...modalPropsWithAnimation}>
          {(closeIcon || headerComponent) && (
            <Box
              flexDirection="row"
              width="full"
              justifyContent="space-between"
              paddingX="S24"
              paddingTop="S16"
            >
              {headerComponent ? headerComponent : <Box></Box>}
              {closeIcon && (
                <IconButton onClick={props.onClose}>
                  <IconV2 name="x" color="GRAY900" size="D20" />
                </IconButton>
              )}
            </Box>
          )}
          {children}
        </Component>
      </OverlayBackground>
    </>
  );
};

const Component: React.FC<ModalProps> = styled(m.div)<ModalProps>`
  background-color: ${({ theme }) => theme.color.background};
  border-radius: 4px;
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
  ${customMedia.lessThan('small')` 
    width: 100%;
    border-radius: 0px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `}
`;

const OverlayBackground = styled(m.div)<OverlayProps>`
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
  ${customMedia.lessThan('small')` 
    justify-content: flex-end;
  `}
`;

const IconButton = styled(Box)`
  width: fit-content;
  cursor: pointer;
`;
