import * as React from 'react';
import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import classNames from 'classnames';
import { Dimensions } from 'constants/Dimensions';

type TextInputProps = {
  label?: string;
  error?: any;
  maxCharacter?: number;
  currentValueWatcher?: () => {};
  renderIcon?: () => React.ReactNode;
  [x: string]: any;
};

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextInputProps
>((props: TextInputProps, ref) => {
  const { label, name, error, renderIcon, maxCharacter, ...textInputProps } =
    props;
  const errorClass = classNames({
    error: error,
  });
  const watchFields =
    textInputProps.characterWatcher && textInputProps.characterWatcher([name]);
  const currentValueLength =
    watchFields && watchFields[0] ? watchFields[0].length : 0;

  return (
    <Wrapper hasBottomContent={!!maxCharacter}>
      <Input
        className={errorClass}
        id={name}
        name={name}
        {...textInputProps}
        placeholder=" "
        maxLength={maxCharacter ? maxCharacter : 10000}
        ref={ref}
      />
      {label && (
        <Label htmlFor={name} error={error}>
          {label}
        </Label>
      )}
      {error && (
        <ErrorWrapper>
          <ErrorText>{error}</ErrorText>
        </ErrorWrapper>
      )}
      {maxCharacter && (
        <CharacterCountDiv>
          {currentValueLength}/{maxCharacter}
        </CharacterCountDiv>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ hasBottomContent?: boolean }>`
  height: 10rem;
  position: relative;
  width: 100%;
  ${({ hasBottomContent }) => hasBottomContent && `margin-bottom: 1rem;`}
`;

const Input = styled.textarea<{ error?: any }>`
  border: 1px solid ${({ theme }) => theme.color.border};
  outline: 0;
  height: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  color: ${props => props.theme.color.inputText};
  transition: all 0.3s;
  font-size: 1.5rem;
  padding: 2.5rem 1.6rem;
  width: 100%;
  background-color: ${props => props.theme.color.inputBackground};

  &::-webkit-input-placeholder,
        /* Firefox 19+ */
    &:-moz-placeholder,
        /* Firefox 18- */
    &:-ms-input-placeholder {
    color: ${props => props.theme.color.inputPlaceholderText};
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    font-size: 1.1rem;
  }

  &:not(:placeholder-shown) ~ label {
    color: ${props => props.theme.color.inputPlaceholderText};
  }

  &:focus ~ label,
  &:active ~ label {
    color: ${props => props.theme.color.inputPlaceholderText};
    border-top: 1px solid ${({ theme }) => theme.color.primary};
    border-left: 1px solid ${({ theme }) => theme.color.primary};
    border-right: 1px solid ${({ theme }) => theme.color.primary};
  }

  &:focus,
  &:active {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }

  &.error ~ label {
    border-top: 1px solid ${Colors.INPUT_ERROR_STROKE};
    border-left: 1px solid ${Colors.INPUT_ERROR_STROKE};
    border-right: 1px solid ${Colors.INPUT_ERROR_STROKE};
  }

  &.error {
    background-color: ${Colors.INPUT_ERROR_FILL};
    border: 1px solid ${Colors.INPUT_ERROR_STROKE};
    color: ${({ theme }) => theme.color.errorInputText};
  }
`;

const Label = styled.label<{ error?: any }>`
  display: block;
  color: ${({ theme, error }) =>
    error ? theme.color.errorInputText : theme.color.inputPlaceholderText};
  line-height: 14px;
  font-weight: 500;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  left: 0;
  top: 0;
  transition: all 0.3s;
  font-size: 1.4rem;
  width: 100%;
  padding: 0.8rem 1.6rem 0.4rem 1.6rem;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  border-top: 1px solid
    ${({ theme, error }) =>
      error ? Colors.INPUT_ERROR_FILL : theme.color.border};
  border-right: 1px solid
    ${({ theme, error }) =>
      error ? Colors.INPUT_ERROR_FILL : theme.color.border};
  border-left: 1px solid
    ${({ theme, error }) =>
      error ? Colors.INPUT_ERROR_FILL : theme.color.border};

  background-color: ${({ theme, error }) =>
    error ? Colors.INPUT_ERROR_FILL : theme.color.inputBackground};
`;

const ErrorText = styled.small`
  color: ${Colors.RED500};
  ${p => p.theme.direction['margin-left']}: 4px;
  font-size: ${Dimensions.D10};
`;
const ErrorWrapper = styled.div`
  padding-left: 5px;
`;

const CharacterCountDiv = styled.div`
  position: absolute;
  right: 0;
  bottom: -2rem;
  color: ${props => props.theme.color.text};
  font-size: 1.2rem;
`;
