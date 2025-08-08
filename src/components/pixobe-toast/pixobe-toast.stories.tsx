import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Toast',
  render: (args) => {
    const el = document.createElement("pixobe-toast");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const Succes: Story = {
  args: {
    message: "Product added to cart successfully.",
    timeout: 60
  },
};

export const Error: Story = {
  args: {
    message: "Unable to add product.",
    timeout: 60,
    status: "error",
  },
};

export const ShortTimeout: Story = {
  args: {
    message: "Unable to add product.",
    status: "error",
    timeout: 2
  },
};