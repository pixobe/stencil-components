import type { StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const meta = {
  title: 'PixobeColorSwatches',
  component: "p-colorswatch",
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
};

export default meta;
type Story = StoryObj<any>;

export const Basic: Story = {
  args: {
    label: 'Brand palette',
    name: "agreement"
  },
  render: (props) => {
    return <p-p-colorswatch {...props} />;
  }
};
