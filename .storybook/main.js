/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-interactions'],

  framework: {
    name: '@stencil/storybook-plugin',
  },

  staticDirs: ['../dist', '../www/build'],
};
export default config;
