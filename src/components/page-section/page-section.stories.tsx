import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobePageSectionElement } from './page-section';

const meta = {
  title: 'Page Section',
  component: PixobePageSectionElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobePageSectionElement>;

export default meta;
type Story = StoryObj<PixobePageSectionElement>;

export const Basic: Story = {
  args: {},
  render: (props) => {
    return <p-section {...props} >
      <p>This is a basic page section rendered in settings and other admin ui pages.</p>
    </p-section>;
  }
};
