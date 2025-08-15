import type { Meta, StoryObj } from '@storybook/html-vite';

const meta: Meta<any> = {
  title: 'Image Gallery',
  render: (args) => {
    const el = document.createElement("image-gallery");
    Object.assign(el, args);
    return el;
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<any>;


export const Gallery: Story = {
  args: {
    gallery: [
      {
        name: "Animals",
        images: [
          "/assets/images/monster-car.jpg",
          "/assets/images/unicorn.jpg",
          "/assets/images/windmill.jpg"
        ]
      }
    ]
  },
};


