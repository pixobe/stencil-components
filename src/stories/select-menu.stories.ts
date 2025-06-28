import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { SelectMenu } from '../components/select-menu/select-menu';
const meta: Meta<SelectMenu> = {
  title: 'MyComponent',
  component: SelectMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<SelectMenu>;

export const Primary: Story = {
  args: {},
  render: () => <select-menu {...props} />,
};
