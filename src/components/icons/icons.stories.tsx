import type { Meta, StoryObj } from '@storybook/html-vite';
const icons = [
  'spinner',
  'whatsapp',
  'facebook',
  'instagram',
  'pixobe',
  'help',
  'monogram',
  'alignleft',
  'aligncenter',
  'alignright',
  'circle',
  'image',
  'imageupload',
  'text',
  'close',
  'info',
  'upload',
  'add',
  'edit',
  'fliph',
  'flipv',
  'cart',
  'rotate',
  'support',
  'wrench',
  'add-cart',
  'done',
  'redo',
  'arrow',
  'magic',
  'pdf',
  'preview',
  'trash',
  'add-cart'
];

const meta: Meta<any> = {
  title: 'Icons',
  render: ({ ...args }) => {
    const div = document.createElement('div');
    div.classList.add(args.theme);

    icons.forEach(icon => {
      const name = `icon-${icon}`;
      const el = document.createElement(name);
      div.append(el);
    });
    return div;
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<any>;

export const Light: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark = {
  args: {
    theme: 'dark',
  },
};

export const Blue = {
  args: {
    theme: 'blue',
  },
};
