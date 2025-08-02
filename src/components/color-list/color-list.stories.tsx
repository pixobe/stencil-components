import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color List',
  render: (args) => {
    const el = document.createElement("color-list");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const ColorPicker: Story = {
  args: {
    label: "Colors",
    colors: ["#ffccaa", "#acabbb", '#ff000f', '#3D3D3D'],
    editable: true
  },
};

