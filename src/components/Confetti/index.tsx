import { Box } from 'components/Box';
import ReactConfetti from 'react-confetti';

type ConfettiSizeTypes = 300 | 200 | 100;

interface ConfettiProps {
  width: ConfettiSizeTypes;
  height: ConfettiSizeTypes;
  colors: Array<string>;
  numberOfPieces?: number;
}

export const Confetti = (props: ConfettiProps) => {
  const { width, height, colors, numberOfPieces } = props;
  return (
    <Box>
      <ReactConfetti
        colors={colors}
        width={width}
        height={height}
        numberOfPieces={numberOfPieces || 200}
        recycle={false}
      />
    </Box>
  );
};
