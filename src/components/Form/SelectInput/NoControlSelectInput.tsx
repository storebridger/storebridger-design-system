import * as React from 'react';
import ReactSelect, { components } from 'react-select';
import styled from 'styled-components';
import classNames from 'classnames';
import { Radius } from 'constants/Radius';
import { Colors } from 'constants/Colors';
import { Dimensions } from 'constants/Dimensions';

type TextInputProps = {
  label?: string;
  error?: string;
  onChange?: any;
  [x: string]: any;
};
export const NoControlSelectInput = React.forwardRef<any, TextInputProps>(
  (props: TextInputProps, ref) => {
    const { name, error, onChange, control, ...textInputProps } = props;
    const errorClass = classNames({
      error: error,
    });

    const SelectLabel = props => {
      return (
        <>
          <Label isFloating={props.isFocused || props.hasValue}>
            {props.selectProps.label}
          </Label>
          <components.Control {...props} />
        </>
      );
    };

    return (
      <Wrapper>
        <Select
          className={errorClass}
          id={name}
          name={name}
          {...textInputProps}
          components={{ Control: SelectLabel }}
          classNamePrefix="react-select"
          ref={ref}
          onChange={onChange}
        />
        {error && (
          <ErrorWrapper>
            <ErrorText>{error}</ErrorText>
          </ErrorWrapper>
        )}
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  position: relative;
  width: 100%;
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
    height: 100% !important;
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
    color: ${props => props.theme.color.inputText};
    padding: 0;
    padding-left: 1rem;
    margin: 0 !important;
  }

  .react-select__option--is-focused {
    background-color: ${Colors.GRAY400};
    color: ${Colors.GRAY700};
  }

  .react-select__option--is-selected {
    background-color: ${({ theme }) => theme.color.primary};
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
    z-index: 10000;
    color: ${props => props.theme.color.text};
    padding: 0;
    margin: 5px 0 0 0;
  }

  .react-select__indicator {
    color: ${props => props.theme.color.inputText};
    padding: 0;
    height: fit-content;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0.8rem;
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
  top: ${props => (props.isFloating ? `0` : `50%`)};
  pointer-events: none;
  z-index: 10;
  position: absolute;
  pointer-events: none;
  transition: all 0.5s ease;
  transform: ${props =>
    props.isFloating
      ? `translateY(0) scale(0.9)`
      : `translateY(-50%) scale(1)`};
  font-size: ${props => (props.isFloating ? `1.2rem` : `1.4rem`)};
  ${props => props.isFloating && `padding-top: 5px;`}
`;
