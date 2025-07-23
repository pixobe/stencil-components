import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { IcontextGroup } from './icontext-group';

const meta: Meta<IcontextGroup> = {
  title: 'IconTextGroup',
  component: IcontextGroup,
  argTypes: {},
  args: {},
  render: (props) => {
    return <icontext-group {...props}></icontext-group>
  },
};

export default meta;

type Story = StoryObj<IcontextGroup>;


export const DefaultGroup: Story = {
  args: {
    label: "Edit Text",
    icon: "icon-cog"
  },

};

export const Rounded: Story = {
  args: {
    label: "Rounded",
    icon: "icon-cog",
    rounded: true
  },
};