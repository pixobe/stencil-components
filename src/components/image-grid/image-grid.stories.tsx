import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Image Grid',
  render: (args) => {
    const el = document.createElement("image-grid");
    Object.assign(el, args);

    el.addEventListener("imageDelete", (e: any) => {
      console.log("Image Deleted", e)
    });

    el.addEventListener("imageSelect", (e: any) => {
      console.log("Image Selected", e)
    });

    return el;
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<any>;


export const Empty: Story = {
  args: {
    value: []
  },
};


export const Gallery: Story = {
  args: {
    images: [
      "/assets/images/monster-car.jpg",
      "/assets/images/unicorn.jpg",
      "/assets/images/windmill.jpg"
    ]
  },
};

export const ViewOnly: Story = {
  args: {
    images: [
      "/assets/images/monster-car.jpg",
      "/assets/images/unicorn.jpg",
      "/assets/images/windmill.jpg"
    ],
    viewonly: true
  },
};



