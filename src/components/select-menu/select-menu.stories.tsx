import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { SelectMenuElement } from './select-menu';

const meta = {
  title: 'SelectMenuElement',
  component: SelectMenuElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<SelectMenuElement>;

export default meta;
type Story = StoryObj<SelectMenuElement>;

export const Basic: Story = {
  args: {
    label: 'Brand palette'
  },
  render: (props) => {
    return <p-select {...props} />;
  }
};
