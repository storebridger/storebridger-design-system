import type { Meta, StoryObj } from '@storybook/react';

import { Btn } from './index';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Btn> = {
  title: 'Example/Button',
  component: Btn,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Btn>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'primary',
    width: 'content',
    paddingX: 'S16',
    paddingY: 'S8',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    type: 'secondary',
    width: 'content',
    paddingX: 'S16',
    paddingY: 'S8',
  },
};

export const DisabledPrimary: Story = {
  args: {
    type: 'primary',
    width: 'content',
    paddingX: 'S16',
    paddingY: 'S8',
    disabled: true,
  },
};

export const DisabledSecondary: Story = {
  args: {
    type: 'secondary',
    width: 'content',
    paddingX: 'S16',
    paddingY: 'S8',
    disabled: true,
  },
};
