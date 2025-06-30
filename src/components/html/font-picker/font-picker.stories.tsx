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
    function onValue(e) {
      console.log(e.detail)
    }

    return <font-picker {...props} onInput={onValue}></font-picker>
  },
};

export default meta;

type Story = StoryObj<FontPicker>;

export const FontSelector: Story = {
  args: {
    name: "Fonts",
    options: [
      {
        name: "Roboto",
        url: "https://roboto.wot"
      },
      {
        name: "Times New Roman",
        url: "Times New Roman"
      },
      {
        name: "Arial",
        url: "Arial"
      },
      {
        name: "Georgia",
        url: "Georgia"
      },
      {
        name: "Apple Chancery",
        url: "Apple Chancery"
      },
    ]
  },
};
export const FontSelectorValueSet: Story = {
  args: {
    name: "Fonts",
    value: "Apple Chancery",
    options: [
      {
        name: "Roboto",
        url: "https://roboto.wot"
      },
      {
        name: "Times New Roman",
        url: "Times New Roman"
      },
      {
        name: "Arial",
        url: "Arial"
      },
      {
        name: "Georgia",
        url: "Georgia"
      },
      {
        name: "Apple Chancery",
        url: "Apple Chancery"
      },
    ]
  },
};
