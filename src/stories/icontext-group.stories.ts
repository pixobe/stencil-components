/**
 *
 * @param args
 * @returns
 */
const createElement = args => {
  const el = document.createElement('icontext-group') as HTMLIcontextGroupElement;
  Object.assign(el, args);
  return el;
};

export default {
  render: args => {
    return createElement(args);
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export const Primary = {
  args: {
    icon: 'icon-pixobe',
    label: 'Bottle color and dimensions',
  },
};

export const RoundedIcon = {
  args: {
    icon: 'icon-info',
    rounded: true,
    label: 'Bottle color and dimensions',
  },
};
