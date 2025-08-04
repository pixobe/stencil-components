import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
  title: 'Color Picker',
  render: (args) => {
    const el = document.createElement("color-picker");
    el.color = args.color;
    return el;

  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;



export const TopLeft: Story = {
  args: {
    color: '#ff00ff',
  },
};

export const TopRight: Story = {
  args: {
  },
};

export const BottomLeft: Story = {
  args: {
    label: "Colors",
    color: '',
  },
};

export const BottomRight: Story = {
  args: {
    color: '',
  },
};

export const Center: Story = {
  args: {
    color: '',
  },
};

export const OverflowHidden: Story = {
  args: {
    color: '',
  },
};