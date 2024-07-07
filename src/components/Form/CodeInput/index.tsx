import * as React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import ReactCodeInput from 'react-code-input';
import { Colors } from 'constants/Colors';

type CodeInputProps = {
  [x: string]: any;
};
export const CodeInput = React.forwardRef<HTMLInputElement, CodeInputProps>(
  (props: CodeInputProps, ref) => {
    const { type, fields, name, inputMode, error, ...codeInputProps } = props;
    const errorClass = classNames({
      error: error,
    });
    return (
      <Wrapper>
        <Input
          className={errorClass}
          name={name}
          type="password"
          inputMode={inputMode}
          fields={fields}
          isValid={error ? false : true}
          {...codeInputProps}
        />
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  height: max-content;
  position: relative;
  width: 100%;

  &:last-child() {
    margin-top: unset;
  }
  display: flex;
  justify-content: center;
`;

const Input = styled(ReactCodeInput)`
  input {
    font-family: monospace;
    border-radius: 6px;
    border: 1px solid grey;
    margin: 5px;
    width: 5rem;
    height: 5rem;
    padding-left: 1.5rem;
    font-size: 3.2rem;
    box-sizing: border-box;
    color: black;
    background-color: ${props => props.theme.color.inputBackground};
    outline: 0;
    box-sizing: border-box;
    color: ${props => props.theme.color.inputText};
    transition: border 0.3s;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  &.error {
    input {
      background-color: ${Colors.INPUT_ERROR_FILL};
      border: 1px solid ${Colors.INPUT_ERROR_STROKE};
    }
  }
`;
