import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'SelectMneu',
  render: (args: any) => {
    const el = document.createElement("select-menu");
    Object.assign(el, args)
    return el;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const NoValue: Story = {
  args: {
    label: "Colors",
    value: '',
    name: "colors"
  },
};

export const Default: Story = {
  args: {
    label: "Colors",
    value: '',
    name: "colors",
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
  },
};

