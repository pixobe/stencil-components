import type { Meta, StoryObj } from '@storybook/html-vite';


const meta: Meta<any> = {
  title: 'Color Picker',
  render: (args) => {

    const mainWrapper = document.createElement("div");
    const className = args.className || ''
    mainWrapper.classList.add("position-wrapper");
    if (className) {
      mainWrapper.classList.add(className)
    }

    const wrapper = document.createElement("label");
    wrapper.textContent = "Color Picker"
    wrapper.classList.add("color-picker-wrapper");

    const el = document.createElement("color-picker");
    Object.assign(el, args)

    el.addEventListener('closePicker', () => {
      console.log("cancelled")
    });

    el.addEventListener('closePicker', () => {
      console.log("cancelled")
    });

    el.addEventListener('colorInput', (e: any) => {
      console.log("oninput", e.detail)
    });

    el.addEventListener('colorSelect', (e: any) => {
      console.log("selected", e.detail)
    });

    el.style.display = 'block';
    wrapper.appendChild(el);

    mainWrapper.appendChild(wrapper)
    return mainWrapper;

  },
  argTypes: {},
};
export default meta;
type Story = StoryObj<any>;



export const TopLeft: Story = {
  args: {
    label: "Colors",
    value: '',
    className: 'top-left'
  },
};

export const TopRight: Story = {
  args: {
    label: "Colors",
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