import { wrapSmall } from './story.utils';

/**
 *
 * @param args
 * @returns
 */
const createElement = () => {
  // Create dropdown-menu element
  const dropdownMenu = document.createElement('pixobe-banner') as HTMLPixobeBannerElement;
  return dropdownMenu;
};

export default {
  title: 'Pixobe/PixobeBanner',
  render: () => {
    return createElement();
  },
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
};

export const Banner = {
  args: {},
};

export const SmallScreen = {
  args: {},
  render: () => {
    return wrapSmall(createElement());
  },
};
