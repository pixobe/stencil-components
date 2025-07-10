import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { ColorList } from './color-list';

const meta: Meta<ColorList> = {
  title: 'Color List',
  component: ColorList,
  argTypes: {},
  args: {},
  render: (props) => {
    function onColorSelectEvent(e: any) {
      console.log(e.target.value)
    }
    return <color-list {...props} onColorSelected={onColorSelectEvent} ></color-list>
  },
};

export default meta;

type Story = StoryObj<ColorList>;


export const ColorPickerList: Story = {
  args: {
    name: "Text Color",
    value: "#cacaca",
    colors: ['#cacaca', "#fefefe", "#3d3d3d"]
  },
};