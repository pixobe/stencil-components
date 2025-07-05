import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FileUploader } from './file-uploader';

const meta: Meta<FileUploader> = {
  title: 'File Loader',
  component: FileUploader,
  argTypes: {
  },
  args: {
  },
  render: (props) => {
    function onValue(e: any) {
      console.log(e.detail)
    }
    return <file-uploader {...props} onInput={onValue}></file-uploader>
  },
};


export default meta;

type Story = StoryObj<FileUploader>;

export const FontSelector: Story = {
  args: {
    name: "image",
    label: "Upload jpg, svg, png for etching"
  },
};
export const FontSelectorValueSet: Story = {
  args: {
    name: "image",
  },
};
