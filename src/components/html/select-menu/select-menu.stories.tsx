import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { SelectMenu } from './select-menu';

const meta: Meta<SelectMenu> = {
  title: 'SelectMenu',
  component: SelectMenu,
  argTypes: {
  },
  args: {
  },
  render: (props) => {
    function onValue(e) {
      console.log(e)
    }

    return <select-menu {...props} onInput={onValue}></select-menu>
  },
};

export default meta;

type Story = StoryObj<SelectMenu>;

export const FontSelector: Story = {
  args: {
    name: "Fonts",
    fontSelector: true,
    options: [
      {
        label: "Roboto",
        value: "https://roboto.wot"
      },
      {
        label: "Times New Roman",
        value: "Times New Roman"
      },
      {
        label: "Arial",
        value: "Arial"
      },
      {
        label: "Georgia",
        value: "Georgia"
      },
      {
        label: "Apple Chancery",
        value: "Apple Chancery"
      },
    ]
  },
};
export const FontSelectorValueSet: Story = {
  args: {
    name: "Fonts",
    fontSelector: true,
    value: "Apple Chancery",
    options: [
      {
        label: "Roboto",
        value: "https://roboto.wot"
      },
      {
        label: "Times New Roman",
        value: "Times New Roman"
      },
      {
        label: "Arial",
        value: "Arial"
      },
      {
        label: "Georgia",
        value: "Georgia"
      },
      {
        label: "Apple Chancery",
        value: "Apple Chancery"
      },
    ]
  },
};

export const DefaultMenu: Story = {
  args: {
    name: "Select the day",
    options: [
      {
        label: "Monday",
        value: "Monday"
      },
      {
        label: "Tuesday",
        value: "Tuesday"
      },
      {
        label: "Wednesday",
        value: "Wednesday"
      },
      {
        label: "Thursday",
        value: "Thursday"
      },
      {
        label: "Friday",
        value: "Friday"
      },
      {
        label: "Saturday",
        value: "Saturday"
      },
      {
        label: "Sunday",
        value: "Sunday"
      }
    ]
  }
};
