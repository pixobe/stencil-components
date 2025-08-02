import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Input',
  render: (args) => {
    const el = document.createElement("color-input");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const NoValue: Story = {
  args: {
    label: "Colors",
    value: ''
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Colors",
    value: '#ff0000'
  },
};

