import styled, { keyframes } from 'styled-components';
import { Colors } from 'constants/Colors';
import { Icon } from '../Icon';
import { Box } from 'components/Box';
import React from 'react';
import { customMedia } from 'styles/media';

type FlashTypes = 'success' | 'warning' | 'error' | 'info';

interface FlashCardProps {
  type: FlashTypes;
  text: string;
  timerInSeconds: number;
  onClose?: () => void;
}

export const FlashCard = ({
  type,
  text,
  timerInSeconds,
  onClose,
}: FlashCardProps) => {
  const { backgroundColor, borderColor, iconName } = getProps(type);
  const [isInView, setIsInView] = React.useState(true);

  React.useEffect(() => {
    const milliseconds = timerInSeconds * 1000;
    setTimeout(() => {
      setIsInView(false);
      onClose && onClose();
    }, milliseconds);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isInView && (
        <Wrapper backgroundColor={backgroundColor} borderColor={borderColor}>
          <Box>
            <Icon iconName={iconName} />
          </Box>
          <Box flexGrow={1} maxWidth="D240">
            {text}
          </Box>
        </Wrapper>
      )}
    </>
  );
};

const getProps = (type: FlashTypes): any => {
  switch (type) {
    case 'success':
      return {
        backgroundColor: Colors.GREEN100,
        borderColor: Colors.GREEN500,
        iconName: 'check-circle',
      };
    case 'warning':
      return {
        backgroundColor: Colors.YELLOW100,
        borderColor: Colors.YELLOW500,
        iconName: 'exclamation-triangle',
      };
    case 'error':
      return {
        backgroundColor: Colors.RED100,
        borderColor: Colors.RED500,
        iconName: 'exclamation-circle',
      };
    case 'info':
      return {
        backgroundColor: Colors.BLUE100,
        borderColor: Colors.BLUE600,
        iconName: 'info',
      };
    default:
      return {
        backgroundColor: Colors.GREEN100,
        borderColor: Colors.GREEN500,
        iconName: 'success',
      };
  }
};

interface CardProps {
  backgroundColor: string;
  borderColor: string;
}

const slideDown = keyframes`
  0% {
    top: -3rem;
  }
  100% {
    top: 6rem;
  }
`;

const Wrapper = styled.div<CardProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.6rem;
  padding: 1.6rem;
  font-size: 1.2rem;
  position: fixed;
  top: 6rem;
  right: 50%;
  transform: translateX(50%);
  z-index: 1000;
  max-width: 30rem;
  background-color: ${props => props.backgroundColor};
  border: 1px solid ${props => props.borderColor};
  border-radius: 0.5rem;
  animation: ${slideDown} 0.5s ease-in-out;

  /* ${customMedia.lessThan('mediumplus')`
  right: 33%
  `} */
`;
