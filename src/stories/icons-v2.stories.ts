const icons = [
  'envelope',
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
  'whatsapp',
  'facebook',
  'instagram',
  'wrench',
  'add-cart',
  'done',
  'redo',
  'arrow',
  'magic',
  'pdf',
  'preview',
  'trash',
];

const props = {
  'icon-preview': [
    {
      key: 'on',
      value: true,
    },
    {
      key: 'on',
      value: false,
    },
  ],
};

/**
 *
 */
export default {
  title: 'Icons',
  render: ({ ...args }) => {
    const div = document.createElement('div');
    div.classList.add('container', 'flex', 'flex-wrap', 'gap-1', args.theme);
    icons.forEach(icon => {
      const name = `icon-${icon}`;
      const configuredProps = props[name];
      if (configuredProps) {
        configuredProps.forEach(c => {
          const el = document.createElement(name);
          el[c.key] = c.value;
          div.append(el);
        });
      } else {
        const el = document.createElement(name);
        div.append(el);
      }
    });
    return div;
  },
  argTypes: {},
};

export const Light = {
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
