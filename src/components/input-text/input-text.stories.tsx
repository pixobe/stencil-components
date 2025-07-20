import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { InputText } from './input-text';

const meta: Meta<InputText> = {
  title: 'InputText',
  component: InputText,
  argTypes: {
  },
  args: {
  },
  render: (props) => {
    function onInputFn(e: any) {
      console.log('Updated Input text', e.target.value)
    }
    return <input-text {...props} onInput={onInputFn} ></input-text>
  },
};

export default meta;

type Story = StoryObj<InputText>;

export const Primary: Story = {
  args: {
    name: "firstName",
    label: "First Name"
  },
};

export const Secondary: Story = {
  args: {
    name: "Text",
    label: "Text"
  },
};
export const WithPlaceholder: Story = {
  args: {
    name: "Notes",
    label: "Notes",
    placeholder: "Enter your comments here..."
  },
};
