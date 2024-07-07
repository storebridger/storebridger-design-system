import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Colors } from 'constants/Colors';
import { Text } from 'components/Typography/Text';
import { Icon } from '../Icon';
import { Box } from '../Box';

interface Props {
  text?: string;
  onClickAction?: () => void;
}

export const BackText = ({ text, onClickAction }: Props) => {
  const navigate = useNavigate();

  return (
    <Back
      onClick={() => {
        onClickAction ? onClickAction() : navigate(-1);
      }}
      flexDirection="row"
      alignItems="center"
      gap="S4"
    >
      <Icon iconName="arrow-left" color="PRIMARY" size="D16" />
      {text && (
        <Text colorType="primary" size="F12">
          {text}
        </Text>
      )}
    </Back>
  );
};

const Back = styled(Box)`
  background: transparent;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${Colors.HOVER};

    svg path {
      stroke: ${Colors.HOVER};
    }
  }
`;
