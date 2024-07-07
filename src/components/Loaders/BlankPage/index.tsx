import styled from 'styled-components';
import { BrokenSpinner } from '../BrokenSpinner';
import { motion as m } from 'framer-motion';

export const BlankPageLoader: React.FC = () => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1, ease: 'easeInOut' }}
        exit={{ opacity: 0 }}
      >
        <Wrapper>
          <BrokenSpinner />
        </Wrapper>
      </Overlay>
    </div>
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
