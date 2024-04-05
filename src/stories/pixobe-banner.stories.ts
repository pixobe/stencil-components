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
  argTypes: {},
};

export const Banner = {
  args: {},
};
