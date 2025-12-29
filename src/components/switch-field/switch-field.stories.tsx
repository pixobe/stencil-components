import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeSwitchFieldElement } from './switch-field';

const meta = {
  title: 'Switch',
  component: PixobeSwitchFieldElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeSwitchFieldElement>;

export default meta;
type Story = StoryObj<PixobeSwitchFieldElement>;

export const Basic: Story = {
  args: {
    label: 'Comments',
    placeholder: "Write your comments"
  },
  render: (props) => {
    return <p-switch {...props} />;
  }
};
