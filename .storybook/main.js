const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/html-vite',
    options: {},
    staticDirs: ['../assets'],
  },
};
export default config;
