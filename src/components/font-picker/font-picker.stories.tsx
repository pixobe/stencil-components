import type { Meta, StoryObj } from '@storybook/html-vite';


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

const meta: Meta<any> = {
  title: 'FontPicker',
  render: (args) => {
    const el = document.createElement("font-picker");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const NoValue: Story = {
  args: {
    label: "Fonts",
    value: '',
    name: "colors"
  },
};

export const WithFonts: Story = {
  args: {
    label: "Fonts",
    value: '',
    name: "fonts",
    fonts
  },
};
export const WithValue: Story = {
  args: {
    label: "Fonts",
    value: 'Frigole',
    name: "fonts",
    fonts
  },
};