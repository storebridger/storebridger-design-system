import * as React from 'react';
import styled from 'styled-components';
import { Colors } from 'constants/Colors';
import { Box } from 'components/Box';

interface InputElementProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  error?: boolean;
  disabled?: boolean;
}

export const RadioInput = ({
  label,
  id,
  disabled,
  ...rest
}: InputElementProps) => {
  return (
    <Wrapper>
      <Box>
        <Radio id={id} type="radio" disabled={disabled} {...rest} />
      </Box>
      <Label htmlFor={id}>{label}</Label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.blackText};
  left: 2rem;
  line-height: 14px;
  font-size: 1.4rem;
  pointer-events: none;
  transform-origin: 0 50%;
  top: 20px;
  transition: transform 200ms;
`;

const Radio = styled.input`
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  width: 1.7rem;
  height: 1.7rem;
  border: 1px solid ${Colors.GRAY500};
  border-radius: 50%;
  cursor: pointer;

  :checked {
    border: 5px solid ${({ theme }) => theme.color.primary};

    ::after {
      border: 5px solid ${({ theme }) => theme.color.primary};
    }
  }

  :disabled {
    cursor: not-allowed;
    border: 2px solid ${Colors.PURPLE100};
    background-color: ${Colors.PURPLE500};

    :hover {
      ::after {
        background-color: ${Colors.PURPLE500};
      }
    }

    :checked {
      ::after {
        background-color: ${Colors.PURPLE100};
      }

      :hover {
        background-color: ${Colors.PURPLE500};

        ::after {
          background-color: ${Colors.PURPLE100};
        }
      }
    }
  }
`;
