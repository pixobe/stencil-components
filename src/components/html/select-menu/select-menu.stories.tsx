import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { fn } from 'storybook/test';
import { SelectMenu } from './select-menu';

const meta: Meta<SelectMenu> = {
  title: 'SelectMenu',
  component: SelectMenu,
  argTypes: {
  },
  args: {
    onSelectMenu: fn()
  },
  render: (props) => { return <select-menu {...props}></select-menu> },
};

export default meta;

type Story = StoryObj<SelectMenu>;

export const Primary: Story = {
  args: {},
};

export const Secondary: Story = {
  args: {
    label: "Fonts",
    options: [
      {
        label: "Roboto",
        value: "Roboto"
      },
      {
        label: "Times New Roman",
        value: "Times New Roman"
      }
    ]
  },
};
