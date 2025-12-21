import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeImageGalleryElement } from './wp-gallery';

window['wp'] = {

}


const meta = {
  title: 'ImageGallery',
  component: PixobeImageGalleryElement,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeImageGalleryElement>;

export default meta;
type Story = StoryObj<PixobeImageGalleryElement>;

export const Basic: Story = {
  args: {
  },
  render: (props) => {
    return <p-wpgallery {...props} />;
  }
};


export const ExistingGallery: Story = {
  args: {
    value: [
      {
        name: "Animals",
        images: [
          { url: "/assets/images/unicorn.jpg" },
          { url: "/assets/images/windmill.jpg" }
        ]
      },
      {
        name: "Reptiles",
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
      {
        name: "Birds",
        images: [
        ]
      }
    ]
  },
  render: (props) => {
    return <p-wpgallery {...props} />;
  }
};
