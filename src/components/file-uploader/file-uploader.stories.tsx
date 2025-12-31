import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { FileUploader } from './file-uploader';

const meta = {
  title: 'FileUploader',
  component: "p-fileuploader",
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<FileUploader>;

export default meta;
type Story = StoryObj<FileUploader>;

export const Basic: Story = {
  args: {
    label: 'Brand palette'
  },
  render: (props) => {
    return <p-fileuploader {...props} />;
  }
};
