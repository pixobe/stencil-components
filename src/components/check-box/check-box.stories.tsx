import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
  title: 'Checkbox',
  render: (args) => {
    const el = document.createElement("p-checkbox");
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
    value: ''
  },
};

export const DefaultValue: Story = {
  args: {
    label: "Colors",
    value: 'true'
  },
};

export const WithDetails: Story = {
  args: {
    label: "Agree",
    value: 'true',
    details: "Ensure you read the documents"
  },
};
