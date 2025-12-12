import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeColorSwatchesElement } from './color-swatch';

const meta = {
  title: 'ColorSwatches',
  component: PixobeColorSwatchesElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeColorSwatchesElement>;

export default meta;
type Story = StoryObj<PixobeColorSwatchesElement>;

export const Basic: Story = {
  args: {
    label: 'Brand palette'
  },
  render: (props) => {
    return <p-colorswatch {...props} />;
  }
};
