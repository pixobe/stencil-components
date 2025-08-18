/** @type { import('@storybook/html-vite').Preview } */
import './main.css';
import '../www/build/index.esm';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
