import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { FontPicker } from './font-picker';

const meta = {
  title: 'FontPicker',
  component: FontPicker,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<FontPicker>;

export default meta;
type Story = StoryObj<FontPicker>;

export const Basic: Story = {
  args: {
    label: 'Brand palette'
  },
  render: (props) => {
    return <p-select {...props} />;
  }
};
