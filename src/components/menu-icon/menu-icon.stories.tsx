import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { MenuIconElement } from './menu-icon';

const meta = {
  title: 'MenuIcon',
  component: MenuIconElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
  // Define common render function at meta level
  render: (props) => {
    return <p-menuicon {...props}>
      <div class="icon" slot="menu-icon">
        <icon-circle></icon-circle>
      </div>
      <div slot="menu-items">
      </div>
      <div class="menu-label" slot="menu-text">
        <div class="icon">
          <icon-circle></icon-circle>
        </div>
      </div>
    </p-menuicon>;
  }
} satisfies Meta<MenuIconElement>;

export default meta;
type Story = StoryObj<MenuIconElement>;

// Now stories only need to specify their args
export const Basic: Story = {
  args: {
    value: '',
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
