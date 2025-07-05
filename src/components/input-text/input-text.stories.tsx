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
      console.log(e.currentTarget.value)
    }
    return <input-text {...props} onInput={onInputFn} ></input-text>
  },
};

export default meta;

type Story = StoryObj<InputText>;

export const Primary: Story = {
  args: {
    name: "First Name"
  },
};

export const Secondary: Story = {
  args: {
    name: "Text",
  },
};
