import type { Meta, StoryObj } from '@storybook/html-vite';
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
  "cog"
].sort((a, b) => a.localeCompare(b));

const meta: Meta<any> = {
  title: 'Icons',
  render: ({ ...args }) => {
    const div = document.createElement('div');
    div.classList.add(args.theme, 'icon-grid');

    icons.forEach(icon => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('icon-wrapper');

      const name = `icon-${icon}`;
      const el = document.createElement(name);
      wrapper.append(el);

      const label = document.createElement("label");
      label.innerText = icon;
      wrapper.append(label);

      div.append(wrapper);
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
