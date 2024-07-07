import * as React from 'react';
import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { Spacing } from 'constants/Spacing';
import { Radius } from 'constants/Radius';
import { Box } from 'components/Box';
import { FontSize } from 'constants/FontSize';
import { Icon } from '../../Icon';

type SpacingTypes = keyof typeof Spacing;
type RadiusTypes = keyof typeof Radius;
type FontSizeTypes = keyof typeof FontSize;
type ColorTypes = keyof typeof Colors;

type CheckBoxProps = {
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  label?: string;
  labelSize?: FontSizeTypes;
  color?: ColorTypes;
  gap?: SpacingTypes;
  borderRadius?: RadiusTypes;
  error?: any;
  size?: 'small' | 'medium' | 'large';
  hasError?: boolean;
  [x: string]: any;
};

export const Checkbox = React.forwardRef<any, CheckBoxProps>(
  (props: CheckBoxProps, ref) => {
    const {
      checked,
      onClick,
      error,
      labelSize,
      color,
      disabled,
      ...checkinputProps
    } = props;

    return (
      <CheckboxInput onClick={onClick && !disabled ? onClick : () => {}}>
        <Input
          type="checkbox"
          {...checkinputProps}
          checked={checked}
          disabled={disabled}
          ref={ref}
        />
        <CheckboxDisplay>
          {checked && <Icon iconName="check" color="WHITE" size="D16" />}
        </CheckboxDisplay>
        <Label size={labelSize} color={color}>
          {props.label}
        </Label>

        {error && (
          <ErrorWrapper>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
      </CheckboxInput>
    );
  },
);

const CheckboxDisplay = styled.div``;
const Label = styled.label<{
  size?: FontSizeTypes;
  color?: ColorTypes;
}>`
  color: ${props =>
    ({ theme }) =>
      props.color ? Colors[props.color] : theme.color.blackText};
  font-size: ${props => (props.size ? FontSize[props.size] : FontSize.F14)};
`;

const Input = styled.input<CheckBoxProps>`
  display: none;
  cursor: pointer;

  & + ${CheckboxDisplay} {
    ${({ size }) => {
      if (size && size === 'small') {
        return 'width: 15px; height: 15px;';
      }
      if (size && size === 'medium') {
        return 'width: 18px; height: 18px;';
      } else {
        return 'width: 20px; height: 20px;';
      }
    }}

    border: 1px solid ${({ hasError }) =>
      hasError ? Colors.RED500 : Colors.GRAY400};
    border-radius: ${props =>
      props.borderRadius ? Radius[`${props.borderRadius}`] : Radius.R4};
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &:checked + ${CheckboxDisplay} {
    background-size: 1.4rem;
    background-position: center;
    border: none;
    background-color: ${props =>
      ({ theme }) =>
        props.disabled ? theme.color.checkBoxColor : theme.color.primary};
  }

  &:indeterminate + ${CheckboxDisplay} {
    background-color: ${({ theme }) => theme.color.primary};
  }

  &:invalid + ${Label} {
    color: ${Colors.RED100};
  }
`;

const CheckboxInput = styled(Box)`
  height: fit-content;
  width: fit-content;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
`;

const ErrorText = styled.small`
  color: ${p => p.theme.color.text};
  padding-left: 4px;
`;

const ErrorWrapper = styled.div`
  padding: 1.4px;
  color: ${Colors.RED500};
`;
