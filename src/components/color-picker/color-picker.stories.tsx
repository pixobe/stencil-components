import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Picker',
  render: (args) => {
    const el = document.createElement("color-picker");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const ColorPicker: Story = {
  args: {},
};

