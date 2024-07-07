import React from 'react';
import { Button } from 'components/Button';
import { ButtonProps } from 'components/Button/Main';

type StoryBookButtonType = ButtonProps & { label: string };
export const Btn = (props: StoryBookButtonType) => {
  return <Button {...props}>{props.label || 'Storebridger'}</Button>;
};
