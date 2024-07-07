import { Box } from 'components/Box';
import { Icon, IconName } from 'components/Icon';
import { Header3, Text } from 'components/Typography';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { DimensionType } from 'constants/Dimensions';

interface Props {
  title: string;
  content: string;
  iconName?: IconName;
  isActive?: boolean;
  onClick?: () => void;
  size?: DimensionType;
}

export function InfoCard(props: Props) {
  const { iconName, size } = props;
  const theme = useContext(ThemeContext);
  return (
    <Box
      padding="S24"
      borderRadius="R10"
      border={{
        color: props.isActive ? theme.color.primary : theme.color.border,
        all: 'D1',
      }}
      onClick={props.onClick}
      maxWidth={size}
    >
      <Box flexDirection="row" alignItems="center">
        {iconName && (
          <Box minWidth="D64">
            <Icon iconName="shopping-bag" size="D40" color="GRAY600" />
          </Box>
        )}
        <Box gap="S0">
          <Header3 color="GRAY600">{props.title}</Header3>
          <Text color="GRAY600" size="F12">
            {props.content}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
