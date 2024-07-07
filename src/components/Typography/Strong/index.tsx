import { Text, TextProps } from 'components/Typography/Text';

export const Strong: React.FC = ({
  children,
  color,
  size,
  lineHeight,
}: Partial<TextProps>) => {
  return (
    <strong>
      <Text color={color} size={size} lineHeight={lineHeight}>
        {children}
      </Text>
    </strong>
  );
};
