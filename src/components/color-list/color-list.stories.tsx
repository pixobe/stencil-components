import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color List',
  render: (args) => {
    const el = document.createElement("color-list");
    Object.assign(el, args)
    el.addEventListener('colorSelect', (e: any) => {
      console.log("on color select", e.detail)
    });

    el.addEventListener('closePicker', (e: any) => {
      console.log("oninput", e.detail)
    });

    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Default: Story = {
  args: {
    label: "Colors",
  },
};

export const WithColors: Story = {
  args: {
    label: "Colors",
    colors: ["#ffccaa", "#acabbb", '#ff000f', '#3D3D3D'],
    value: "#acabbb"
  },
};


export const EditMode: Story = {
  args: {
    label: "Colors",
    colors: ["#ffccaa", "#acabbb", '#ff000f', '#3D3D3D'],
    editMode: true
  },
};

export const WidthColorPicker: Story = {
  args: {
    label: "Colors",
    colors: ["#ffccaa", "#acabbb", '#ff000f', '#3D3D3D'],
    picker: true
  },
};
