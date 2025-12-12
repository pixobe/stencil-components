import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeTextAreaElement } from './textarea';

const meta = {
  title: 'Textarea',
  component: PixobeTextAreaElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeTextAreaElement>;

export default meta;
type Story = StoryObj<PixobeTextAreaElement>;

export const Basic: Story = {
  args: {
    label: 'Comments',
    placeholder: "Write your comments"
  },
  render: (props) => {
    return <p-textarea {...props} />;
  }
};
