import type { Meta, StoryObj } from '@storybook/html-vite';
import { PixobeSpinner } from './pixobe-spinner';


const meta: Meta<any> = {
  title: 'Pixobe Spinner',
  render: (args) => {
    const wrap = document.createElement("div");
    wrap.classList.add("full-layout-image");


    const el = document.createElement("pixobe-spinner");
    Object.assign(el, args);

    wrap.appendChild(el)
    return wrap;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<PixobeSpinner>;


export const Spinner: Story = {
  args: {},
};



export const SpinnerWithMessage: Story = {
  args: {
    header: "Generating Images",
    message: "Please wait, it may take a while..."
  },
};

