import { Box } from 'components/Box';
import { Icon, IconName } from 'components/Icon';
import { Header3, Text } from 'components/Typography';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DimensionType } from 'constants/Dimensions';

interface Props {
  title: string;
  content?: React.ReactNode | string;
  iconName?: IconName;
  isActive?: boolean;
  onClick?: () => void;
  size?: DimensionType;
}

export function InfoCard(props: Props) {
  const { iconName, size } = props;
  const theme = useContext(ThemeContext);
  const selectBox = () => {
    props.onClick && props.onClick();
  };
  return (
    <Box
      padding="S24"
      borderRadius="R10"
      border={{
        color: props.isActive ? theme.color.primary : theme.color.border,
        all: 'D1',
      }}
      height="D100"
      justifyContent="center"
      onClick={selectBox}
      maxWidth={size}
    >
      <Box flexDirection="row" alignItems="center">
        {iconName && (
          <Box minWidth="D64">
            <Icon iconName={iconName} size="D40" color="GRAY600" />
          </Box>
        )}
        <Box gap="S0">
          <Header3 colorType="black">{props.title}</Header3>
          <Text colorType="black" size="F12">
            {props.content}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
