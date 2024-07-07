import styled from 'styled-components';
import { BrokenSpinner } from '../BrokenSpinner';
import { motion as m } from 'framer-motion';

interface Props {
  excludeSpinner?: boolean;
}

export const OverlayLoader: React.FC<Props> = ({ excludeSpinner }: Props) => {
  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      exit={{ opacity: 0 }}
    >
      <Wrapper>{!excludeSpinner && <BrokenSpinner />}</Wrapper>
    </Overlay>
  );
};

const Overlay = styled(m.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
