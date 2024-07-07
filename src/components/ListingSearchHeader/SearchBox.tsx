import React, { memo } from 'react';
import styled from 'styled-components';
import { UseControllerProps, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form } from 'components/Form';
import { Icon } from 'components/Icon';
import { Colors } from 'constants/Colors';

export type SearchFormValues = {
  search: string;
};

export type FormFieldProps = {
  name: keyof SearchFormValues;
  placeholder: string;
  component: React.ComponentType<UseControllerProps<SearchFormValues>>;
  [x: string]: any;
};

const schema = yup
  .object({
    search: yup.string().required().trim(),
  })
  .required();

interface Props {
  placeholder: string;
  changeAction?: (e: string) => void;
  submitAction?: (form: SearchFormValues) => void;
}

export const Search = memo(({ placeholder, changeAction }: Props) => {
  const { handleSubmit, register } = useForm<SearchFormValues>({
    defaultValues: {
      search: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onChangeHandler = (e: { target: { value: string } }) => {
    changeAction && changeAction(e.target.value);
  };

  const submitHandler = (form: SearchFormValues, e?: any) => {
    e?.preventDefault();
    changeAction && changeAction(form.search);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <SearchIcon>
          <Icon iconName="magnifying-glass" />
        </SearchIcon>
        <SearchField
          {...register('search')}
          placeholder={placeholder}
          name="search"
          onChange={onChangeHandler}
        />
      </Form>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  margin: auto 0;
  position: relative;
  background-color: transparent;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.border};
  height: 100%;
  max-height: 5rem;
  width: 100%;
  align-items: center;
`;

type InputComponent = Pick<FormFieldProps, 'placeholder'>;

const SearchField = styled.input<InputComponent>`
  width: 100% !important;
  height: 100%;
  background-color: transparent;
  padding-left: 5rem;
  border: none;
  color: ${p => p.theme.color.text};
  font-size: 1.4rem;
  border-radius: 4px;

  &::-webkit-input-placeholder,
  &::-moz-placeholder,
  &:-moz-placeholder,
  &:-ms-input-placeholder {
    color: ${Colors.INPUT_TEXT};
  }

  &:focus,
  &:active {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
