import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Input',
  render: (args) => {
    const wrapper = document.createElement("div");
    const className = args.className || ''
    wrapper.classList.add("position-wrapper");
    if (className) {
      wrapper.classList.add(className)
    }
    const el = document.createElement("color-input");
    el.value = args.value;
    el.label = args.label;


    el.addEventListener('closePicker', () => {
      console.log("cancelled")
    });
    wrapper.appendChild(el);
    return wrapper;
  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;


export const DefaultView: Story = {
  args: {
    label: "Text Color",
    value: '#ff0000'
  },
};

export const NoValue: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'top-right'
  },
};


export const BottomLeft: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'bottom-left'
  },
};

export const BottomRight: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'bottom-right'
  },
};

export const Center: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'center-middle'
  },
};