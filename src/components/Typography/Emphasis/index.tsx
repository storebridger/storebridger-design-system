import { Text } from 'components/Typography/Text';

export const Emphasis: React.FC = ({
  children,
  color,
  size,
  lineHeight = 'inherit',
}: any) => {
  return (
    <em>
      <Text color={color} size={size} lineHeight={lineHeight}>
        {children}
      </Text>
    </em>
  );
};
