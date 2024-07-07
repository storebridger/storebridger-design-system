import * as React from 'react';
import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import classNames from 'classnames';
import { customMedia } from 'styles/media';
import { DimensionType, Dimensions } from 'constants/Dimensions';
import { Icon } from '../../Icon';

type TextInputProps = {
  label?: string;
  error?: any;
  renderIcon?: () => React.ReactNode;
  prependIcon?: () => React.ReactNode;
  iconSize?: DimensionType;
  useDefaultWrapperHeightAndWidth?: boolean;
  [x: string]: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  isIconWidthFixed?: boolean;
  iconWidth?: DimensionType;
  isIconHeightFixed?: boolean;
  translateY?: string;
  height?: DimensionType;
  transparentBackground?: boolean;
};

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props: TextInputProps, ref) => {
    const {
      label,
      name,
      error,
      onChange,
      renderIcon,
      prependIcon,
      iconSize,
      useDefaultWrapperHeightAndWidth = true,
      isIconWidthFixed = true,
      iconWidth,
      isIconHeightFixed = true,
      translateY = '80%',
      transparentBackground,
      height,
      ...textInputProps
    } = props;

    const errorClass = classNames({
      error: error,
    });

    const [isPasswordShown, setIsPasswordShown] = React.useState(false);
    const showPassword = () => {
      setIsPasswordShown(prevState => !prevState);
    };

    const renderPasswordIcon = () => {
      if (isPasswordShown) {
        return (
          <span onClick={showPassword}>
            <Icon iconName="eye" />
          </span>
        );
      } else {
        return (
          <span onClick={showPassword}>
            <Icon iconName="eye-slash" />
          </span>
        );
      }
    };

    return (
      <Wrapper
        useDefaultWrapperHeightAndWidth={useDefaultWrapperHeightAndWidth}
        className="wrapper"
      >
        {prependIcon && (
          <InputIcon
            size={iconSize}
            isIconWidthFixed={isIconWidthFixed}
            iconWidth={iconWidth}
            isIconHeightFixed={isIconHeightFixed}
            left="8px"
            top="2px"
          >
            {prependIcon()}
          </InputIcon>
        )}
        <Input
          className={errorClass}
          id={name}
          name={name}
          {...textInputProps}
          type={isPasswordShown ? 'text' : textInputProps.type}
          placeholder=" "
          ref={ref}
          onChange={onChange}
          hasIconPrepend={!!prependIcon}
          transparentBackground={transparentBackground}
          height={height}
        />
        {label && <Label htmlFor={name}>{label}</Label>}
        {renderIcon && (
          <InputIcon
            size={iconSize}
            isIconWidthFixed={isIconWidthFixed}
            iconWidth={iconWidth}
            isIconHeightFixed={isIconHeightFixed}
            translateY={translateY}
          >
            {renderIcon()}
          </InputIcon>
        )}
        {textInputProps.type === 'password' && (
          <InputIcon>{renderPasswordIcon()}</InputIcon>
        )}
        {error && (
          <ErrorWrapper>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
      </Wrapper>
    );
  },
);

const Wrapper = styled.div<{ useDefaultWrapperHeightAndWidth?: boolean }>`
  height: ${props => (props.useDefaultWrapperHeightAndWidth ? '5rem' : 'auto')};
  position: relative;
  width: ${props => (props.useDefaultWrapperHeightAndWidth ? '100%' : 'auto')};
`;

const Input = styled.input<{
  hasIconPrepend?: boolean;
  transparentBackground?: boolean;
}>`
  border: 1px solid ${({ theme }) => theme.color.border};
  outline: 0;
  height: ${({ height }) => (height ? Dimensions[height] : `100%`)};
  border-radius: 5px;
  box-sizing: border-box;
  color: ${props => props.theme.color.inputText};
  transition: border 0.3s;
  font-size: 1.5rem;
  padding: 1.2rem
    ${({ hasIconPrepend }) => (hasIconPrepend ? '2rem' : '1.6rem')} 0;
  width: 100%;
  background-color: ${props =>
    props.transparentBackground
      ? 'transparent'
      : props.theme.color.inputBackground};

  &::-webkit-input-placeholder,
    /* Firefox 19+ */
  &:-moz-placeholder,
    /* Firefox 18- */
  &:-ms-input-placeholder {
    color: ${props => props.theme.color.inputPlaceholderText};
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    padding: 5px 0px;
    transform: translateY(-1.4rem) scale(0.75);
  }

  &:not(:placeholder-shown) ~ label {
    color: ${props => props.theme.color.inputPlaceholderText};
  }

  &:focus ~ label {
    color: ${props => props.theme.color.inputPlaceholderText};
  }

  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }

  &.error {
    background-color: ${Colors.INPUT_ERROR_FILL};
    border: 1px solid ${Colors.INPUT_ERROR_STROKE};
    color: ${({ theme }) => theme.color.errorInputText};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */

  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

const InputIcon = styled.span<{
  size?: DimensionType;
  iconWidth?: DimensionType;
  isIconWidthFixed?: boolean;
  isIconHeightFixed?: boolean;
  left?: string;
  top?: string;
  translateY?: string;
}>`
  position: absolute;
  z-index: 1000;
  ${props => (props.left ? `left: ${props.left}` : 'right: 12px')};
  ${props => props.top && `top: ${props.top}`};
  ${props =>
    !props.left && `transform: translateY(${props.translateY || '80%'});`};

  width: ${props =>
    props.isIconWidthFixed
      ? props.size
        ? Dimensions[props.size]
        : props.iconWidth
        ? Dimensions[props.iconWidth]
        : '20px'
      : 'auto'};
  height: ${props =>
    props.isIconHeightFixed
      ? props.size
        ? Dimensions[props.size]
        : '20px'
      : 'auto'};
  cursor: pointer;

  svg {
    width: ${props => (props.size ? Dimensions[props.size] : '20px')};
    height: ${props => (props.size ? Dimensions[props.size] : '20px')};
  }
`;

const Label = styled.label`
  color: ${props => props.theme.color.inputPlaceholderText};
  font-family: 'Nunito Sans';
  left: 1.6rem;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  font-weight: 500;
  top: 35%;
  transition: transform 0.5s;
  font-size: 1.4rem;
  ${customMedia.lessThan('small')`font-size: 1.4rem;`}
`;

const ErrorText = styled.span`
  color: ${Colors.RED500};
  font-size: ${Dimensions.D10};
`;

const ErrorWrapper = styled.div`
  padding-left: 5px;
`;
