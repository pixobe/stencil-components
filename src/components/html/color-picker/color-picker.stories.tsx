import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorPicker } from './color-picker';

const meta: Meta<ColorPicker> = {
  title: 'Color Picker',
  component: ColorPicker,
  argTypes: {},
  args: {},
  render: (props) => {
    function onInputFn(e) {
      console.log(e.details.value)
    }
    return <color-picker {...props} onInput={onInputFn} ></color-picker>
  },
};

export default meta;

type Story = StoryObj<ColorPicker>;

export const ColorPickerDefault: Story = {
  args: {
    name: "Text Color",
  },
};

export const ColorPickerWithValue: Story = {
  args: {
    name: "Text Color",
    value: "#cacaca"
  },
};

export const ColorPickerList: Story = {
  args: {
    name: "Text Color",
    value: "#cacaca",
    colors: ['#cacaca', "#fefefe", "#3d3d3d"]
  },
};