import styled from 'styled-components';
import { Image } from 'components/Image';
import { ImageAssets } from 'assets/images/ImageAssets';
import { Text } from 'components/Typography';

interface Props {
  text?: string;
}

export const BrokenSpinner: React.FC<Props> = ({ text }) => {
  return (
    <Wrapper>
      <Image
        src={ImageAssets.LOADER_GIF}
        objectFit="contain"
        height="D300"
        width="D300"
      />
      {text && <Text>{text}</Text>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
