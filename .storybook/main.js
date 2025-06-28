const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook', '@storybook/addon-docs'],
  framework: {
    name: '@stencil/storybook-plugin',
    options: {},
    staticDirs: ['../assets'],
  },
};
export default config;
