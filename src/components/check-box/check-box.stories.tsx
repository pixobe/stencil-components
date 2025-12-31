import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeCheckBoxElement } from './check-box';

const meta = {
  title: 'PixobeCheckBox',
  component: 'p-checkbox',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' }
  },
  args: {},
} satisfies Meta<PixobeCheckBoxElement>;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  args: {
    name: "agreed",
    label: 'Agree'
  },
  render: (props: any) => {
    return <p-checkbox {...props} />;
  }
};