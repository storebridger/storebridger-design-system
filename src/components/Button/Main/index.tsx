import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { FontSize } from 'constants/FontSize';
import { customMedia } from 'styles/media';
import { Spacing } from 'constants/Spacing';
import { Dimensions } from 'constants/Dimensions';
import { Icon, IconName } from '../../Icon';

type fontSize = keyof typeof FontSize;

export interface ButtonProps {
  children?: string | React.ReactNode;
  icons?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'outline'
    | 'authButton'
    | 'warning'
    | 'danger';
  disabled?: boolean;
  width?: 'full' | 'content';
  height?: 'D32' | 'D40' | 'D50';
  fontSize?: fontSize;
  iconName?: IconName | null;
  iconPosition?: 'left' | 'right';
  noPadding?: boolean;
  paddingX?: 'S0' | 'S8' | 'S12' | 'S16' | 'S24' | 'S32' | 'S48' | 'S50';
  paddingY?: 'S0' | 'S8' | 'S12' | 'S16' | 'S24' | 'S32';
  htmlType?: 'button' | 'submit' | 'reset';
  position?:
    | 'static'
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'sticky'
    | 'inherit'
    | 'initial'
    | 'unset';
}

const Base: React.FC<ButtonProps> = styled.button<ButtonProps>`
  padding: ${props => (props.noPadding ? 0 : '1.5rem 3rem')};
  ${({ paddingX }) =>
    paddingX &&
    `padding-left: ${Spacing[paddingX]};padding-right: ${Spacing[paddingX]};`}
  ${({ paddingY }) =>
    paddingY &&
    `padding-top: ${Spacing[paddingY]};padding-bottom: ${Spacing[paddingY]};`}

    border: ${props =>
    props.disabled ? `1px solid ${Colors.GRAY200}` : 'none'};
  border-radius: 0.4rem;
  transition: all 0.5s ease;
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: ${props =>
    (props.fontSize && FontSize[props.fontSize]) || FontSize.F16};
  gap: 0.5rem;
  position: ${props => props.position || 'relative'};

  & > * {
    margin: 0 !important;
  }

  width: ${props => {
    if (props.width === 'content') {
      return 'max-content';
    }
    return '100%';
  }};
  height: ${({ height }) => (height ? Dimensions[height] : 'auto')};
  @media (max-width: 600px) {
    padding: ${props => (props.noPadding ? 0 : '1.2rem 1.8rem')};
  }
  ${customMedia.lessThan('small')`
  font-size: ${FontSize.F14};
  `};
`;

const Primary = styled(Base)`
  background-color: ${({ theme, disabled }) =>
    disabled ? Colors.BUTTON_DISABLED : theme.color.primary};
  color: ${Colors.WHITE};
  border: none;

  &:focus {
    border: 1px solid ${Colors.PURPLE500};
  }

  &:active,
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? Colors.BUTTON_DISABLED : Colors.BLUE900};
  }
`;

const Outline = styled(Base)`
  background-color: ${Colors.TRANSPARENT} !important;

  border: ${props =>
    props.disabled
      ? `1px solid ${Colors.GRAY200}`
      : `1px solid ${props.theme.color.primary}`};

  color: ${props =>
    ({ theme }) =>
      props.disabled ? Colors.GRAY500 : theme.color.primary};
`;

const Secondary = styled(Base)`
  background: transparent;
  color: ${props =>
    props.disabled ? Colors.GRAY500 : ({ theme }) => theme.color.primary};
  border: ${props =>
    props.disabled
      ? `1px solid ${Colors.GRAY200}`
      : ` 1px solid ${props.theme.color.primary}`};

  &:focus {
    border: 1px solid ${Colors.PURPLE500};
  }

  &:active,
  &:hover {
    background-color: ${Colors.PURPLE100};
  }
`;

const Tertiary = styled(Base)`
  background: ${Colors.TRANSPARENT};
  color: ${props =>
    ({ theme }) =>
      props.disabled ? Colors.GRAY500 : theme.color.primary};
  border: 1px solid transparent;

  &:focus {
    border: 1px solid ${Colors.PURPLE500};
  }

  &:active,
  &:hover {
    background-color: ${Colors.GRAY1100};
    border: 1px solid ${Colors.GRAY1100};
  }
`;

const Warning = styled(Base)`
  background-color: ${Colors.TRANSPARENT} !important;

  border: ${props =>
    props.disabled
      ? `1px solid ${Colors.GRAY200}`
      : `1px solid ${Colors.RED500}`};

  color: ${props => () => props.disabled ? Colors.GRAY500 : Colors.RED500};
`;

const AuthButton = styled(Base)`
  background-color: ${Colors.TRANSPARENT} !important;

  border: ${props =>
    props.disabled
      ? `1px solid ${Colors.GRAY200}`
      : `1px solid ${Colors.GRAY500}`};

  color: ${props =>
    ({ theme }) =>
      props.disabled ? Colors.GRAY500 : theme.color.primary};

  border-radius: 3rem;
`;

const Danger = styled(Base)`
  background: ${Colors.TRANSPARENT};

  border: ${props =>
    props.disabled
      ? `1px solid ${Colors.GRAY200}`
      : `1px solid ${Colors.RED500}`};

  color: ${props => () => props.disabled ? Colors.GRAY500 : Colors.RED500};

  &:focus {
    border: 1px solid ${Colors.RED700};
    color: ${Colors.RED700};
  }

  &:active,
  &:hover {
    opacity: 0.7;
  }
`;

export const Button = ({
  children,
  type,
  disabled,
  width,
  height,
  iconName,
  iconPosition,
  onClick,
  paddingX,
  fontSize,
  paddingY,
  noPadding,
  htmlType,
  position,
}: ButtonProps) => {
  switch (type) {
    case 'primary':
      return (
        <Primary
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'WHITE'} />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'WHITE'} />
          )}
        </Primary>
      );
    case 'secondary':
      return (
        <Secondary
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
        </Secondary>
      );
    case 'tertiary':
      return (
        <Tertiary
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
        </Tertiary>
      );
    case 'warning':
      return (
        <Warning
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon
              iconName={iconName}
              color={disabled ? 'GRAY500' : 'PRIMARY'}
            />
          )}
        </Warning>
      );
    case 'outline':
      return (
        <Outline
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          noPadding={noPadding}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {children}
        </Outline>
      );
    case 'authButton':
      return (
        <AuthButton
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
        >
          {children}
        </AuthButton>
      );
    case 'danger':
      return (
        <Danger
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          htmlType={htmlType}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'RED500'} />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'RED500'} />
          )}
        </Danger>
      );
    default:
      return (
        <Primary
          disabled={disabled}
          width={width}
          height={height}
          onClick={onClick}
          paddingX={paddingX}
          paddingY={paddingY}
          fontSize={fontSize}
          position={position}
        >
          {iconName && iconPosition !== 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'WHITE'} />
          )}
          {children}
          {iconName && iconPosition === 'right' && (
            <Icon iconName={iconName} color={disabled ? 'GRAY500' : 'WHITE'} />
          )}
        </Primary>
      );
  }
};
