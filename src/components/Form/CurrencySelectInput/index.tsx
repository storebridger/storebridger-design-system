import * as React from 'react';
import ReactSelect, { components } from 'react-select';
import { Control, Controller } from 'react-hook-form';
import styled from 'styled-components';
import classNames from 'classnames';
import { Radius } from 'constants/Radius';
import { Colors } from 'constants/Colors';
import { Dimensions } from 'constants/Dimensions';

type TextInputProps = {
  label?: string;
  error?: string;
  onChange?: (event) => void;
  disabled?: boolean;
  [x: string]: any;
  control: Control<Record<string, unknown>, any>;
};
export const CurrencySelectInput = React.forwardRef<any, TextInputProps>(
  (props: TextInputProps, ref) => {
    const { name, error, onChange, control, disabled, ...textInputProps } =
      props;
    const errorClass = classNames({
      error: error,
    });

    const CurrencySelectLabel = props => {
      return (
        <>
          <Label>{props.selectProps.label}</Label>
          <components.Control {...props} />
        </>
      );
    };

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Wrapper>
              <Select
                className={errorClass}
                {...field}
                id={name}
                name={name}
                {...textInputProps}
                components={{ Control: CurrencySelectLabel }}
                classNamePrefix="react-select"
                ref={ref}
                onChange={event => {
                  onChange && onChange(event);
                  field.onChange(event);
                }}
                isDisabled={disabled}
              />
              {error && (
                <ErrorWrapper>
                  <ErrorText>{error}</ErrorText>
                </ErrorWrapper>
              )}
            </Wrapper>
          );
        }}
      />
    );
  },
);

const Wrapper = styled.div`
  position: relative;
  width: 40%;
  height: 5rem;
  &:last-child {
    margin-top: unset;
  }
`;

const Select = styled(ReactSelect)`
  height: 100%;

  .react-select__control {
    outline: 0;
    height: 100%;
    border-radius: ${Radius.R4};
    box-sizing: border-box;
    transition: border 0.3s;
    font-size: 1.5rem;
    width: 100%;
    box-shadow: unset;
    border: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${props => props.theme.color.inputBackground};

    &::-webkit-input-placeholder,
      /* Firefox 19+ */
    &:-moz-placeholder,
      /* Firefox 18- */
    &:-ms-input-placeholder {
      color: ${props => props.theme.color.inputText};
    }

    &:hover {
      border: 1px solid ${Colors.GRAY400};
    }

    &:focus {
      outline: none;
    }
  }

  .react-select__placeholder {
    display: none;
  }

  .react-select__input_container {
    height: 100%;
    width: 100%;
  }

  .react-select__input {
    height: 100%;
    width: 100%;
    display: flex;
    color: ${props => props.theme.color.inputText};
    padding: 0.4rem 2rem 0 !important;
  }

  .react-select__single-value {
    position: absolute;
    padding: 0.4rem 1.6rem 0;
    color: ${props => props.theme.color.inputText};
  }

  .react-select__option--is-focused {
    background-color: ${Colors.GRAY400};
    color: ${Colors.GRAY700};
  }

  .react-select__option--is-selected {
    background-color: ${Colors.PRIMARY};
    color: ${Colors.WHITE};
  }

  .react-select__value-container {
    height: 100%;
    padding: 0;
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__menu {
    background-color: ${({ theme }) => theme.color.background};
    color: ${props => props.theme.color.text};
  }

  .react-select__indicator {
    color: ${props => props.theme.color.disabledInput};
    height: 100%;
    margin-top: 10px;
  }

  &.error {
    .react-select__control {
      background-color: ${Colors.INPUT_ERROR_FILL};
      border: 1px solid ${Colors.INPUT_ERROR_STROKE};
      color: ${({ theme }) => theme.color.errorInputText};
    }
  }
`;

const ErrorText = styled.small`
  color: ${Colors.RED500};
  font-size: ${Dimensions.D10};
`;

const ErrorWrapper = styled.div`
  margin-top: 1px;
  padding-left: 5px;
`;

interface ILabel {
  isFloating?: boolean;
}
const Label = styled.label<ILabel>`
  color: ${props => props.theme.color.inputPlaceholderText};
  font-family: 'Nunito Sans';
  left: 1rem;
  line-height: 1.2rem;
  top: 40%;
  pointer-events: none;
  z-index: 1;
  position: absolute;
  pointer-events: none;
  transition: all 0.5s ease;
  transform: ${props =>
    props.isFloating
      ? `translateY(-13px) scale(0.95)`
      : `translateY(0px) scale(1)`};
  font-size: 1.4rem;
`;
