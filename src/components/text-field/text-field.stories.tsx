import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Text Field',
  render: (args) => {
    const el = document.createElement("p-textfield");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Primary: Story = {
  args: {
    name: "firstName",
    label: "First Name"
  },
};

export const Secondary: Story = {
  args: {
    name: "Text",
    label: "Text"
  },
};
export const WithPlaceholder: Story = {
  args: {
    name: "Notes",
    label: "Notes",
    placeholder: "Enter your comments here..."
  },
};
