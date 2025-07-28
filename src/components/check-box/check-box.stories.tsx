import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@storybook/html-vite';
import { CheckBox } from './check-box';

const meta: Meta<CheckBox> = {
  title: 'Checkbox',
  argTypes: {},
  args: {},
  render: (props) => {
    function onInput(e: any) {
      console.log(e.target.value)
    }
    return <check-box {...props} onInput={(e) => onInput(e)}></check-box>
  },
};

export default meta;

type Story = StoryObj<CheckBox>;


export const Unchecked: Story = {
  args: {
    label: "Preview"
  },
};

export const Checked: Story = {
  args: {
    label: "Preview",
    value: "true"
  },
};