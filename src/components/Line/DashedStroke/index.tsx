import { Colors } from 'constants/Colors';

interface DashProps {
  dashWidth?: number;
  dashGap?: number;
  dashThickness?: number;
  color?: keyof typeof Colors;
}

export const DashedStroke = ({
  dashWidth = 10,
  dashGap = 5,
  dashThickness = 1,
  color = 'GRAY500',
}: DashProps) => {
  const dashArray = `${dashWidth}, ${dashGap}`;
  return (
    <svg
      width="100%"
      height={dashThickness}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        strokeWidth={dashThickness}
        strokeDasharray={dashArray}
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        style={{ stroke: Colors[color] }}
      ></line>
    </svg>
  );
};
