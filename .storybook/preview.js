/** @type { import('@storybook/html-vite').Preview } */
import './main.css';
// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';

/**
 * Registers all custom elements in the Storybook preview.
 * This is useful if your components rely on other nested Stencil components.
 */
defineCustomElements();

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  tags: ['autodocs'],
};

export default preview;
