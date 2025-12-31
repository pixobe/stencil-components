import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';

const icons = [
  'spinner',
  'whatsapp',
  'facebook',
  'instagram',
  'pixobe',
  'support',
  'monogram',
  'alignleft',
  'aligncenter',
  'alignright',
  'circle',
  'text',
  'close',
  'info',
  'upload',
  'image',
  "gallery",
  'add-image',
  'upload-image',
  'noimage',
  'add',
  'edit',
  'fliph',
  'flipv',
  'cart',
  'rotate',
  'wrench',
  'done',
  'redo',
  'arrow',
  'magic',
  'pdf',
  'preview',
  'trash',
  'add-cart',
  'text',
  'error',
  "tick",
  "tick-circle",
  "settings",
  "cog",
  "download",
  "viewfill"
];



const meta = {
  title: 'IconsPack',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
  // Define common render function at meta level
  render: (args) => {
    const cls = `icons ${args.className}`;
    return <div class={cls}>{icons.map((icon) => {
      const T = `icon-${icon}`;
      return <T></T>;
    })}</div>;
  }
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<any>;

// Now stories only need to specify their args
export const Light: Story = {
  args: {
    className: "light"
  },
};

export const Dark: Story = {
  args: {
    className: "dark"
  },
};

export const Custom: Story = {
  args: {
    className: "custom"
  },
};
