const icons = ['envelope', 'pixobe', 'facebook', 'upload', 'imageupload', 'move', 'thickness', 'youtube'];

/**
 *
 */
export default {
  title: 'Icons',
  render: ({ ...args }) => {
    const div = document.createElement('div');
    div.classList.add('container', 'flex', 'flex-wrap', 'gap-1', args.theme);

    icons.forEach(icon => {
      const el = document.createElement('pixobe-icon');
      el.icon = icon;
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

export const Dark = {
  args: {
    theme: 'dark',
  },
};
