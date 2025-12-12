import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeCheckBoxElement } from './check-box';

const meta = {
  title: 'ColorSwatches',
  component: PixobeCheckBoxElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeCheckBoxElement>;

export default meta;
type Story = StoryObj<PixobeCheckBoxElement>;

export const Basic: Story = {
  args: {
    label: 'Brand palette'
  },
  render: (props) => {
    return <p-colorswatch {...props} />;
  }
};
