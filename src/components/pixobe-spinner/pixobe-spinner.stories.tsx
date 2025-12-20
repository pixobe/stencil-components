import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeSpinnerElement } from './pixobe-spinner';

const meta = {
  title: 'Page Spinner',
  component: PixobeSpinnerElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeSpinnerElement>;

export default meta;
type Story = StoryObj<PixobeSpinnerElement>;

export const Basic: Story = {
  args: {},
  render: (props) => {
    return <p-spinner {...props} > </p-spinner>;
  }
};

export const Info: Story = {
  args: {
    header: "Loading",
    message: "Please wait, loading backend information"
  },
  render: (props) => {
    return <p-spinner {...props} > </p-spinner>;
  }
};
