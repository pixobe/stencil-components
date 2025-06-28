import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectMenu } from './select-menu';

const meta: Meta<SelectMenu> = {
  title: 'SelectMenu',
  component: SelectMenu,
  argTypes: {},
  args: {},
  render: () => { return <select-menu></select-menu> },
};

export default meta;

type Story = StoryObj<SelectMenu>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {},
};
