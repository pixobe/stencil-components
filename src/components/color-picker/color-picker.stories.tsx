import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
  title: 'Color Picker',
  render: (args) => {
    const el = document.createElement("color-picker");
    el.color = args.color;
    el.swatches = args.swatches;
    el.editMode = args.editMode;

    el.addEventListener("colorAdded", (e) => {
      console.log(e.detail)
    })
    return el;

  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;



export const TopLeft: Story = {
  args: {
    color: '#ff00ff',
    swatches: ['#ff0000', '#00ff00', '#0000ff']
  },
};

export const EditMode: Story = {
  args: {
    color: '#ff00ff',
    editMode: true,
    swatches: ['#ff0000', '#00ff00', '#0000ff']
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