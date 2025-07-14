import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { CheckBox } from './check-box';

const meta: Meta<CheckBox> = {
  title: 'Checkbox',
  component: CheckBox,
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


export const ColorPickerList: Story = {
  args: {
    label: "Preview"
  },
};