import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeImageGridElement } from './image-grid';

window['wp'] = {

}


const meta = {
  title: 'ImageGrid',
  component: PixobeImageGridElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeImageGridElement>;

export default meta;
type Story = StoryObj<PixobeImageGridElement>;

export const Basic: Story = {
  args: {
  },
  render: (props) => {
    return <p-imagegrid {...props} />;
  }
};


export const ExistingGallery: Story = {
  args: {
    images: [
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
    ]
  },
  render: (props) => {
    return <p-imagegrid {...props} />;
  }
};


export const CustomColumns: Story = {
  args: {
    cols: 4,
    images: [
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
      { url: "/assets/images/unicorn.jpg" },
      { url: "/assets/images/windmill.jpg" },
      { url: "/assets/images/monster-car.jpg" },
    ]
  },
  render: (props) => {
    return <p-imagegrid {...props} />;
  }
};
