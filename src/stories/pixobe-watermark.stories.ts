/**
 *
 * @param args
 * @returns
 */
const createElement = () => {
  // Create dropdown-menu element
  return document.createElement('pixobe-watermark');
};

export default {
  render: () => {
    return createElement();
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export const Simple = {
  args: {},
};
