const icons = ['envelope', 'pixobe', 'image', 'text', 'help', 'monogram', 'alignleft', 'aligncenter', 'alignright'];

/**
 *
 */
export default {
  title: 'IconsV2',
  render: ({ ...args }) => {
    const div = document.createElement('div');
    div.classList.add('container', 'flex', 'flex-wrap', 'gap-1', args.theme);

    icons.forEach(icon => {
      const name = `icon-${icon}`;
      const el = document.createElement(name);
      div.append(el);
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
