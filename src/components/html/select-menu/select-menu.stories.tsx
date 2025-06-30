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
