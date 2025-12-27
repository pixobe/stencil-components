import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeToastElement } from './pixobe-toast';

const meta = {
  title: 'Toast',
  component: PixobeToastElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeToastElement>;

export default meta;
type Story = StoryObj<PixobeToastElement>;

export const Basic: Story = {
  args: {
    message: "Settings saved."
  },
  render: (props) => {
    return <p-toast {...props} />;
  }
};
