import { h } from '@stencil/core';
import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MultiLineText } from './text-area';

const meta: Meta<MultiLineText> = {
  title: 'MultiLineText',
  component: MultiLineText,
  argTypes: {
  },
  args: {
  },
  render: (props) => {
    function onInputFn(e: any) {
      console.log(e.target.value)
    }
    return <multi-line {...props} onInput={onInputFn} ></multi-line>
  },
};

export default meta;

type Story = StoryObj<MultiLineText>;

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

export const WithPlaceholder: Story = {
  args: {
    name: "Notes",
    placeholder: "Enter your comments here..."
  },
};