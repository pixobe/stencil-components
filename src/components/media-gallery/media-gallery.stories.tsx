import type { Meta, StoryObj } from '@stencil/storybook-plugin';
import { h } from '@stencil/core';
import { PixobeMediaGalleryElement } from './media-gallery';

const meta = {
  title: 'MediaGallery',
  component: 'p-mediagallery',
  parameters: {},
  argTypes: {
  },
  args: {},
} satisfies Meta<PixobeMediaGalleryElement>;

export default meta;
type Story = StoryObj;

export const Basic: Story = {
  args: {
    value: [
      {
        name: "Animals",
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
      }
    ]
  },
  render: (props: any) => {
    return <p-mediagallery {...props} />;
  }
};

export const MixedGalleries: Story = {
  args: {
    cols: 5,
    value: [
      {
        name: "Coastal Escapes",
        images: [
          { url: "/assets/images/windmill.jpg" },
          { url: "/assets/images/unicorn.jpg" },
          { url: "/assets/images/monster-car.jpg" },
          { url: "/assets/images/windmill.jpg" },
          { url: "/assets/images/unicorn.jpg" },
        ]
      },
      {
        name: "Desert Nights",
        items: [
          { url: "/assets/images/monster-car.jpg" },
          { url: "/assets/images/unicorn.jpg" },
          { url: "/assets/images/windmill.jpg" },
        ]
      },
      {
        name: "Urban Stories",
        images: [
          { url: "/assets/images/unicorn.jpg" },
          { url: "/assets/images/monster-car.jpg" },
          { url: "/assets/images/windmill.jpg" },
          { url: "/assets/images/unicorn.jpg" },
        ]
      }
    ]
  },
  render: (props: any) => {
    return <p-mediagallery {...props} />;
  }
};
