import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Picker',
  render: (args) => {
    const el = document.createElement("color-picker");

    el.addEventListener('cancel', () => {
      console.log("cancelled")
    });

    el.addEventListener('color', (e) => {
      console.log("oninput", e.detail)
    });

    el.addEventListener('select', (e) => {
      console.log("selected", e.detail)
    });

    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const ColorPicker: Story = {
  args: {
  },
};


export const ColorPickerWithColor: Story = {
  args: {
    value: "#3d3d3d"
  },
};
