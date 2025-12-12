import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeTextFieldElement } from './text-field';

const meta = {
  title: 'TextField',
  component: PixobeTextFieldElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeTextFieldElement>;

export default meta;
type Story = StoryObj<PixobeTextFieldElement>;

export const Basic: Story = {
  args: {
    label: 'Comments',
    placeholder: "Write your comments"
  },
  render: (props) => {
    return <p-textfield {...props} />;
  }
};
