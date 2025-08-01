import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'File/File Uploader',
  render: (args) => {
    const el = document.createElement("file-uploader");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const FileUploader: Story = {
  args: {
    name: "image",
  },
};



export const FileUpladerWithLabel: Story = {
  args: {
    name: "image",
    label: "Upload jpg, svg, png for etching"
  },
};

