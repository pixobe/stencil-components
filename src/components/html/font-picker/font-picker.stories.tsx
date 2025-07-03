import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { FontPicker } from './font-picker';

const meta: Meta<FontPicker> = {
  title: 'Font Loader',
  component: FontPicker,
  argTypes: {
  },
  args: {
  },
  render: (props) => {
    function onValue(e: any) {
      console.log(e.detail)
    }

    return <font-picker {...props} onInput={onValue}></font-picker>
  },
};

const fonts = [
  {
    "name": "Arial",
    url: ''
  },
  {
    "name": "Roboto",
    "url": "https://fonts.gstatic.com/s/roboto/v47/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBHMdazQ.woff2"
  },
  {
    "name": "Tagerine",
    "url": "https://fonts.gstatic.com/s/tagesschrift/v2/pe0pMI6IOYlEuEZ7ZEA7ZKOqBP5vWVYgVw.woff2"
  },
  {
    "name": "Frigole",
    "url": "https://fonts.gstatic.com/s/frijole/v14/uU9PCBUR8oakM2BQ3xTR396EilM.woff2"
  },
  {
    "name": "Apple Chancery",
    "url": "Apple Chancery"
  }
];

export default meta;

type Story = StoryObj<FontPicker>;

export const FontSelector: Story = {
  args: {
    name: "Fonts",
    fonts
  },
};
export const FontSelectorValueSet: Story = {
  args: {
    name: "Fonts",
    value: "Apple Chancery",
    fonts
  },
};
